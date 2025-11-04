import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  signup,
  login,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";
import passport from "../config/passport.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);

// Social login
// router.post("/social-login", socialLogin);

// ✅ Google OAuth

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user._id, email: req.user.email },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "7d" }
    );
    res.redirect(`${process.env.BASE_CLIENT_URL}/login-success?token=${token}`);
  }
);

// Get user profile
router.get("/me", protect, (req, res) => {
  res.json({
    message: "User profile fetched successfully",
    user: req.user,
  });
});

export default router;
