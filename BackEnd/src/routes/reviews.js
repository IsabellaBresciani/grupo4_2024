const express = require('express');
const Resenia = require('../models/reviewModels');
const pool = require('../config/database'); // Conexión a la base de datos

const router = express.Router();

router.post('/review', async (req, res) => {
  const { precio, atencion, calidad, tiempo, comentario, idAutor } = req.body;
  try {
    const result = await Resenia.create(pool, { precio, atencion, calidad, tiempo, comentario, idAutor });
    res.status(201).json({ message: 'Reseña creada', result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la reseña', error });
  }
});

//  Buscar una reseña por su ID

// Ruta para obtener una reseña específica por su idResenia.

router.get('/review/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const resena = await Resenia.findById(pool, id);
      if (!resena) return res.status(404).json({ message: 'Reseña no encontrada' });
      res.json(resena);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al buscar la reseña', error });
    }
  });


// Actualizar una reseña

// Ruta para permitir a los usuarios actualizar solo el comentario de una reseña.

  router.put('/review/:id', async (req, res) => {
    const { id } = req.params;
    const { comentario } = req.body;
    try {
      const result = await Resenia.update(pool, { idResenia: id, comentario });
      if (result.affectedRows === 0) return res.status(404).json({ message: 'Reseña no encontrada' });
      res.json({ message: 'Reseña actualizada' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar la reseña', error });
    }
  });
  
// Eliminar una reseña

// Ruta para eliminar una reseña por su idResenia.

router.delete('/review/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const result = await Resenia.delete(pool, id);
      if (result.affectedRows === 0) return res.status(404).json({ message: 'Reseña no encontrada' });
      res.json({ message: 'Reseña eliminada' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al eliminar la reseña', error });
    }
  });
  