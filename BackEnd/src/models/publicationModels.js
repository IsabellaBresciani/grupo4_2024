const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Publicacion extends Model {}

Publicacion.init({
  idPublicacion: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  fecha: DataTypes.DATE,
  descripcion: DataTypes.TEXT,
  titulo: DataTypes.STRING,
  imagen: DataTypes.STRING
}, {
  sequelize,
  modelName: 'Publicacion',
  tableName: 'publicacion',
  timestamps: false
});

module.exports = Publicacion;
