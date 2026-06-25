import connection from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql =
      "INSERT INTO users(name, email, password) VALUES (?, ?, ?)";

    connection.query(
      sql,
      [name, email, hashedPassword],
      (err, result) => {
        if (err) {
          console.log(err);

          return res.status(500).json({
            message: "Database Error",
          });
        }

        res.status(201).json({
          message: "User Registered Successfully",
          success: true
        });
      }
    );
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = ?";

    connection.query(sql, [email], async (err, result) => {
      if (err) {
  console.log("DB ERROR:", err);
}

      if (result.length === 0) {
        return res.status(401).json({
          message: "Invalid Credentials",
        });
      }

      const user = result[0];

      const isMatch = await bcrypt.compare(
        password,
        user.password
      );

      if (!isMatch) {
        return res.status(401).json({
          message: "Invalid Credentials",
        });
      }

     const token = jwt.sign(
  {
    id: user.id,
    name: user.name,
    email: user.email,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: "7d",
  }
);

res.status(200).json({
  message: "Login Successful",
  token,
});
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};