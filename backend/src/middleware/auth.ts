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

/**
 * Extend Express Request locally
 */
interface AuthRequest extends Request {
  userId?: number;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "No token provided" });
    return;
  }

  const token = authHeader.split(" ")[1];
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    res.status(500).json({ error: "Server configuration error" });
    return;
  }

  try {
    const decoded = jwt.verify(token, jwtSecret) as AuthTokenPayload;

    const rawUserId =
      decoded.userId ??
      decoded.id ??
      (typeof decoded.sub === "string" ? Number(decoded.sub) : decoded.sub);

    if (!rawUserId || Number.isNaN(rawUserId)) {
      res.status(401).json({ error: "Invalid token payload" });
      return;
    }

    // ✅ SAFE & TYPED
    req.userId = rawUserId;

    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};
