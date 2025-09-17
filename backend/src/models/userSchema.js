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

    // Password (local accounts only)
    password: {
      type: String,
      required: function () {
        return this.provider === "local"; // only required for local accounts
      },
      minlength: 6,
      match: [
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        "Password must be at least 6 characters long and include at least 1 letter, 1 number, and 1 special character",
      ],
    },

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
      country: { type: String, required: true, trim: true },
      city: { type: String, trim: true },
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
      expiry: { type: Date },
    },

    // Security
    resetPasswordToken: { type: String },
    resetPasswordExpire: { type: Date },
  },
  { timestamps: true }
);

// Compound index for social logins (safe for empty values)
userSchema.index(
  { provider: 1, providerId: 1 },
  { unique: true, sparse: true }
);

// Hash password before saving (only for local accounts)
userSchema.pre("save", async function (next) {
  if (this.provider !== "local") return next(); // skip hashing for social accounts
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password (only works for local accounts)
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
