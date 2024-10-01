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
  precio: DataTypes.FLOAT,
  atencion: DataTypes.FLOAT,
  calidad: DataTypes.FLOAT,
  tiempo: DataTypes.FLOAT,
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
  foreignKey: 'idAutor'
});

Review.belongsTo(Persona, {
  foreignKey: 'idAutor',
  onDelete: 'CASCADE'  // Si un usuario es eliminado, sus reseñas también lo serán
});

module.exports = Review;
