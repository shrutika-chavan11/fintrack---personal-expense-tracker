import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { getMonthlyReport } from "../controllers/reportController.js";

const router = express.Router();

router.get("/monthly", verifyToken, getMonthlyReport);

export default router;