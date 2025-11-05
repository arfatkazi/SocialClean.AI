// backend/src/controllers/authController.js
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";
import crypto from "crypto";
import { generateToken } from "../utils/jwt.js";
import transporter from "../config/email.js";

const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;

// ======================= SIGNUP =======================
export const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, age, gender, country, city } =
      req.body;

    if (!country)
      return res.status(400).json({ message: "Country is required" });

    if (!passwordRegex.test(password))
      return res.status(400).json({
        message:
          "Password must be at least 6 characters, include 1 letter, 1 number, and 1 special character",
      });

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser)
      return res.status(400).json({ message: "Email already registered" });

    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      age,
      gender: gender || "other",
      location: { country, city },
    });

    const {
      password: _,
      resetPasswordToken,
      resetPasswordExpire,
      ...userData
    } = user.toObject();

    // ✅ FIXED: Pass an object to generateToken
    const token = generateToken({
      id: user._id,
      role: user.role,
      subscription: user.subscription?.type || "free",
    });

    res.status(201).json({
      message: "Signup successful",
      token,
      user: userData,
    });
  } catch (error) {
    console.error("❌ Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ======================= LOGIN =======================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const {
      password: _,
      resetPasswordToken,
      resetPasswordExpire,
      ...userData
    } = user.toObject();

    // ✅ FIXED: Correct JWT payload
    const token = generateToken({
      id: user._id,
      role: user.role,
      subscription: user.subscription?.type || "free",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: userData,
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ======================= FORGOT PASSWORD =======================
// ================== FORGOT PASSWORD ==================
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });

    const resetURL = `${process.env.BASE_CLIENT_URL}/reset-password/${resetToken}`;

    await transporter.sendMail({
      from: `"SocialCleanAI" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "Password Reset Link",
      html: `
      <h2>Password Reset</h2>
      <p>Click below link to reset password</p>
      <a href="${resetURL}">${resetURL}</a>
      <p>Valid for 10 minutes</p>
      `,
    });

    res.json({
      message: "Reset link sent to email",
      resetURL, // dev only
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Email sending failed" });
  }
};

// ================== RESET PASSWORD ==================
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) return res.status(400).json({ message: "Invalid token" });

    user.password = password;
    await user.save();

    res.json({ message: "Password reset successful!" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Invalid or expired token" });
  }
};
