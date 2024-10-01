const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Persona = require('../models/userModels');  // Importar la conexión de la base de datos

// Ruta para el login
router.post('/', async (req, res) => {
    const { usuario, password } = req.body;
    
    if (!usuario || !password) {
        return res.status(400).json({ error: 'Usuario y contraseña son requeridos.' });
    }

    try {
        const user = await Persona.findOne({ where: { usuario } });
        
        if (!user) {
            return res.status(401).json({ error: 'Usuario no encontrado.' });
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Contraseña incorrecta.' });
        }
        
        const token = jwt.sign({ id: user.id, usuario: user.usuario }, 'mysecretkey', { expiresIn: '1h' });
        
        return res.json({ message: 'Login exitoso', token });
    } catch (error) {
        console.error('Error al realizar el login:', error);
        return res.status(500).json({ error: 'Error en el servidor' });
    }
});

module.exports=router;
