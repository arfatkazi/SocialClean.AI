import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
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

    // ✅ Password not required if Google user
    password: {
      type: String,
      required: function () {
        return !this.isGoogleUser;
      },
      minlength: 6,
      match: [
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/,
        "Password must be at least 6 characters, include 1 letter, 1 number, 1 special char",
      ],
    },

    age: { type: Number },
    profilePic: {
      type: String,
      default: "https://i.ibb.co/2FcP3hn/default-avatar.png",
    },
    bio: { type: String, default: "" },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "other",
    },

    // ✅ Location not required for Google signup
    location: {
      country: { type: String, default: "Unknown", trim: true },
      city: { type: String, trim: true },
    },

    role: { type: String, enum: ["user", "admin"], default: "user" },
    subscription: {
      type: { type: String, enum: ["free", "premium"], default: "free" },
      expiry: { type: Date },
    },
    resetPasswordToken: { type: String },
    resetPasswordExpire: { type: Date },

    // ✅ Google login fields
    isGoogleUser: { type: Boolean, default: false },
    googleId: { type: String },

    // ✅ OAuth tokens storage (optional)
    oauth: {
      googlePhotos: {
        accessToken: { type: String },
        refreshToken: { type: String },
        expiry: { type: Date },
      },
      facebook: {
        accessToken: { type: String },
        refreshToken: { type: String },
        expiry: { type: Date },
      },
      instagram: {
        accessToken: { type: String },
        refreshToken: { type: String },
        expiry: { type: Date },
      },
      twitter: {
        accessToken: { type: String },
        refreshToken: { type: String },
        expiry: { type: Date },
      },
    },
  },
  { timestamps: true }
);

// ✅ Hash password only if normal user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || this.isGoogleUser) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// ✅ Compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
export default User;
