import PDFDocument from "pdfkit";
import connection from "../config/db.js";

export const exportMonthlyPDF = (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT 
      DATE_FORMAT(transaction_date, '%b %Y') AS month,
      DATE_FORMAT(transaction_date, '%Y-%m') AS month_sort,
      SUM(CASE WHEN type='Income' THEN amount ELSE 0 END) AS income,
      SUM(CASE WHEN type='Expense' THEN amount ELSE 0 END) AS expense
    FROM transactions
    WHERE user_id = ?
    GROUP BY month_sort, month
    ORDER BY month_sort DESC
  `;

  connection.query(sql, [userId], (err, data) => {
    if (err) return res.status(500).json({ message: err.message });

    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=fintrack-report.pdf"
    );

    doc.pipe(res);

    doc.fontSize(20).text("FinTrack Monthly Report", { align: "center" });
    doc.moveDown();

    data.forEach((row) => {
      doc
        .fontSize(12)
        .text(
          `Month: ${row.month} | Income: ₹${row.income} | Expense: ₹${row.expense} | Savings: ₹${row.income - row.expense}`
        );
      doc.moveDown(0.5);
    });

    doc.end();
  });
};