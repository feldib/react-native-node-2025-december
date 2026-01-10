import "reflect-metadata";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import type { StringValue } from "ms";
import { Request, Response, NextFunction } from "express";

dotenv.config();

interface JwtPayload {
  userId: number;
  email: string;
}

export const generateToken = (userId: number, email: string): string => {
  const jwtSecretKey = process.env.JWT_SECRET_KEY as string;

  if (!jwtSecretKey) {
    throw new Error("JWT_SECRET_KEY is not defined in environment variables");
  }

  const payload: JwtPayload = {
    userId,
    email,
  };

  // Token expires based on TOKEN_EXPIRATION env variable (default: 7 days)
  const token = jwt.sign(payload, jwtSecretKey, {
    expiresIn:
      (process.env.TOKEN_EXPIRATION as StringValue | undefined | number) ||
      "7d",
  });

  return token;
};

// Middleware for JWT authentication
export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: "Access token required" });
  }

  const jwtSecretKey = process.env.JWT_SECRET_KEY as string;

  try {
    const verified = jwt.verify(token, jwtSecretKey) as JwtPayload;
    (req as any).user = verified; // Attach user info to request
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};

// Verify token without middleware (for optional use)
export const verifyToken = (token: string): JwtPayload | null => {
  const jwtSecretKey = process.env.JWT_SECRET_KEY as string;

  try {
    const verified = jwt.verify(token, jwtSecretKey) as JwtPayload;
    return verified;
  } catch (error) {
    return null;
  }
};
