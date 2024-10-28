const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const pool = require('../config/database');  // Importar la conexion de la base de datos
const User = require('../models/userModels');

// Ruta para crear un nuevo usuario
router.post('/', async (req, res) => {

    // Acceder al primer elemento del array
    const { dni, nombre, apellido, fecha_nacimiento, email, usuario, password, confirm_password } = req.body;
    
    // Validación básica
    if (!dni || !nombre || !apellido || !fecha_nacimiento || !email || !usuario || !password || !confirm_password) {
        return res.status(400).json({ error: 'Todos los campos son requeridos.' });
    }

    try {
        const existingUser = await User.findUserByEmailUsername(pool, usuario, email); // Sin destructura

        if (existingUser.length > 0) { // Ahora existingUser debería ser un array
            return res.status(400).json({ error: 'El usuario o email ya están registrados.' });
        }

        if (confirm_password!= password){
            return res.status(400).json({ error: 'Las contraseñas son distintas' });
        }
        // Encriptar la password
        const hashedPassword = await bcrypt.hash(password, 10);  // El valor 10 es el "salt rounds"

        // Insertar el nuevo usuario en la base de datos
        await User.create(pool, dni, nombre, apellido, fecha_nacimiento, email, usuario, hashedPassword);

        // Respuesta de exito
        return res.status(201).json({ message: 'Usuario creado exitosamente' });
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        return res.status(500).json({ error: 'Error en el servidor' });
    }
});

module.exports = router;
