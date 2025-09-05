import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: { type: String, required: true },

  // For Social Logins
  provider: {
    type: String,
    enum: ["local", "google", "facebook", "twitter"],
    default: "local",
  },
  providerId: { type: String },

  //  Profile Information
  profilePic: {
    type: String,
    default: "https://i.ibb.co/2FcP3hn/default-avatar.png",
  },
  bio: { type: String, default: "" },
  dateOfBirth: { type: Date },
  gender: { type: String, enum: ["male", "female", "other"], default: "other" },
  phone: { type: String },
  location: {
    country: { type: String },
    city: { type: String },
  },

  //  Preferences & Settings
  preferences: {
    autoClean: { type: Boolean, default: false },
    notifyReports: { type: Boolean, default: true },
    language: { type: String, default: "en" },
  },

  //  Usage & Subscription
  role: { type: String, enum: ["user", "admin"], default: "user" },
  subscription: {
    type: { type: String, enum: ["free", "premium"], default: "free" },
    expiry: { type: Date }, // premium expiry date
  },

  //  Security
  resetPasswordToken: { type: String },
  resetPasswordExpire: { type: Date },

  //  Metadata
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

userSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("User", userSchema);
