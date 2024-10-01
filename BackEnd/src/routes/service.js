const express = require('express');
const router = express.Router();
const Service = require('../models/serviceModels'); // Asegúrate de tener un archivo 'database.js' para crear el pool de conexión con MySQL

// Crear un nuevo servicio
router.post("/", async (req, res) => {
    const { description, imagen } = req.body;
    // Validación básica
    if (!description || !imagen ) {
        return res.status(400).json({ error: 'Se requiere una descripción.' });
    }

    try {
        const newService = await Service.create({
            description,
            imagen
        });
        
        res.status(201).json({ message: 'Servicio creado exitosamente', user: newService });

    } catch (error) {
        return res.status(500).json({ error: 'Error al insertar el servicio' });
    }
});

// Obtener todos los servicios
router.get("/", async (req, res) => {
    try {
        const servicios = await Service.findAll();
        return res.json(servicios);
    } catch (error) {
        console.error('Error al obtener las servicios:', error);
        return res.status(500).json({ error: 'Error al obtener las servicios' });
    }
});

// Obtener un servicio por ID
router.get("/:service_id", async (req, res) => {
    const { service_id } = req.params;
    
    try {
        const service = await Service.findByPk(service_id);
        if (!service) return res.status(404).json({ error: 'Servicio no encontrado' });
        res.json(service);
    } catch (error) {
        return res.status(500).json({ error: 'Error en la consulta' });
    }
});

// Eliminar un servicio existente
router.delete('/:service_id', async (req, res) => {
    const { service_id } = req.params;

    try {
        const service = await Service.findByPk(service_id);

        if (!service) return res.status(404).json({ error: 'Servicio no encontrado' });

        await service.destroy()

        res.status(200).json("Servicio eliminado correctamente");
    } catch (error) {
        return res.status(500).json({ error: 'Error al eliminar el servicio' });
    }
});

// Actualizar un servicio existente
router.put('/:service_id', async (req, res) => {
    const { service_id } = req.params;
    const { description, imagen } = req.body;
  
    // Validación básica
    if ( !description  || !imagen ) {
        return res.status(400).json({ error: 'Descripcion e imagen obligatoria' });
    }
    
    try {
        const service = await Service.findByPk(service_id);

        if (!service) return res.status(404).json({ error: 'Servicio no encontrada' });

        // Actualizar la reseña con los datos recibidos
        await service.update({
            description,
            imagen
        });

        // Responder con éxito
        return res.status(200).json({ message: 'Servicio actualizada exitosamente', service });
    } catch (error) {
        return res.status(500).json({ error: 'Error al actualizar el servicio' });
    }
});

module.exports = router;
