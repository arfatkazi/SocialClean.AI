// backend/src/utils/jwt.js
import jwt from "jsonwebtoken";

/**
 * Generate JWT Token for a user
 * @param {Object} payload - Data to embed in token (e.g. { id: user._id })
 */
export const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "30d" });
};

/**
 * Verify JWT Token
 * @param {string} token
 * @returns {Object|null} Decoded token payload or null if invalid
 */
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    console.error("JWT verification failed:", err.message);
    return null;
  }
};
