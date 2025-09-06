import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    // Basic Info
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
    },
    password: { type: String, required: true },
    age: { type: Number },

    // Social Logins
    provider: {
      type: String,
      enum: ["local", "google", "facebook", "twitter"],
      default: "local",
    },
    providerId: { type: String },

    // Profile Info
    profilePic: {
      type: String,
      default: "https://i.ibb.co/2FcP3hn/default-avatar.png",
    },
    bio: { type: String, default: "" },
    dateOfBirth: { type: Date },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "other",
    },
    phone: { type: String },
    location: {
      country: { type: String },
      city: { type: String },
    },

    // Preferences & Settings
    preferences: {
      autoClean: { type: Boolean, default: false },
      notifyReports: { type: Boolean, default: true },
      language: { type: String, default: "en" },
    },

    // Role & Subscription
    role: { type: String, enum: ["user", "admin"], default: "user" },
    subscription: {
      type: { type: String, enum: ["free", "premium"], default: "free" },
      expiry: { type: Date }, // premium expiry date
    },

    // Security
    resetPasswordToken: { type: String },
    resetPasswordExpire: { type: Date },
  },
  { timestamps: true } // automatically adds createdAt & updatedAt
);

// Compound index for social logins to prevent duplicates
userSchema.index(
  { provider: 1, providerId: 1 },
  { unique: true, sparse: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare password during login
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
