const express = require('express');
const Localidad = require('../models/localidadModels'); // Asegúrate de que el modelo esté en esta ruta
const router = express.Router();
const pool = require('../config/database'); // Importar la conexión de la base de datos

// Listar todas las localidades
router.get("/", async (req, res) => {
    try {
        const results = await Localidad.findAll(pool);
        res.status(200).json(results);
    } catch (error) {
        return res.status(500).json({ error: 'Error en la consulta' });
    }
});

// Buscar localidad por ID
router.get("/id/:idLocalidad", async (req, res) => {
    const { idLocalidad } = req.params;

    try {
        const result = await Localidad.findById(pool, idLocalidad);
        if (!result) {
            return res.status(404).json({ error: 'Localidad no encontrada' });
        }
        res.status(200).json(result);
    } catch (error) {
        return res.status(500).json({ error: 'Error en la consulta' });
    }
});

// Crear una nueva localidad
router.post("/", async (req, res) => {
    const { codPostal, nombre, idProvincia } = req.body;

    try {
        const result = await Localidad.create(pool, { codPostal, nombre, idProvincia });
        res.status(201).json({ message: 'Localidad creada exitosamente', id: result.insertId });
    } catch (error) {
        return res.status(500).json({ error: 'Error al crear la localidad' });
    }
});

// Actualizar una localidad existente
router.put("/:idLocalidad", async (req, res) => {
    const { idLocalidad } = req.params;
    const { codPostal, nombre } = req.body;

    try {
        const result = await Localidad.update(pool, { idLocalidad, codPostal, nombre });
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Localidad no encontrada' });
        }
        res.status(200).json({ message: 'Localidad actualizada exitosamente' });
    } catch (error) {
        return res.status(500).json({ error: 'Error al actualizar la localidad' });
    }
});

// Eliminar una localidad
router.delete("/:idLocalidad", async (req, res) => {
    const { idLocalidad } = req.params;

    try {
        const result = await Localidad.delete(pool, idLocalidad);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Localidad no encontrada' });
        }
        res.status(200).json({ message: 'Localidad eliminada correctamente' });
    } catch (error) {
        return res.status(500).json({ error: 'Error al eliminar la localidad' });
    }
});

module.exports = router;