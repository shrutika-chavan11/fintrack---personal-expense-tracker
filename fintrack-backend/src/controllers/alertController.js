import connection from "../config/db.js";

export const getAlerts = (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT 
      b.category,
      b.budget_amount,
      COALESCE(SUM(t.amount),0) AS spent
    FROM budgets b
    LEFT JOIN transactions t
      ON b.category = t.category
      AND t.type = 'Expense'
      AND t.user_id = b.user_id
    WHERE b.user_id = ?
    GROUP BY b.category, b.budget_amount
    HAVING spent > budget_amount
  `;

  connection.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ message: "DB Error" });

    res.json(results);
  });
};