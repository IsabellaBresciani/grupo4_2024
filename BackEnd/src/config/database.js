const dotenv = require("dotenv");
const bcrypt = require('bcryptjs');
const { Sequelize } = require('sequelize');

// dotenv.config({path: '../../.env'});
/*
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
*/ 

const sequelize = new Sequelize('servicioya', 'grupodesa', 'admin', {
  host: '190.188.16.203',
  dialect: 'mysql',
  port: 3306,
  logging: false,
});

sequelize.authenticate()
  .then(() => {
    console.log('Conexión exitosa a la base de datos.');
  })
  .catch(err => {
    console.error('Error al conectar a la base de datos:', err);
  });

module.exports = sequelize;