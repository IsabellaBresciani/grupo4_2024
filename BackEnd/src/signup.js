const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const pool = require('./database');  // Importar la conexión de la base de datos

// Ruta para crear un nuevo usuario
router.post('/signup', async (req, res) => {
    const { dni, nombre, apellido, fecha_nacimiento, email, usuario, password } = req.body;

    // Validación básica para todos los campos requeridos
    if (!dni || !nombre || !apellido || !fecha_nacimiento || !email || !usuario || !password) {
        return res.status(400).json({ error: 'Todos los campos son requeridos.' });
    }

    try {
        // Verificar si el usuario o el email ya existen
        const [existingUser] = await pool.query('SELECT * FROM servicioya.user WHERE usuario = ? OR email = ?', [usuario, email]);

        if (existingUser.length > 0) {
            return res.status(400).json({ error: 'El usuario o email ya están registrados.' });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);  // El valor 10 es el "salt rounds"

        // Insertar el nuevo usuario en la base de datos
        await pool.query(
            'INSERT INTO servicioya.user (dni, nombre, apellido, fecha_nacimiento, email, usuario, password) VALUES (?, ?, ?, ?, ?, ?, ?)', 
            [dni, nombre, apellido, fecha_nacimiento, email, usuario, hashedPassword]
        );

        // Respuesta de éxito
        return res.status(201).json({ message: 'Usuario creado exitosamente' });
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        return res.status(500).json({ error: 'Error en el servidor' });
    }
});

module.exports = router;
