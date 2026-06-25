import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { getAlerts } from "../controllers/alertController.js";

const router = express.Router();

router.get("/", verifyToken, getAlerts);

export default router;