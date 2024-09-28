// authMiddleware.js
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env; // Asegúrate de tener tu clave secreta en el archivo .env

// Middleware de autenticación
const authMiddleware = (req, res, next) => {
  // Obtener el token del encabezado de autorización
  const token = req.headers['authorization']?.split(' ')[1];

  // Verificar si el token está presente
  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  // Verificar y decodificar el token
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }

    // Almacenar la información del usuario en la solicitud para su uso posterior
    req.user = user;
    next(); // Pasar al siguiente middleware o controlador
  });
};
module.exports = authMiddleware;