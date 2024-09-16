const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
const bcrypt = require('bcryptjs');



dotenv.config({path: './.env'});

const connection = mysql.createConnection({
    host: process.env.host,
    database: process.env.database,
    user: process.env.user,
    password: process.env.password,
    waitForConnections: true,
    connectionLimit: 10, // Número máximo de conexiones simultáneas
    queueLimit: 0
  });

getConnection = async() => connection;

module.exports= {
    getConnection
}
