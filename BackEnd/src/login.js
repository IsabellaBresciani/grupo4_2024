const express = require('express');
const router = express.Router(); // Usa el Router de Express
const bcrypt = require('bcryptjs');



// Ruta para el login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // Buscar usuario en la "base de datos"
    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    // Comparar la contraseña proporcionada con la almacenada (encriptada)
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Si las credenciales son correctas, generar un token JWT
    const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });

    // Devolver el token
    return res.json({ token });
});

module.exports = router; // Exportar el router