// backend/src/controllers/authController.js
import User from "../models/userSchema.js";
import crypto from "crypto";
import { generateToken } from "../utils/jwt.js";

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
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 minutes

    await user.save();
    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    res
      .status(200)
      .json({ message: "Reset link generated", resetURL: resetUrl });
  } catch (error) {
    console.error("❌ Forgot password error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ======================= RESET PASSWORD =======================
export const resetPassword = async (req, res) => {
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user)
      return res.status(400).json({ message: "Invalid or expired token" });

    if (!passwordRegex.test(req.body.password))
      return res.status(400).json({
        message:
          "Password must be at least 6 characters, include 1 letter, 1 number, and 1 special character",
      });

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    // ✅ FIXED: Consistent token payload
    const token = generateToken({
      id: user._id,
      role: user.role,
      subscription: user.subscription?.type || "free",
    });

    res.status(200).json({
      message: "Password reset successful",
      token,
    });
  } catch (error) {
    console.error("❌ Reset password error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
