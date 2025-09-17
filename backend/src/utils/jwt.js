import jwt from "jsonwebtoken";

export const generateToken = (id, role, subscription, expiresIn = "7d") => {
  return jwt.sign({ id, role, subscription }, process.env.JWT_SECRET, {
    expiresIn,
  });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return null; // or throw error depending on your use case
  }
};
