import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'JWT_SECRET2024';
const ACCESS_TOKEN_EXPIRY = '8hr'; // 15 minutes
const REFRESH_TOKEN_EXPIRY = '7d'; // 7 days

export const generateAccessToken = (userId: string, role:string) => {
  return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRY });
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRY });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};
