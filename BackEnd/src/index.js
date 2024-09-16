const express = require('express');
const app = express();
const database = require('./database');
const cors = require('cors');
const loginRoutes = require('./login');
const serviceRoutes = require('./service');

// Defino los puertos
const PORT = process.env.PORT || 3000;

// 3. Middleware para parsear JSON
app.use(express.json());
app.use(cors());

// Conectar las rutas importadas

app.use(loginRoutes); // Usar las rutas de login
app.use(serviceRoutes); // Usar las rutas de servicios

// Iniciar el servidor con app.listen(), no router.listen()
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Ruta principal de prueba
app.get('/prueba', (req, res) => {
    res.send('Bienvenido a la API');
});
