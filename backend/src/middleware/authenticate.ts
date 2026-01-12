import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../config/jwt";

// Middleware for JWT authentication
export const authenticateAccessToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: "Access token required" });
  }

  try {
    const verified = verifyAccessToken(token);
    if (!verified) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }
    (req as any).user = verified; // Attach user info to request
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};
