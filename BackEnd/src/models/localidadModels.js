const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Provincia = require('./provinciaModels')

class Localidad extends Model {}

Localidad.init({
    idPublicacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    codPostal: DataTypes.STRING,
    nombre: DataTypes.STRING,
    idProvincia: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Provincia',
          key: 'idProvincia'
        }
    }
},{
    sequelize,
    modelName: 'Localidad',
    tableName: 'localidad',
    timestamps: false
})

// Definimos la asociación
Provincia.hasMany(Review, {
    foreignKey: 'idProvincia',
    as: 'localidad'
  });
  
Localidad.belongsTo(Provincia, {
   foreignKey: 'idProvincia',
   onDelete: 'CASCADE'  // Si un usuario es eliminado, sus reseñas también lo serán
});

module.exports = Localidad;
