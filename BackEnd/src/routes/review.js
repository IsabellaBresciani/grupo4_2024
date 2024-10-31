const express = require('express'); 
const Review = require('../models/reviewModels');
const pool = require('../config/database');
const router = express.Router();

// Crear Review.
router.post('/', async (req, res) => {
  const { precio, atencion, calidad, tiempo, comentario, idAutor, servicioasociado_id } = req.body;

  // Validar que los campos obligatorios estén presentes
  if (!precio || !atencion || !calidad || !tiempo || !comentario || !idAutor || !servicioasociado_id) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  // Verificar si idAutor existe en la tabla user
  const [user] = await pool.query('SELECT * FROM user WHERE id = ?', [idAutor]);
  if (user.length === 0) {
    return res.status(400).json({ error: 'El idAutor proporcionado no existe en la tabla de usuarios.' });
  }

  try {
    const result = await Review.create(pool, { precio, atencion, calidad, tiempo, comentario, idAutor, servicioasociado_id });
    res.status(201).json({ message: 'Reseña creada', result });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la reseña', error });
  }
});

// Ver todas las reseñas.
router.get('/', async (req, res) => {
  try {
    const [reviews] = await Review.find(pool); 
    if (!reviews) return res.status(404).json({ message: 'No hay reseñas.' });
    res.json(reviews);
  } catch (error) {
    return res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Buscar una reseña por su ID
router.get('/:review_id', async (req, res) => {
  const { review_id } = req.params;

  try {
    const review = await Review.findById(pool, review_id);
    if (!review) return res.status(404).json({ message: 'Reseña no encontrada' });
    res.json(review);
  } catch (error) {
    return res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Ver todas las reseñas de una persona.
router.get('/usuario/:usuario', async (req, res) => {
  const { usuario } = req.params; // Corregido para capturar el parámetro

  try {
    const [reviews] = await Review.findByUser(pool, usuario); 
    if (!reviews) return res.status(404).json({ message: 'No hay reseñas asociadas al usuario.' });
    res.json(reviews);
  } catch (error) {
    return res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Actualizar una reseña
router.put('/:review_id', async (req, res) => {
  const { review_id } = req.params; 
  const { precio, atencion, calidad, tiempo, comentario } = req.body; 

  // Validar que los campos obligatorios estén presentes
  if (!precio || !atencion || !calidad || !tiempo || !comentario) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  try {
    const review = await Review.update(pool, { idResenia: review_id, precio, atencion, calidad, tiempo, comentario }); // Usar idResenia para la búsqueda
    if (review.affectedRows === 0) {
      return res.status(404).json({ message: 'Reseña no encontrada' });
    }
    res.json({ message: 'Reseña actualizada' });
  } catch (error) {
    console.error('Error al actualizar la reseña:', error); 
    res.status(500).json({ message: 'Error al actualizar la reseña.', error });
  }
});


// Eliminar una reseña
router.delete('/:review_id', async (req, res) => {
  const { review_id } = req.params;
  try {
    const review = await Review.delete(pool, review_id);
    if (!review) return res.status(404).json({ message: 'Reseña no encontrada' });
    res.json({ message: 'Reseña eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la reseña.', error });
  }
});

// Ver todas las reseñas de una asociación específica
router.get('/:idAsociacion/asociacion', async (req, res) => {
  const { idAsociacion } = req.params;

  try {
    const reviews = await Review.findByAssociation(pool, idAsociacion);
    if (reviews.length === 0) return res.status(404).json({ message: 'No hay reseñas para esta asociación.' });
    res.json(reviews);
  } catch (error) {
    console.error('Error al obtener reseñas de la asociación:', error);
    res.status(500).json({ error: 'Error al obtener reseñas de la asociación' });
  }
});

// Obtener la persona de una asociación específica
router.get('/:idAsociacion/idasociacion', async (req, res) => {
  const { idAsociacion } = req.params;

  try {
    // Suponiendo que tienes una función `findUserByAssociation` en el modelo Review para obtener el usuario asociado
    const user = await Review.findUserByAssociation(pool, idAsociacion);
    if (!user) return res.status(404).json({ message: 'No se encontró la persona asociada a esta asociación.' });
    res.json(user);
  } catch (error) {
    console.error('Error al obtener la persona de la asociación:', error);
    res.status(500).json({ error: 'Error al obtener la persona de la asociación' });
  }
});

module.exports = router;