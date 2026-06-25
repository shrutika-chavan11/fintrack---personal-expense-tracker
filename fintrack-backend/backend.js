import express from "express";
import connection from "./src/config/db.js";

import { verifyToken } from "./src/middleware/authMiddleware.js";
import authRoutes from "./src/routes/authRoutes.js";
import accountRoutes from "./src/routes/accountRoutes.js";
import transactionRoutes from "./src/routes/transactionRoutes.js";
import dashboardRoutes from "./src/routes/dashboardRoutes.js";
import budgetRoutes from "./src/routes/budgetRoutes.js";
import reportRoutes from "./src/routes/reportRoutes.js";
import alertRoutes from "./src/routes/alertRoutes.js";
import pdfRoutes from "./src/routes/reportPdfRoutes.js";
import cors from "cors";



const app = express();

app.use(cors());

// ✅ 2. JSON parser
app.use(express.json());


connection.connect((err) => {
  if (err) {
    console.log("Database connection failed");
    console.log(err);
    return;
  }

  console.log("MySQL Connected");
});

app.get("/profile", verifyToken, (req, res) => {
  res.json({
    message: "Protected Route Accessed",
    user: req.user,
  });
});

app.get("/", (req, res) => {
  res.send("FinTrack Backend Running");
});

app.use("/api/auth", authRoutes);
app.use("/api/accounts", accountRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/reports", pdfRoutes);


app.listen(5000, () => {
  console.log("Server running on port 5000");
});

