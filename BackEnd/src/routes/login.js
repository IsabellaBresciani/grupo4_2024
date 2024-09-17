const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');  // Importar la conexión de la base de datos

// Ruta para el login
router.post('/', async (req, res) => {
    const { usuario, password } = req.body;
    // Validación básica
    if (!usuario || !password) {
        return res.status(400).json({ error: 'Usuario y contraseña son requeridos.' });
    }
    try {
        // Buscar el usuario en la base de datos
        const [rows] = await pool.query('SELECT * FROM servicioya.user WHERE usuario = ?', [usuario]);
        if (rows.length === 0) {
            return res.status(401).json({ error: 'Usuario no encontrado.' });
        }
        const user = rows[0];
        // Verificar la contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Contraseña incorrecta.' });
        }
        // Generar el token JWT
        const token = jwt.sign({ id: user.id, usuario: user.usuario }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
        // Enviar el token en una cookie HttpOnly para mayor seguridad
        res.cookie('token', token, {
            httpOnly: true,    // Evita que sea accesible desde JavaScript
            secure: process.env.NODE_ENV === 'production', // Solo en HTTPS si está en producción
            maxAge: 60 * 60 * 1000  // 1 hora de expiración
        });
        // Devolver el token
        return res.json({ message: 'Login exitoso', token });
    } catch (error) {
        console.error('Error al realizar el login:', error);
        return res.status(500).json({ error: 'Error en el servidor' });
    }
});

module.exports=router;
