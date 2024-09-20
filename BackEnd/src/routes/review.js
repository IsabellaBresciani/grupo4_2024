const express = require('express');
const Review = require('../models/reviewModels');
const pool = require('../config/database');
const router = express.Router();

//crear Review.
router.post('/', async (req, res) => {
  const { precio, atencion, calidad, tiempo, comentario, idAutor } = req.body;
  try {
    const result = await Review.create( pool, { precio, atencion, calidad, tiempo, comentario, idAutor });
    res.status(201).json({ message: 'Reseña creada', result });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la reseña', error });
  }
});

//Ver todas las reseñas.
router.get('/', async (req,res) => {
  try {
    const [reviews] = await Review.find(pool); 
    if (!reviews) return res.status(404).json({ message: 'No hay reseñas.'});
    res.json(reviews);
  } catch (error){
    return res.status(500).json({error: 'Error en el servidor'})
  }
})

//Buscar una reseña por su ID
router.get('/:review_id', async (req,res) =>{
  const {review_id} = req.params;

  try {
    const review = await Review.findById(pool, review_id);
    if (!review) return res.status(404).json({ message: 'Reseña no encontrada' });
    res.json(review);
  } catch (error){
    return res.status(500).json({ error: 'Error en el servidor' })
  }
})

//Ver todas las reseñas de una persona.
router.get('/:usuario', async (req,res) => {
  try {
    const [reviews] = await Review.findByUser(pool, usuario); 
    if (!reviews) return res.status(404).json({ message: 'No hay reseñas asociadas al usuario.'});
    res.json(reviews);
  } catch (error){
    return res.status(500).json({error: 'Error en el servidor'})
  }
})

// Actualizar una reseña
router.put('/:review_id', async (req, res) => {
  const {review_id } = req.params;
  const { precio, atencion, calidad, tiempo, comentario, idautor } = req.body[0];

  if (!precio || !atencion || !calidad || !tiempo || !comentario || !idautor ){
    return res.status(400).json({ error: 'Todos los campos son obligatorios.'})
  }
  try {
    const review = Review.update(pool, {review_id , comentario});
    if (review.affectedRows === 0) return res.status(404).json({message: 'Reseña no encontrada'});
    res.json({message: 'Reseña actualizada'});
    } catch (error) {
      res.status(500).json({message: 'Error al actualizar la reseña.', error});
  }
});

// Eliminar una reseña
router.delete('/:review_id', async (req, res) => {
  const { review_id } = req.params;
  try {
    const review = await Review.delete(pool, review_id);
    if (!review) return res.status(404).json({ message: 'Reseña no encontrada' });
    res.json({message: 'Reseña eliminada correctamente'})
    } catch (error) {
      res.status(500).json({message: 'Error al eliminar la reseña.', error});
  }
});

module.exports = router;  