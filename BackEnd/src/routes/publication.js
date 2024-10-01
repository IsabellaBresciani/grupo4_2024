const express = require('express');
const Review = require('../models/reviewModels');
const pool = require('../config/database');
const Publication = require('../models/publicationModels');
const router = express.Router();

//crear publicacion.
router.post('/', async (req, res) => {
  const {fecha, descripcion, titulo, imagen, idUser} = req.body;
  try {

     // Verifica si todos los datos necesarios están presentes
     if (!titulo || !descripcion || !idUser) {
      return res.status(400).json({ error: 'Faltan datos en la solicitud.' });
  }

    const result = await Publication.create( pool, {fecha, descripcion, titulo, imagen, idUser });
    res.status(201).json({ message: 'Publicacion creada', result });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la publicacion', error });
  }
});


// Obtener las publicaciones asociadas a un usuario
router.get('/:idPersona/posts', async (req, res) => {
    const { idPersona } = req.params;
    try {
      const results = await Publication.findByUserId( pool, idPersona);
      if (results.length === 0) {
        return res.status(404).json({ error: 'No se encontraron publicaciones asociadas para esta persona' });
      }
      res.status(200).json(results);
    } catch (error) {
      console.error('Error al obtener las publicaciones:', error);
      return res.status(500).json({ error: 'Error al obtener las publicaciones' });
    }
  })

//Ver todas las publicaciones.
router.get('/', async (req,res) => {
  try {
    const [publications] = await Review.find(pool); 
    if (!publications) return res.status(404).json({ message: 'No hay publicaciones.'});
    res.json(publications);
  } catch (error){
    return res.status(500).json({error: 'Error en el servidor'})
  }
})

//Buscar una publicacion por su ID
router.get('/:publication_id', async (req,res) =>{
  const {publication_id} = req.params;
  try {
    const publication = await Publication.findById(pool, review_id);
    if (!publication) return res.status(404).json({ message: 'Publicacion no encontrada' });
    res.json(publication);
  } catch (error){
    return res.status(500).json({ error: 'Error en el servidor' })
  }
})

//Ver todas las publicaciones de una persona.
router.get('/:usuario', async (req,res) => {
  try {
    const [publications] = await Publication.findByUser(pool, usuario); 
    if (!publications) return res.status(404).json({ message: 'No hay publicaciones asociadas al usuario.'});
    res.json(publications);
  } catch (error){
    return res.status(500).json({error: 'Error en el servidor'})
  }
})

// Actualizar una publicacion
router.put('/:publication_id', async (req, res) => {
  const {publication_id } = req.params;
  const { idPublicacion, fecha, descripcion, titulo  } = req.body[0];

  if ( !idPublicacion || !fecha || !descripcion || !titulo  ){
    return res.status(400).json({ error: 'Todos los campos son obligatorios.'})
  }
  try {
    const publication = Publication.update(pool, {publication_id , comentario});
    if (publication.affectedRows === 0) return res.status(404).json({message: 'Publicacion no encontrada'});
    res.json({message: 'Publicacion actualizada'});
    } catch (error) {
      res.status(500).json({message: 'Error al actualizar la publicacion.', error});
  }
});

// Eliminar una publicacion
router.delete('/:publication_id', async (req, res) => {
  const { publication_id } = req.params;
  try {
    const publication = await Publication.delete(pool, publication_id);
    if (!review) return res.status(404).json({ message: 'Publicacion no encontrada' });
    res.json({message: 'Publicacion eliminada correctamente'})
    } catch (error) {
      res.status(500).json({message: 'Error al eliminar la publicacion.', error});
  }
});

module.exports = router;  