import express from "express";
import {
  setBudget,
  getBudgets,
  getBudgetProgress,
  getBudgetCategories,
  renameBudget,
  deleteBudget
} from "../controllers/budgetController.js";

import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, setBudget);
router.get("/", verifyToken, getBudgets);
router.get("/progress", verifyToken, getBudgetProgress);
router.get("/categories", verifyToken, getBudgetCategories);
router.put("/:id", verifyToken, renameBudget);       
router.delete("/:id", verifyToken, deleteBudget);    

export default router;