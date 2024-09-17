const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
const bcrypt = require('bcryptjs');

dotenv.config({path: '../../.env'});

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.PORT_DB,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

pool.getConnection()
  .then(conn => {
    console.log("Conexión exitosa a la base de datos");
    conn.release();
  })
  .catch(err => {
    console.error("Error conectándose a la base de datos:", err);
  });

module.exports = pool;