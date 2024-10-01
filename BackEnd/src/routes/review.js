const express = require('express');
const Review = require('../models/reviewModels');
const Autor = require('../models/userModels')
const router = express.Router();

//crear una reseña.
router.post('/', async (req, res) => {
  // Acceder a los campos del cuerpo de la solicitud
  const { precio, atencion, calidad, tiempo, comentario, idAutor } = req.body;

  // Validación básica
  if (!precio || !atencion || !calidad || !tiempo || !comentario || !idAutor) {
    return res.status(400).json({ error: 'Todos los campos son requeridos.' });
  }

  try {

    // Insertar la nueva reseña en la base de datos
    const newReview = await Review.create({
      precio,
      atencion,
      calidad,
      tiempo,
      comentario,
      idAutor
    });

    // Respuesta de éxito
    return res.status(201).json({ message: 'Review creado exitosamente', user: newReview });
  
  } catch (error) {
      console.error('Error al crear la review:', error);
      return res.status(500).json({ error: 'Error en el servidor' });
  }
});

//-------------------------------------

//Ver todas las reseñas.
router.get('/', async (req, res) => {
  try {
    const review = await Review.findAll(); // Obtiene todas las personas
    return res.json(review); // Devuelve la lista de personas
  } catch (error) {
    console.error('Error al obtener las review:', error);
    return res.status(500).json({ error: 'Error al obtener las review' });
  }
});

//---------------------------------------
//Buscar una reseña por su ID
router.get('/:review_id', async (req,res) =>{
  const {review_id} = req.params;

  try {
    const review = await Review.findByPk(review_id);
    if (!review) return res.status(404).json({ message: 'Reseña no encontrada' });
    res.json(review);
  } catch (error){
    return res.status(500).json({ error: 'Error en el servidor' })
  }
})

//------------------------
// Actualizar una reseña
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { precio, atencion, calidad, tiempo, comentario } = req.body;

  try {
    // Verificar si la reseña existe
    const review = await Review.findByPk(id);

    if (!review) {
      return res.status(404).json({ error: 'Reseña no encontrada' });
    }

    // Actualizar la reseña con los datos recibidos
    await review.update({
      precio,
      atencion,
      calidad,
      tiempo,
      comentario
    });

    // Responder con éxito
    return res.status(200).json({ message: 'Reseña actualizada exitosamente', review });
  } catch (error) {
    console.error('Error al modificar la reseña:', error);
    return res.status(500).json({ error: 'Error en el servidor' });
  }
});

//---------------------------------
// Eliminar una reseña
router.delete('/:review_id', async (req, res) => {
  const { review_id } = req.params;
  try {
    const review = await Review.findByPk(review_id);
    
    if (!review) return res.status(404).json({ message: 'Reseña no encontrada' });
    
    await review.destroy();

    res.json({message: 'Reseña eliminada correctamente'})
    } catch (error) {
      res.status(500).json({message: 'Error al eliminar la reseña.', error});
  }
});


/*

//Ver todas las reseñas de una persona.
router.get('/:usuario', async (req,res) => {
  try {
    const [reviews] = await Review.findByUser(usuario); 
    if (!reviews) return res.status(404).json({ message: 'No hay reseñas asociadas al usuario.'});
    res.json(reviews);
  } catch (error){
    return res.status(500).json({error: 'Error en el servidor'})
  }
})
*/
module.exports = router;  