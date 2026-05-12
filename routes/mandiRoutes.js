import express from "express";
import { getMandiPrices } from "../controllers/mandiController.js";
import { protect } from "../middleware/authMiddleware.js";
import { getAllMandiPrices } from "../controllers/mandiController.js";


const router = express.Router();

router.get("/", protect, getMandiPrices);
router.get("/all", protect, getAllMandiPrices);

export default router;