const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Persona = require('./userModels')

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
  imagen: DataTypes.STRING,
  idUser:{
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Persona',   // Referencia al modelo `Persona`
      key: 'id'      // `id` es la clave primaria de `Persona`
    }
  }
}, {
  sequelize,
  modelName: 'Publicacion',
  tableName: 'publicacion',
  timestamps: false
});

// Definimos la asociación
Persona.hasMany(Publicacion, {
  foreignKey: 'idAutor',
  as: 'publications'
});

Publicacion.belongsTo(Persona, {
  foreignKey: 'idAutor',
  onDelete: 'CASCADE'  // Si un usuario es eliminado, sus reseñas también lo serán
});

module.exports = Publicacion;
