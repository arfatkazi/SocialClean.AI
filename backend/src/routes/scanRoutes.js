import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  startScan,
  getScan,
  getLatestScan,
} from "../controllers/scanController.js";

const router = express.Router();

router.post("/start", protect, startScan);
router.get("/:scanId", protect, getScan);
router.get("/latest/now", protect, getLatestScan);

export default router;
