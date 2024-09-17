const express = require('express');
const router = express.Router();

// Importar rutas individuales
const clientRoutes = require('./client');
const loginRoutes = require('./login');
const serviceRoutes = require('./service');
const signUpRoutes = require('./signup');

// Usar las rutas importadas
router.use('/users', clientRoutes);
router.use('/products', serviceRoutes);
router.use('/login', loginRoutes);
router.use('/signup', signUpRoutes);

module.exports = router;
