const express = require('express');
const router = express.Router();

// Importar rutas individuales
const userRoutes = require('./user');
const searchRoutes = require('./search');
const loginRoutes = require('./login');
const serviceRoutes = require('./service');
const signUpRoutes = require('./signup');
const reviewRoutes = require('./review');
const publicationRoutes = require('./publication')
const localidadRoutes = require('./localidad')

// Usar las rutas importadas
router.use('/user', userRoutes);
router.use('/search', searchRoutes);
router.use('/service', serviceRoutes);
router.use('/login', loginRoutes);
router.use('/signup', signUpRoutes);
router.use('/review', reviewRoutes);
router.use('/publication', publicationRoutes);
router.use('/localidad', localidadRoutes);

module.exports = router;