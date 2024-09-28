require('dotenv').config();

const config = {
  port: process.env.PORT || 4444,
  jwtSecret: process.env.JWT_SECRET || 'default_secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h'
};

module.exports = config;
