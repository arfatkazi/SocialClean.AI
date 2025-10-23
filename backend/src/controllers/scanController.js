import Scan from "../models/scanSchema.js";
import { analyzeText, analyzeImage } from "../services/aiService.js";

// Start scan
export const startScan = async (req, res) => {
  try {
    const { posts } = req.body;
    if (!posts || !Array.isArray(posts) || posts.length === 0)
      return res.status(400).json({ message: "No posts provided" });

    const scan = await Scan.create({
      user: req.user.id,
      status: "pending",
      items: posts.map((p) => ({
        platform: p.platform,
        postId: p.postId,
        type: p.type || "Text",
        content: p.content || "",
      })),
      meta: { startedAt: new Date() },
    });

    process.nextTick(() => processScan(scan._id.toString()));
    res.status(202).json({ message: "Scan started", scanId: scan._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get specific scan
export const getScan = async (req, res) => {
  try {
    const scan = await Scan.findById(req.params.scanId);
    if (!scan) return res.status(404).json({ message: "Not found" });
    if (scan.user.toString() !== req.user.id)
      return res.status(403).json({ message: "Not authorized" });
    res.json(scan);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Worker
const processScan = async (scanId) => {
  try {
    const scan = await Scan.findById(scanId);
    if (!scan) return;

    scan.status = "processing";
    await scan.save();

    let safe = 0,
      flagged = 0,
      privateCount = 0;

    for (const item of scan.items) {
      let result;
      if (item.type === "Image") result = await analyzeImage(item.content);
      else result = await analyzeText(item.content);

      item.category = result.category;
      item.confidence = result.confidence;
      item.reasons = result.reasons;

      if (result.category === "Safe") safe++;
      if (result.category === "Offensive") flagged++;
      if (result.category === "Private Info") privateCount++;
    }

    const reputationScore = Math.max(0, 100 - flagged * 3 - privateCount * 2);

    scan.summary = {
      safeCount: safe,
      flaggedCount: flagged,
      privateCount,
      reputationScore,
    };
    scan.status = "done";
    scan.meta.finishedAt = new Date();

    await scan.save();
  } catch (err) {
    console.error("Process scan error:", err);
    await Scan.findByIdAndUpdate(scanId, { status: "failed" });
  }
};

// Latest scan
export const getLatestScan = async (req, res) => {
  try {
    const scan = await Scan.findOne({ user: req.user.id }).sort({
      createdAt: -1,
    });
    if (!scan) return res.status(404).json({ message: "No scans found" });
    res.json({
      summary: scan.summary,
      items: scan.items,
      createdAt: scan.createdAt,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
