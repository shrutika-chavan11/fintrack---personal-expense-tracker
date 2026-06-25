import express from "express";
import {
  createTransaction,
  getTransactions,
  deleteTransaction,
} from "../controllers/transactionController.js";

import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getTransactions);
router.post("/", verifyToken, createTransaction);
router.delete("/:id", verifyToken, deleteTransaction);

export default router;