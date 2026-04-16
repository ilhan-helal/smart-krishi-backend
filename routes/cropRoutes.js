import express from "express";
import { recommendCrop } from "../controllers/cropController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// protected route
router.post("/recommend", protect, recommendCrop);

export default router;