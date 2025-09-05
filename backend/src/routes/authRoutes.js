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
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.get("/me", protect, (req, res) => {
  res.json({
    message: "User profile fetched successfully",
    user: req.user,
  });
});

export default router;
