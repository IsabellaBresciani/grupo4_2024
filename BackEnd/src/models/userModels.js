const { Model, DataTypes } = require('sequelize'); //Se importan Model (Representa una tabla en la BD) y DataTypes (Los tipos que van a tener cada columna de la BD)
const sequelize = require('../config/database'); //Se importa la instancia de conexion a la BD

class Persona extends Model {} //Se define la clase persona que extiende Model

Persona.init({ // Se inicializa el modelo Persona
  id: { //Atributo de la persona
    type: DataTypes.INTEGER, //Tipo de la columna
    autoIncrement: true, //Se autoincrementa
    primaryKey: true, //Es la Primary Key De la tabla
  },
  dni: {
    type: DataTypes.STRING,
    allowNull: false, //No permite NULL
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellido: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha_nacimiento: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  usuario: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  foto: {
    type: DataTypes.STRING, // Se asume que la foto será una URL o un nombre de archivo
    allowNull: true, // Puede ser nulo si no es obligatorio
  },
}, {
  sequelize,
  modelName: 'Persona', //Nombre del modelo
  tableName: 'user', //Nombre de la tabla de la BD
  createdAt: 'created_at', //Nombre de la columna para la fecha de creación
  timestamps: false,
});

module.exports = Persona;