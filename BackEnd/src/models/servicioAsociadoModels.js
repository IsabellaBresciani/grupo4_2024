const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Persona = require('./userModels');  
const Service = require('./serviceModels'); 

class UserService extends Model {}

UserService.init({
  idAsociacion: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  idPersona: {
    type: DataTypes.INTEGER,
    references: {
      model: Persona, // Referencia al modelo Persona
      key: 'id',
    },
    allowNull: false,
  },
  idServicio: {
    type: DataTypes.INTEGER,
    references: {
      model: Service, // Referencia al modelo Service
      key: 'idservice',
    },
    allowNull: false,
  },
  estado: {
    type: DataTypes.ENUM('activo', 'inactivo'), // Atributo enumerativo
    allowNull: false,
    defaultValue: 'activo', // Valor por defecto
  },
}, {
  sequelize,
  modelName: 'UserService',
  tableName: 'servicioasociado', // Nombre de la tabla intermedia
  timestamps: false, 
});

// Establecer la relación muchos a muchos
Persona.belongsToMany(Service, {
  through: UserService,
  foreignKey: 'idPersona',
  otherKey: 'idServicio',
  as: 'services'  // Alias para los servicios asociados a una persona
});

Service.belongsToMany(Persona, {
  through: UserService,
  foreignKey: 'idServicio',
  otherKey: 'idPersona',
  as: 'personas'  // Alias para las personas asociadas a un servicio
});

module.exports = UserService;