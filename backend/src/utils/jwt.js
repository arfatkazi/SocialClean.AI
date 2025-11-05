import dotenv from "dotenv";
dotenv.config();

// backend/src/utils/jwt.js
import jwt from "jsonwebtoken";

// ✅ Use JWT_ACCESS_SECRET if available, else fallback to JWT_SECRET
const JWT_SECRET = process.env.JWT_ACCESS_SECRET || process.env.JWT_SECRET;

/**
 * Generate JWT Token for a user
 * @param {Object} payload - Data to embed in token
 */
export const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "30d" });
};

/**
 * Verify JWT Token
 * @param {string} token
 * @returns {Object|null} Decoded token payload or null if invalid
 */
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return null;
  }
};
