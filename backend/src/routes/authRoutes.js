import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  signup,
  login,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

// Social login
// router.post("/social-login", socialLogin);

router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);

// Get user profile
router.get("/me", protect, (req, res) => {
  res.json({
    message: "User profile fetched successfully",
    user: req.user,
  });
});

export default router;
