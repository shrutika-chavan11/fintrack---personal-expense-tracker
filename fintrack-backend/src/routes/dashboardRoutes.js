import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
  getStats,
  getMonthlyData,
  getCategoryData,
  getRecentTransactions,
  getTotalBalance,
} from "../controllers/dashboardController.js";

const router = express.Router();

console.log("DASHBOARD ROUTES LOADED");

router.get("/stats", verifyToken, getStats);
router.get("/monthly", verifyToken, getMonthlyData);
router.get("/category", verifyToken, getCategoryData);
router.get("/recent", verifyToken, getRecentTransactions);
router.get("/balance", verifyToken, getTotalBalance);

router.get("/test", (req, res) => {
  console.log("TEST ROUTE HIT");
  res.json({
    message: "Dashboard route works",
  });
});

export default router;