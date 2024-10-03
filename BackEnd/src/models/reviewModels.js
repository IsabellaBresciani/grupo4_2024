const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Persona = require('./userModels')

class Review extends Model {}

Review.init({
  idreview: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  precio: DataTypes.INTEGER,
  atencion: DataTypes.INTEGER,
  calidad: DataTypes.INTEGER,
  tiempo: DataTypes.INTEGER,
  comentario: DataTypes.TEXT,
  idAutor: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Persona',   // Referencia al modelo `Persona`
      key: 'id'      // `id` es la clave primaria de `Persona`
    }
  }
}, {
  sequelize,
  modelName: 'Review',
  tableName: 'review',
  timestamps: false
});

// Definimos la asociación
Persona.hasMany(Review, {
  foreignKey: 'idAutor',
  as: 'reviews'
});

Review.belongsTo(Persona, {
  foreignKey: 'idAutor',
  onDelete: 'CASCADE'  // Si un usuario es eliminado, sus reseñas también lo serán
});

module.exports = Review;
