const express = require('express');
const router = express.Router();
const pool = require('../config/database'); // Asegúrate de tener un archivo 'database.js' para crear el pool de conexión con MySQL

// Obtener todos los servicios
router.get("/", async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM servicioya.service');
        res.json(results);
    } catch (error) {
        return res.status(500).json({ error: 'Error en la consulta' });
    }
});

// Crear un nuevo servicio
router.post("/", async (req, res) => {
    const { description } = req.body;
    // Validación básica
    if (!description) {
        return res.status(400).json({ error: 'Se requiere una descripción.' });
    }

    try {
        const [result] = await pool.query('INSERT INTO servicioya.service (description) VALUES (?)', [description]);
        res.status(201).json({ message: 'Servicio creado exitosamente', serviceId: result.insertId });
    } catch (error) {
        return res.status(500).json({ error: 'Error al insertar el servicio' });
    }
});
// Obtener un servicio por ID
router.get("/:service_id", async (req, res) => {
    const { service_id } = req.params;
    
    try {
        const [results] = await pool.query('SELECT * FROM servicioya.service WHERE idservice = ?', [service_id]);
        
        if (results.length === 0) {
            return res.status(404).json({ error: 'Servicio no encontrado' });
        }
        
        res.json(results[0]);
    } catch (error) {
        return res.status(500).json({ error: 'Error en la consulta' });
    }
});


// Actualizar un servicio existente
router.put('/:service_id', async (req, res) => {
    const { service_id } = req.params;
    const { description } = req.body;
  
    // Validación básica
    if ( !description ) {
        return res.status(400).json({ error: 'Descripcion obligatoria' });
    }
    
    try {
        const [result] = await pool.query('UPDATE servicioya.service SET description = ? WHERE idservice = ?', [description, service_id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Servicio no encontrado' });
        }
        res.json({ message: 'Servicio actualizado correctamente' });
    } catch (error) {
        return res.status(500).json({ error: 'Error al actualizar el servicio' });
    }
});

// Eliminar un servicio existente
router.delete('/:service_id', async (req, res) => {
    const { service_id } = req.params;

    try {
        const [result] = await pool.query('DELETE FROM servicioya.service WHERE idservice = ?', [service_id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Servicio no encontrado' });
        }

        res.status(200).json("Servicio eliminado correctamente");
    } catch (error) {
        return res.status(500).json({ error: 'Error al eliminar el servicio' });
    }
});

module.exports = router;
