import express from "express";
const router = express.Router();

import {
    shortenUrl,
    getStats
} from "../controllers/shortenerController.js";

import shortenLimiter from "../middlewares/rateLimit.js";

router.post("/shorten", shortenLimiter, shortenUrl);
router.get("/stats/:code", getStats);

export default router;