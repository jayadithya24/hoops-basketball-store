import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

/**
 * JWT payload we expect
 */
interface AuthTokenPayload {
  userId?: number;
  id?: number;
  sub?: number | string;
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
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    return res.status(500).json({ error: "Server configuration error" });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as AuthTokenPayload;

    const rawUserId =
      decoded.userId ??
      decoded.id ??
      (typeof decoded.sub === "string" ? Number(decoded.sub) : decoded.sub);

    if (!rawUserId || Number.isNaN(rawUserId)) {
      return res.status(401).json({ error: "Invalid token payload" });
    }

    // ✅ now valid because of express.d.ts
    req.userId = rawUserId;

    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
