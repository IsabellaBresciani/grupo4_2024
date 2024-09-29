const express = require('express');
const router = express.Router();

// Importar rutas individuales
const userRoutes = require('./user');
const loginRoutes = require('./login');
const serviceRoutes = require('./service');
const signUpRoutes = require('./signup');
const reviewRoutes = require('./review');

// Usar las rutas importadas
router.use('/user', userRoutes);
router.use('/service', serviceRoutes);
router.use('/login', loginRoutes);
router.use('/signup', signUpRoutes);
router.use('/review', reviewRoutes);

module.exports = router;