import express from "express";

import { getAgricultureNews } from "../controllers/newsController.js";

const router = express.Router();

router.get("/", getAgricultureNews);

export default router;