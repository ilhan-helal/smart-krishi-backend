import express from "express";

import { analyzeSoil } from "../controllers/aiController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
  "/analyze",
  protect,
  analyzeSoil
);

export default router;