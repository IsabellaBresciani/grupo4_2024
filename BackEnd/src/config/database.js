const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
const bcrypt = require('bcryptjs');



dotenv.config({path: '../../.env'});

const pool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.NAME,
  port: process.env.PORT_DB,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;