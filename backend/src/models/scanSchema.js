import mongoose from "mongoose";

const scanItemSchema = new mongoose.Schema({
  platform: String,
  postId: String,
  type: String,
  content: String,
  category: String,
  confidence: Number,
  reasons: [String],
});

const scanSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, default: "pending" },
    items: [scanItemSchema],
    summary: {
      safeCount: { type: Number, default: 0 },
      flaggedCount: { type: Number, default: 0 },
      privateCount: { type: Number, default: 0 },
      reputationScore: { type: Number, default: 100 },
    },
    meta: {
      startedAt: Date,
      finishedAt: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Scan", scanSchema);
