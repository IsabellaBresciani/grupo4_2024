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
      model: Persona,
      key: 'id',
    },
    allowNull: false,
  },
  idServicio: {
    type: DataTypes.INTEGER,
    references: { //Permite referenciar a un modelo
      model: Service, //Se referencia al modelo Service
      key: 'idservice', //Se hace referencia al id de Service
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
  tableName: 'servicioasociado',
  timestamps: false, 
});

// Establecer la relación muchos a muchos

Persona.belongsToMany(Service, { //Esto establece que el modelo Persona tiene una relación de muchos a muchos con el modelo Service
  through: UserService, // La tabla intermedia que se utiliza para la relación.
  foreignKey: 'idPersona', // Clave foránea en la tabla intermedia que hace referencia a `Persona`.
  otherKey: 'idServicio', // Clave foránea en la tabla intermedia que hace referencia a `Service`.
  as: 'services' // Alias que se utilizará para acceder a los servicios asociados a una persona.
});

Service.belongsToMany(Persona, { //Esto establece que el modelo Service tiene una relación de muchos a muchos con el modelo Persona
  through: UserService, // La tabla intermedia que se utiliza para la relación.
  foreignKey: 'idServicio', // Clave foránea en la tabla intermedia que hace referencia a `Service`.
  otherKey: 'idPersona', // Clave foránea en la tabla intermedia que hace referencia a `Persona`.
  as: 'personas' // Alias que se utilizará para acceder a las personas asociados a un servicio.
});

module.exports = UserService;