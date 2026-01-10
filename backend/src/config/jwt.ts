import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import type { StringValue } from "ms";

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
