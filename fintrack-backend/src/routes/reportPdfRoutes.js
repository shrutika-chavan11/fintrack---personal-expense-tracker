import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { exportMonthlyPDF } from "../controllers/reportPdfController.js";

const router = express.Router();

router.get("/monthly/pdf", verifyToken, exportMonthlyPDF);

export default router;         