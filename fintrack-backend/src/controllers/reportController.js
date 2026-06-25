import connection from "../config/db.js";

export const getMonthlyReport = (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT 
      DATE_FORMAT(transaction_date, '%b %Y') AS month,
      DATE_FORMAT(transaction_date, '%Y-%m') AS month_sort,
      SUM(CASE WHEN type='Income' THEN amount ELSE 0 END) AS income,
      SUM(CASE WHEN type='Expense' THEN amount ELSE 0 END) AS expense,
      SUM(CASE WHEN type='Income' THEN amount ELSE 0 END) -
      SUM(CASE WHEN type='Expense' THEN amount ELSE 0 END) AS savings
    FROM transactions
    WHERE user_id = ?
    GROUP BY month_sort, month
    ORDER BY month_sort DESC
  `;

  connection.query(sql, [userId], (err, result) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(result);
  });
};