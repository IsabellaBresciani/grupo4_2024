const { Sequelize } = require('sequelize');
require('dotenv').config();

/* Se crea una instancia de sequelize, que es el ORM que conecta la aplicación con la BD mysql donde a traves del .env se obtendran 
las variables de entorno que nos brindan el puerto, user, password, etc de la BD */

const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
  host: process.env.HOST,
  dialect: 'mysql',
  port: process.env.PORT_DB,
  logging: false,
});

sequelize.authenticate() //Esta linea se encarga de comprobar si la conexion con la BD fue exitosa
  .then(() => {
    console.log('Conexión exitosa a la base de datos.'); //Si es exitosa mostrara este mensaje
  })
  .catch(err => {
    console.error('Error al conectar a la base de datos:', err); //Caso contrario se mostrara este
  });

module.exports = sequelize;