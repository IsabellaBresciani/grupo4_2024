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
      model: 'Persona',
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'Review',
  tableName: 'review',
  timestamps: false
});

Persona.hasMany(Review, { //Esto indica que una persona puede tener muchas reviews
  foreignKey: 'idAutor', //Se especifica que la clave foránea que conecta Review con Persona es idAutor
  as: 'reviews'
});

Review.belongsTo(Persona, { //Esto indica que cada review solo pertence a una persona
  foreignKey: 'idAutor', //Se especifica que la clave foránea que conecta Review con Persona es idAutor
  onDelete: 'CASCADE' //Si una persona es eliminada de la BD, todas las review que pertenecen a esa persona también serán eliminadas automáticamente
});

module.exports = Review;
