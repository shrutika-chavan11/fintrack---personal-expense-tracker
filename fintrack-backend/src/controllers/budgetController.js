import connection from "../config/db.js";

/* =========================
   SET / UPDATE BUDGET
========================= */
export const setBudget = (req, res) => {
  const userId = req.user.id;
  const { category, budget_amount } = req.body;

  const sql = `
    INSERT INTO budgets (user_id, category, budget_amount)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE budget_amount = VALUES(budget_amount)
  `;

  connection.query(sql, [userId, category, budget_amount], (err) => {
    if (err) return res.status(500).json({ message: "DB Error" });

    res.json({ message: "Budget saved" });
  });
};

/* =========================
   GET ALL BUDGETS
========================= */
export const getBudgets = (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT * FROM budgets
    WHERE user_id = ?
  `;

  connection.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ message: "DB Error" });

    res.json(results);
  });
};

/* =========================
   GET BUDGET PROGRESS
========================= */
export const getBudgetProgress = (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT 
      b.id,
      b.category,
      b.budget_amount,
      COALESCE(SUM(t.amount),0) AS spent
    FROM budgets b
    LEFT JOIN transactions t
      ON b.category = t.category
      AND t.type = 'Expense'
      AND t.user_id = b.user_id
      AND MONTH(t.transaction_date) = MONTH(CURRENT_DATE)
      AND YEAR(t.transaction_date) = YEAR(CURRENT_DATE)
    WHERE b.user_id = ?
    GROUP BY b.id,b.category, b.budget_amount
  `;

  connection.query(sql, [userId], (err, results) => {
    if (err) {
      console.log("BUDGET PROGRESS ERROR:", err);
      return res.status(500).json({ message: "DB Error" });
    }

    res.json(results);
  });
};

export const getBudgetCategories = (req, res) => {
  const userId = req.user.id;
  const sql = `SELECT category FROM budgets WHERE user_id = ?`;

  connection.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ message: "DB Error" });
    res.json(results.map((r) => r.category));
  });
};

// RENAME CATEGORY
export const renameBudget = (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;
  const { category, budget_amount } = req.body;

  const sql = `
    UPDATE budgets
    SET category = ?, budget_amount = ?
    WHERE id = ? AND user_id = ?
  `;

  connection.query(sql, [category, budget_amount, id, userId], (err) => {
    if (err) return res.status(500).json({ message: "DB Error" });
    res.json({ message: "Budget updated" });
  });
};

// DELETE BUDGET
export const deleteBudget = (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  const sql = `DELETE FROM budgets WHERE id = ? AND user_id = ?`;

  connection.query(sql, [id, userId], (err) => {
    if (err) return res.status(500).json({ message: "DB Error" });
    res.json({ message: "Budget deleted" });
  });
};