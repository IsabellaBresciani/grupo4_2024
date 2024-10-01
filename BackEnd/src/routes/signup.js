const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Persona = require('../models/userModels'); // Importar el modelo Persona
const { Op } = require('sequelize'); //contiene diferentes operadores que puedes utilizar en tus consultas de Sequelize.


// Ruta para crear un nuevo usuario
router.post('/', async (req, res) => {
    // Acceder a los campos del cuerpo de la solicitud
    const { dni, nombre, apellido, fecha_nacimiento, email, usuario, password, foto } = req.body;

    // Validación básica
    if (!dni || !nombre || !apellido || !fecha_nacimiento || !email || !usuario || !password || !foto) {
        return res.status(400).json({ error: 'Todos los campos son requeridos.' });
    }

    try {
        // Verificar si el usuario o el email ya existen
        const existingUser = await Persona.findOne({
            where: {
                [Op.or]: [
                    { usuario: usuario },
                    { email: email }
                ]
            }
        });

        if (existingUser) {
            return res.status(400).json({ error: 'El usuario o email ya están registrados.' });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10); // El valor 10 es el "salt rounds"

        // Insertar el nuevo usuario en la base de datos
        const newUser = await Persona.create({
            dni,
            nombre,
            apellido,
            fecha_nacimiento: fecha_nacimiento,
            email,
            usuario: usuario,
            password: hashedPassword, // Ajusta según tu modelo
            foto
        });

        // Respuesta de éxito
        return res.status(201).json({ message: 'Usuario creado exitosamente', user: newUser });
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        return res.status(500).json({ error: 'Error en el servidor' });
    }
});


module.exports = router;
