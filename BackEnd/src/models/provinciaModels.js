const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Provincia extends Model {}

Provincia.init({
    idProvincia: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombreProvincia: DataTypes.STRING,
},{
    sequelize,
    modelName: 'Provincia',
    tableName: 'provincia',
    timestamps: false
});

module.exports = Provincia;
