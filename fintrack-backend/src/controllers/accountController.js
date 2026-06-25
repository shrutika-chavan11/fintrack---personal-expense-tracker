import connection from "../config/db.js";

// GET ACCOUNTS
export const getAccounts = (req, res) => {
  const userId = req.user.id;

  const sql = "SELECT * FROM accounts WHERE user_id = ?";

  connection.query(sql, [userId], (err, results) => {
    if (err) return res.status(500).json({ message: "DB Error" });

    res.json(results);
  });
};

// CREATE ACCOUNT
export const createAccount = (req, res) => {
  const userId = req.user.id;

  const {
    account_name,
    bank_name,
    account_type,
    balance,
    last_four_digits,
  } = req.body;

  const sql = `
    INSERT INTO accounts
    (user_id, account_name, bank_name, account_type, balance, last_four_digits)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  connection.query(
    sql,
    [
      userId,
      account_name,
      bank_name,
      account_type,
      balance,
      last_four_digits,
    ],
    (err) => {
      if (err) return res.status(500).json({ message: "DB Error" });

      res.json({ message: "Account created" });
    }
  );
};

// DELETE ACCOUNT
export const deleteAccount = (req, res) => {
  const userId = req.user.id;
  const id = req.params.id;

  const sql = "DELETE FROM accounts WHERE id = ? AND user_id = ?";

  connection.query(sql, [id, userId], (err) => {
    if (err) return res.status(500).json({ message: "DB Error" });

    res.json({ message: "Account deleted" });
  });
};

// ACCOUNT SUMMARY
export const getAccountSummary = (req, res) => {
  const userId = req.user.id;

  const sql = `
    SELECT 
      COUNT(*) AS totalAccounts,
      SUM(balance) AS totalBalance
    FROM accounts
    WHERE user_id = ?
  `;

  connection.query(sql, [userId], (err, result) => {
    if (err) return res.status(500).json({ message: "DB Error" });

    res.json(result[0]);
  });
};