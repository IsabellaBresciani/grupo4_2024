const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Service extends Model{}

Service.init({
  idservice: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imagen: {
    type: DataTypes.STRING, // Se asume que la foto será una URL o un nombre de archivo
    allowNull: true,
  },
  
}, {
  sequelize,
  modelName: 'Service',
  tableName: 'service',
  timestamps: false,
});

module.exports = Service;
  