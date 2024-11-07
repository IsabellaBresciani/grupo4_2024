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
        //if (!result) {
        //    return res.status(404).json({ error: 'Localidad no encontrada' });
        //}
        res.status(200).json(result);
    } catch (error) {
        return res.status(500).json(error);
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


router.post("/:idPersona/:idLocalidad", async (req, res) => {
    const { idPersona, idLocalidad } = req.params;
    //const { idPersona } = req.body;

    try {
        const result = await Localidad.modifyLocalidadXUser(pool, idLocalidad, idPersona);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'error', error });
        }
        res.status(200).json({ message: 'Localidad actualizada para el usuario.' });
    } catch (error) {
        return res.status(500).json({ error: 'Error al actualizar la localidad del usuario.' });
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

router.get("/usuario/:nombreUsuario", async (req, res) => {
    const { nombreUsuario } = req.params;

    try {
        // Buscar el idPersona basado en el nombre de usuario
        const queryUserId = `SELECT id FROM user WHERE usuario = ?`;
        const [userRows] = await pool.execute(queryUserId, [nombreUsuario]);

        if (userRows.length === 0) {
            return res.status(404).json({ error: 'No se encontró un usuario con ese nombre' });
        }

        const idPersona = userRows[0].id;

        // Ahora podemos buscar las localidades usando el idPersona
        const localidades = await Localidad.findByUserId(pool, idPersona);
        if (localidades.length === 0) {
            return res.status(404).json({ error: 'No se encontraron localidades para este usuario' });
        }

        res.status(200).json(localidades);
    } catch (error) {
        console.error(error); // Para ayudarte en la depuración
        return res.status(500).json({ error: 'Error en la consulta de localidades por nombre de usuario' });
    }
});

//Asociar localidad a un usuario
router.post("/asociar", async (req, res) => {
    const { idLocalidad, idPersona } = req.body;

    try {
        const newAssociationId = await Localidad.associateLocalidadToUser(pool, idLocalidad, idPersona);
        res.status(201).json({ message: 'Localidad asociada exitosamente al usuario', id: newAssociationId });
    } catch (error) {
        console.error("Error al asociar localidad al usuario:", error);
        return res.status(500).json({ error: 'Error al asociar la localidad al usuario', details: error.message });
    }
});

module.exports = router;