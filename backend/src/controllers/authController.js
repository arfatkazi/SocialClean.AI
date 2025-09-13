import User from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import bcrypt from "bcryptjs";

// Generate JWT
const generateToken = (id, role, subscription) =>
  jwt.sign({ id, role, subscription }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

/**
 * SIGNUP
 */
export const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, age, gender } = req.body;

    // check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Allow "adult" only if in valid range
    let finalGender = gender;
    if (age >= 18 && age <= 25) {
      finalGender = "adult";
    }

    // create user
    user = await User.create({
      firstName,
      lastName,
      email,
      password,
      age,
      gender: finalGender,
    });

    // strip sensitive fields
    const {
      password: _,
      resetPasswordToken,
      resetPasswordExpire,
      ...userData
    } = user.toObject();

    res.status(201).json({
      message: "Signup successful",
      token: generateToken(user._id, user.role, user.subscription.type),
      user: userData,
    });
  } catch (error) {
    console.error("❌ Signup error:", error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * LOGIN
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // strip sensitive fields
    const {
      password: _,
      resetPasswordToken,
      resetPasswordExpire,
      ...userData
    } = user.toObject();

    res.status(200).json({
      message: "Login successful",
      token: generateToken(user._id, user.role, user.subscription.type),
      user: userData,
    });
  } catch (error) {
    console.error("❌ Login error:", error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * SOCIAL LOGIN
 */
export const socialLogin = async (req, res) => {
  try {
    const { provider, providerId, firstName, lastName, email, profilePic } =
      req.body;

    if (!provider || !providerId) {
      return res
        .status(400)
        .json({ message: "Provider and providerId are required" });
    }

    // check if user exists
    let user = await User.findOne({ provider, providerId });

    if (!user) {
      // create new social user
      user = await User.create({
        firstName,
        lastName,
        email,
        profilePic,
        provider,
        providerId,
        password: crypto.randomBytes(16).toString("hex"), // random password
      });
    }

    // strip sensitive fields
    const {
      password: _,
      resetPasswordToken,
      resetPasswordExpire,
      ...userData
    } = user.toObject();

    res.status(200).json({
      message: "Social login successful",
      token: generateToken(user._id, user.role, user.subscription.type),
      user: userData,
    });
  } catch (error) {
    console.error("❌ Social login error:", error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * FORGOT PASSWORD
 */
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 min
    await user.save();

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    res.status(200).json({
      message: "Reset link generated",
      resetURL: resetUrl,
    });
  } catch (error) {
    console.error("❌ Forgot password error:", error);
    res.status(500).json({ error: error.message });
  }
};

/**
 * RESET PASSWORD
 */
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

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({
      message: "Password reset successful",
      token: generateToken(user._id, user.role, user.subscription.type),
    });
  } catch (error) {
    console.error("❌ Reset password error:", error);
    res.status(500).json({ error: error.message });
  }
};
