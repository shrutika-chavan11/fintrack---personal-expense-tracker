import mysql from "mysql2";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();


const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,

  ssl: {
    ca: fs.readFileSync("./ca.pem"),
  },
});

export default connection;