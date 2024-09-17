const express = require('express');
const router = express.Router();
const pool = require('../config/database'); // Asegúrate de tener un archivo 'database.js' para crear el pool de conexión con MySQL

// Obtener todos los servicios
router.get("/service", async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM servicioya.service');
        res.json(results);
    } catch (error) {
        return res.status(500).json({ error: 'Error en la consulta' });
    }
});

// Crear un nuevo servicio
router.post("/service", async (req, res) => {
    const { descripcion } = req.body;

    // Validación básica
    if (!descripcion) {
        return res.status(400).json({ error: 'Se requiere una descripción.' });
    }

    try {
        const [result] = await pool.query('INSERT INTO servicioya.service (description) VALUES (?)', [descripcion]);
        res.status(201).json({ message: 'Servicio creado exitosamente', serviceId: result.insertId });
    } catch (error) {
        return res.status(500).json({ error: 'Error al insertar el servicio' });
    }
});

// Obtener un servicio por ID
router.get("/service/:service_id", async (req, res) => {
    const { service_id } = req.params;

    try {
        const [results] = await pool.query('SELECT * FROM servicioya.service WHERE id = ?', [service_id]);
        if (results.length === 0) {
            return res.status(404).json({ error: 'Servicio no encontrado' });
        }
        res.json(results[0]);
    } catch (error) {
        return res.status(500).json({ error: 'Error en la consulta' });
    }
});

// Actualizar un servicio existente
router.put('/service/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;

    // Validación básica
    if (!name || !description || !price) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    try {
        const [result] = await pool.query('UPDATE servicioya.service SET name = ?, description = ?, price = ? WHERE id = ?', [name, description, price, id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Servicio no encontrado' });
        }
        
        res.json({ message: 'Servicio actualizado correctamente' });
    } catch (error) {
        return res.status(500).json({ error: 'Error al actualizar el servicio' });
    }
});

// Eliminar un servicio existente
router.delete('/service/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query('DELETE FROM servicioya.service WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Servicio no encontrado' });
        }

        res.status(204).send(); // No content
    } catch (error) {
        return res.status(500).json({ error: 'Error al eliminar el servicio' });
    }
});

module.exports = router;
