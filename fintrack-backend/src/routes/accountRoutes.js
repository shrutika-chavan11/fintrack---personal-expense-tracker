import express from "express";
import {
  createAccount,
  getAccounts,
  deleteAccount,
} from "../controllers/accountController.js";

import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", verifyToken, getAccounts);
router.post("/", verifyToken, createAccount);
router.delete("/:id", verifyToken, deleteAccount);

export default router;