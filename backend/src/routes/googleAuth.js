import express from "express";
import axios from "axios";
import User from "../models/userSchema.js";
import { protect } from "../middleware/authMiddleware.js"; // your JWT middleware

const router = express.Router();

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:5000/api/auth/google-photos/callback";

// ✅ Step 1: Redirect user to Google consent screen
router.get("/google-photos", protect, (req, res) => {
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/photoslibrary.readonly&access_type=offline&prompt=consent`;
  res.redirect(url);
});

// ✅ Step 2: Handle Google OAuth callback
router.get("/google-photos/callback", protect, async (req, res) => {
  const { code } = req.query;

  if (!code) return res.status(400).json({ message: "No code returned" });

  try {
    // Exchange code for access token
    const tokenResponse = await axios.post(
      "https://oauth2.googleapis.com/token",
      {
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code",
      }
    );

    const { access_token, refresh_token, expires_in } = tokenResponse.data;

    // Save tokens in logged-in user
    const user = await User.findById(req.user._id);
    user.oauth.googlePhotos = {
      accessToken: access_token,
      refreshToken: refresh_token,
      expiry: new Date(Date.now() + expires_in * 1000),
    };
    await user.save();

    res.json({ success: true, message: "Google Photos connected!" });
  } catch (error) {
    console.error("OAuth error:", error.response?.data || error.message);
    res.status(500).json({ message: "OAuth failed" });
  }
});

export default router;
