import connection from "../config/db.js";

/* =========================
   1. TOTAL STATS
========================= */


export const getStats = (req, res) => {
  console.log("GET STATS HIT");
  const userId = req.user.id;

  const sql = `
    SELECT 
      SUM(CASE WHEN type='Income' THEN amount ELSE 0 END) AS income,
      SUM(CASE WHEN type='Expense' THEN amount ELSE 0 END) AS expense
    FROM transactions
    WHERE user_id = ?
  `;

  connection.query(sql, [userId], (err, result) => {
    if (err) return res.status(500).json({ message: "DB Error" });

    const income = result[0].income || 0;
    const expense = result[0].expense || 0;

    res.json({
      totalIncome: income,
      totalExpense: expense,
      savings: income - expense,
    });
  });
};

/* =========================
   2. MONTHLY DATA
========================= */
export const getMonthlyData = (req, res) => {
  console.log("MONTHLY API HIT");
  const userId = req.user.id;

  const sql = `
    SELECT 
      DATE_FORMAT(transaction_date, '%b %Y') AS month,
      YEAR(transaction_date) AS year,
      MONTH(transaction_date) AS month_num,
      SUM(CASE WHEN type = 'Income' THEN amount ELSE 0 END) AS income,
      SUM(CASE WHEN type = 'Expense' THEN amount ELSE 0 END) AS expense
    FROM transactions
    WHERE user_id = ?
    GROUP BY year, month_num, month
    ORDER BY year ASC, month_num ASC
  `;

  connection.query(sql, [userId], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: err.message });
    }

    console.log("MONTHLY RESULT:", result);
    res.json(result);
  });
};
/* =========================
   3. CATEGORY DATA
========================= */
export const getCategoryData = (req, res) => {
  console.log("GET CATEGORY HIT");
  const userId = req.user.id;

  const sql = `
    SELECT category, SUM(amount) AS value
    FROM transactions
    WHERE user_id = ? AND type='Expense'
    GROUP BY category
  `;

  connection.query(sql, [userId], (err, result) => {
    if (err) return res.status(500).json({ message: "DB Error" });

    res.json(result);
  });
};

/* =========================
   4. RECENT TRANSACTIONS
========================= */
export const getRecentTransactions = (req, res) => {
  console.log("GET RECENT TRANSACTIONS HIT");
  const userId = req.user.id;

  const sql = `
    SELECT *
    FROM transactions
    WHERE user_id = ?
    ORDER BY transaction_date DESC
    LIMIT 5
  `;

  connection.query(sql, [userId], (err, result) => {
    if (err) return res.status(500).json({ message: "DB Error" });

    res.json(result);
  });
};

export const getTotalBalance = (req, res) => {
  console.log("GET TOTAL BALANCE HIT");
  const userId = req.user.id;

  const sql = `
    SELECT SUM(balance) AS totalBalance
    FROM accounts
    WHERE user_id = ?
  `;

  connection.query(sql, [userId], (err, result) => {

    if (err) {
      return res.status(500).json({
        message: "DB Error",
      });
    }

    res.json({
      totalBalance: result[0].totalBalance || 0,
    });
  });
};