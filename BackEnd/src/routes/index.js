const express = require('express');
const router = express.Router();

// Importar rutas individuales
const userRoutes = require('./user');
const loginRoutes = require('./login');
const serviceRoutes = require('./service');
const signUpRoutes = require('./signup');

// Usar las rutas importadas
router.use('/users', userRoutes);
router.use('/service', serviceRoutes);
router.use('/login', loginRoutes);
router.use('/signup', signUpRoutes);

module.exports = router;