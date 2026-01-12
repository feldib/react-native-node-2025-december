import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import type { StringValue } from "ms";

dotenv.config();

interface JwtPayload {
  userId: number;
  email: string;
}

export const generateTokens = (
  userId: number,
  email: string
): {
  accessToken: string;
  refreshToken: string;
} => {
  const jwtSecretKey = process.env.JWT_SECRET_KEY as string;
  if (!jwtSecretKey) {
    throw new Error("JWT_SECRET_KEY is not defined in environment variables");
  }
  const refreshTokenSecretKey = process.env.REFRESH_TOKEN_SECRET_KEY as string;
  if (!refreshTokenSecretKey) {
    throw new Error(
      "REFRESH_TOKEN_SECRET_KEY is not defined in environment variables"
    );
  }
  const jwtExpiration = process.env.JWT_TOKEN_EXPIRATION as string;
  if (!jwtExpiration) {
    throw new Error(
      "JWT_TOKEN_EXPIRATION is not defined in environment variables"
    );
  }
  const refreshTokenExpiration = process.env.REFRESH_TOKEN_EXPIRATION as string;
  if (!refreshTokenExpiration) {
    throw new Error(
      "REFRESH_TOKEN_EXPIRATION is not defined in environment variables"
    );
  }

  const payload: JwtPayload = {
    userId,
    email,
  };

  // JWT token expires based on JWT_TOKEN_EXPIRATION env variable (default: 10 minutes)
  const accessToken = jwt.sign(payload, jwtSecretKey, {
    expiresIn: (jwtExpiration as StringValue | undefined | number) || "10m",
  });

  // Refresh token expires based on REFRESH_TOKEN_EXPIRATION env variable (default: 7 days)
  const refreshToken = jwt.sign(payload, refreshTokenSecretKey, {
    expiresIn:
      (refreshTokenExpiration as StringValue | undefined | number) || "7d",
  });

  return { accessToken, refreshToken };
};

// Verify token without middleware (for optional use)
export const verifyAccessToken = (token: string): JwtPayload | null => {
  const jwtSecretKey = process.env.JWT_SECRET_KEY as string;
  if (!jwtSecretKey) {
    throw new Error("JWT_SECRET_KEY is not defined in environment variables");
  }

  try {
    const verified = jwt.verify(token, jwtSecretKey) as JwtPayload;
    return verified;
  } catch (error) {
    return null;
  }
};

// Verify refresh token
export const verifyRefreshToken = (token: string): JwtPayload | null => {
  const refreshTokenSecretKey = process.env.REFRESH_TOKEN_SECRET_KEY as string;
  if (!refreshTokenSecretKey) {
    throw new Error(
      "REFRESH_TOKEN_SECRET_KEY is not defined in environment variables"
    );
  }

  try {
    const verified = jwt.verify(token, refreshTokenSecretKey) as JwtPayload;
    return verified;
  } catch (error) {
    return null;
  }
};
