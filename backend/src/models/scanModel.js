import mongoose from "mongoose";

const scanSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        type: { type: String },
        content: { type: String },
        category: { type: String },
      },
    ],
    summary: {
      safe: { type: Number, default: 0 },
      offensive: { type: Number, default: 0 },
      private: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

const Scan = mongoose.model("Scan", scanSchema);

export default Scan;
