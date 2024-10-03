const express = require('express');
const router = express.Router();
const pool = require('../config/database'); // Conexión a la base de datos
/*
// Ruta de búsqueda
router.get('/search', async (req, res) => {
    const { localidad, servicio, precioMax } = req.query;

    try {
        const [result] = await db.query(`
            SELECT s.idServicio, s.descripcion AS servicio, p.nombre AS profesional, l.nombre AS localidad, r.precio
            FROM Servicio s
            JOIN ServicioxPersona sp ON s.idServicio = sp.idServicio
            JOIN Persona p ON sp.idPersona = p.idPersona
            JOIN personaXlocalidad pl ON p.idPersona = pl.idPersona
            JOIN Localidad l ON pl.idLocalidad = l.idLocalidad
            LEFT JOIN Resenia r ON r.idAutor = p.idPersona
            WHERE (l.nombre = ? OR ? IS NULL)  -- Filtro por localidad
            AND (s.descripcion = ? OR ? IS NULL)  -- Filtro por servicio
            AND (r.precio <= ? OR ? IS NULL);  -- Filtro por precio máximo
        `, [localidad, localidad, servicio, servicio, precioMax, precioMax]);

        res.json(result); // Devuelve los resultados al cliente
    } catch (error) {
        console.error('Error en la búsqueda:', error);
        res.status(500).json({ error: 'Error al realizar la búsqueda' });
    }
});
*/
module.exports = router;
