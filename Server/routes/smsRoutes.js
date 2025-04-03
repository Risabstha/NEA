import express from "express";
import { sendBulkSMS } from "../controllers/smsController.js"; // Import the controller
import { smsProtect } from "../middleware/authMiddleware.js";
import rateLimit from 'express-rate-limit';

const router = express.Router();

const smsRateLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 15 minutes
    max: 2, // Allow 5 SMS send attempts per window
    message: 'Too many SMS requests. Please try again later.',
    standardHeaders: true, // Return rate limit info in headers
    legacyHeaders: false, // Disable legacy headers
  });
// POST route to send SMS
// router.post("/",smsRateLimiter, smsProtect, sendBulkSMS);

router.post("/", smsProtect, sendBulkSMS);
export default router;
