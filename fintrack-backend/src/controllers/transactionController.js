import connection from "../config/db.js";

// GET ALL TRANSACTIONS
export const getTransactions = (req, res) => {
  console.log("GET TRANSACTIONS HIT");
  const userId = req.user.id;

  const sql = `
    SELECT * FROM transactions
    WHERE user_id = ?
    ORDER BY transaction_date DESC
  `;

  connection.query(sql, [userId], (err, results) => {

  console.log(results);

  if (err) {
    console.log(err);
    return res.status(500).json({
      message: "DB Error"
    });
  }

  res.json(results);
});
};

// CREATE TRANSACTION
export const createTransaction = (req, res) => {
  console.log("CREATE TRANSACTION HIT");

  const userId = req.user.id;

  const {
    account_id,
    type,
    category,
    amount,
    note,
  } = req.body;

  const sql = `
    INSERT INTO transactions
    (user_id, account_id, type, category, amount, note)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  connection.query(
    sql,
    [userId, account_id, type, category, amount, note],
    (err, result) => {

      if (err) {
        console.log(err);

        return res.status(500).json({
          message: err.message,
        });
      }

      console.log("INSERT SUCCESS");

      let updateSql = "";

      if (type === "Income") {

        updateSql = `
          UPDATE accounts
          SET balance = balance + ?
          WHERE id = ? AND user_id = ?
        `;

      } else if (type === "Expense") {

        updateSql = `
          UPDATE accounts
          SET balance = balance - ?
          WHERE id = ? AND user_id = ?
        `;

      } else {

        return res.json({
          message: "Transaction added",
        });

      }

      connection.query(
        updateSql,
        [amount, account_id, userId],
        (err2) => {

          if (err2) {
            console.log(err2);

            return res.status(500).json({
              message: "Balance update failed",
            });
          }

          console.log("BALANCE UPDATED");

          res.json({
            message: "Transaction added",
          });

        }
      );

    }
  );
};
// DELETE TRANSACTION
export const deleteTransaction = (req, res) => {
  const userId = req.user.id;
  const id = req.params.id;

  const sql = `
    DELETE FROM transactions
    WHERE id = ? AND user_id = ?
  `;

  connection.query(sql, [id, userId], (err) => {
    if (err) return res.status(500).json({ message: "DB Error" });

    res.json({ message: "Transaction deleted" });
  });
};