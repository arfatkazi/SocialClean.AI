import mongoose from "mongoose";

const UserContentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    provider: {
      type: String,
      enum: ["twitter", "instagram", "facebook", "google-photos"],
      required: true,
    },
    contentId: { type: String, required: true }, // ID from provider
    type: { type: String, enum: ["text", "image"], required: true },
    text: { type: String },
    mediaUrl: { type: String },
    fetchedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const UserContent = mongoose.model("UserContent", UserContentSchema);

export default UserContent;
