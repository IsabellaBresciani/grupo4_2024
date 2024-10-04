require('dotenv').config(); //Esta línea importa el paquete dotenv y llama al método config(), que carga las variables de entorno desde un archivo .env en el proyecto

const config = { // El objeto "config" tendra las configuraciones que se usarán en otras partes de la aplicación
  port: process.env.PORT || 4444,
  jwtSecret: process.env.JWT_SECRET || 'default_secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h'
};

module.exports = config;
