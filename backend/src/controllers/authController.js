import User from "../models/userSchema.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

const generateToken = (id, role, subscription) =>
  jwt.sign({ id, role, subscription }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

export const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, age, gender } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    let finalGender;
    if (age >= 18 && age <= 25) {
      finalGender = "adult";
    } else {
      finalGender = gender;
    }

    user = await User.create({
      firstName,
      lastName,
      email,
      password,
      age,
      gender: finalGender,
    });

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
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
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

    res.status(200).json({
      message: "Login successful",
      token: generateToken(user._id, user.role, user.subscription.type),
      user: userData,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const socialLogin = async (req, res) => {
  try {
    const { provider, providerId, firstName, lastName, email, profilePic } =
      req.body;

    if (!provider || !providerId) {
      return res
        .status(400)
        .json({ message: "Provider and providerId are required" });
    }

    // Check if user exists
    let user = await User.findOne({ provider, providerId });

    if (!user) {
      // Create new social user
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
    res.status(500).json({ error: error.message });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

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
    res.status(500).json({ error: error.message });
  }
};

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

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    // Optionally, auto-login user after password reset
    res.status(200).json({
      message: "Password reset successful",
      token: generateToken(user._id, user.role, user.subscription.type),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
