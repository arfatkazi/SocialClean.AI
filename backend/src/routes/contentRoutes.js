import express from "express";
import {
  fetchTwitterPosts,
  fetchInstagramPosts,
  fetchFacebookPosts,
  fetchGooglePhotos,
} from "../controllers/contentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/twitter", protect, fetchTwitterPosts);
router.get("/instagram", protect, fetchInstagramPosts);
router.get("/facebook", protect, fetchFacebookPosts);
router.get("/google-photos", protect, fetchGooglePhotos);

export default router;
