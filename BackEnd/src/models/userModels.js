const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Persona extends Model {}

Persona.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  dni: {
    type: DataTypes.STRING,
    allowNull: false,
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
  modelName: 'Persona',
  tableName: 'user', // Asegúrate de que el nombre de la tabla sea correcto
  createdAt: 'created_at',
  timestamps: false, // Para usar createdAt y updatedAt
});

module.exports = Persona;