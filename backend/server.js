import dotenv from "dotenv";
dotenv.config();
import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import { isSpoofedBot } from "@arcjet/inspect";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

//Routes
app.use("/api/auth", authRoutes);

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),
    tokenBucket({
      mode: "LIVE",
      refillRate: 5,
      interval: 10,
      capacity: 10,
    }),
  ],
});

app.get("/", async (req, res) => {
  const decision = await aj.protect(req, { requested: 5 });
  console.log("Arcjet decision", decision);

  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      return res.status(429).json({ error: "Too Many Requests" });
    } else if (decision.reason.isBot()) {
      return res.status(403).json({ error: "No bots allowed" });
    } else {
      return res.status(403).json({ error: "Forbidden" });
    }
  }

  if (decision.ip.isHosting()) {
    return res.status(403).json({ error: "Forbidden (Hosting IP)" });
  }

  if (decision.results.some(isSpoofedBot)) {
    return res.status(403).json({ error: "Forbidden (Spoofed Bot)" });
  }

  // ✅ If passed all Arcjet checks
  return res.status(200).json({ message: "Hello World (secured)" });
});

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Server startup error:", err.message);
    process.exit(1);
  }
};

startServer();
