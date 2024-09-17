const express = require('express');
const app = express();
const database = require('./database');
const cors = require('cors');
const loginRoutes = require('./login');
const serviceRoutes = require('./service');
const signupRoutes = require('./signup');  // Nueva ruta para el registro

// Defino los puertos
const PORT = process.env.PORT || 4444;

// 3. Middleware para parsear JSON
app.use(express.json());
app.use(cors());

app.get('/check', (req, res) => {
    res.json({ message: 'Acceso al backend exitoso' });
  });

// Conectar las rutas importadas

app.use(loginRoutes); // Usar las rutas de login
app.use(serviceRoutes); // Usar las rutas de servicios
app.use(signupRoutes);  // Ruta para registro (signup)


// Iniciar el servidor con app.listen(), no router.listen()
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Ruta principal de prueba
app.get('/prueba', (req, res) => {
    res.send('Bienvenido a la API');
});
