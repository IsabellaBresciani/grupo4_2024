const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const routes = require("../src/routes");
const authMiddleware = require('./middlewares/authMiddleware');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

// Middleware
app.use(express.json());  // Parsea el cuerpo de la solicutud a JSON
app.use(cookieParser());  // Parsear cookies
app.use(cors());

// Rutas
//app.use(errorHandler);   // Rutas de autenticacion
//app.use(authMiddleware);  // Rutas de usuario

app.use('/api', routes); //Establece una ruta base /api para todas las rutas definidas en el archivo importado routes

// Iniciar servidor
const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

app.get('/check', (req, res) => {
    res.json({ message: 'Acceso al backend exitoso' });
});