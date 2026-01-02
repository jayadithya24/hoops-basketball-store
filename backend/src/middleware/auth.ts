import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  // Fail fast in dev — helps catch missing env var early
  console.warn("WARNING: JWT_SECRET is not set in environment variables.");
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Try verify
    const decoded = jwt.verify(token, jwtSecret as string) as any;

    // Accept multiple possible claim names for user id
    // (some code uses { id }, others { userId })
    const maybeId =
      decoded?.userId ?? decoded?.id ?? decoded?.sub ?? decoded?.user?.id;

    if (!maybeId) {
      console.warn("Auth: token decoded but no user id claim found:", decoded);
      return res.status(401).json({ error: "Invalid token payload" });
    }

    // ensure numeric (Prisma expects number)
    const uid = typeof maybeId === "string" ? Number(maybeId) : maybeId;

    if (Number.isNaN(uid)) {
      console.warn("Auth: token user id is not a number:", maybeId);
      return res.status(401).json({ error: "Invalid token user id" });
    }

    req.userId = uid;
    next();
  } catch (err: any) {
    console.warn("Auth verify error:", err?.message ?? err);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
