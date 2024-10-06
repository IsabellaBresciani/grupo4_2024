const express = require('express');
const router = express.Router(); //El objeto router se usará para definir rutas específicas de la aplicación.

// Importar rutas individuales
const userRoutes = require('./user'); //Acceso a las rutas definidas del archivo user
const loginRoutes = require('./login');
const serviceRoutes = require('./service');
const signUpRoutes = require('./signup');
const reviewRoutes = require('./review');
const publicationRoutes = require('./publication');

// Usar las rutas importadas
router.use('/user', userRoutes); //Las rutas definidas en userRoutes deben estar disponibles bajo la URL base /user.
router.use('/service', serviceRoutes);
router.use('/login', loginRoutes);
router.use('/signup', signUpRoutes);
router.use('/review', reviewRoutes);
router.use('/publication', publicationRoutes);

module.exports = router;