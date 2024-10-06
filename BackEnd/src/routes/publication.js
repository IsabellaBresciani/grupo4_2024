const express = require('express');
const router = express.Router();
const Publication = require('../models/publicationModels');
const Persona = require('../models/userModels');

//crear publicacion.
router.post('/', async (req, res) => {
  const {fecha, descripcion, titulo, imagen, idUser} = req.body;
  try {
     // Verifica si todos los datos necesarios están presentes
    if (!titulo || !descripcion || !idUser) {
      return res.status(400).json({ error: 'Faltan datos en la solicitud.' });
    }

    const newPubli = await Publication.create({
        fecha,
        descripcion,
        titulo,
        imagen,
        idUser
    });
   
    res.status(201).json({ message: 'Publicacion creada', newPubli });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la publicacion', error });
  }
});

//Ver todas las publicaciones.
router.get('/', async (req,res) => {
    try {
        const publicaciones = await Publication.findAll();
        return res.json(publicaciones);
    } catch (error) {
        console.error('Error al obtener las publicacion:', error);
        return res.status(500).json({ error: 'Error al obtener las publicaciones' });
    }
})
  
// Actualizar una publicacion
router.put('/:publication_id', async (req, res) => {
    const {publication_id } = req.params;
    const { fecha, descripcion, titulo  } = req.body;
  
    if ( !fecha || !descripcion || !titulo ){
      return res.status(400).json({ error: 'Todos los campos son obligatorios.'})
    }
    try {
        const publication = await Publication.findByPk(publication_id);
        if (!publication) return res.status(404).json({message: 'Publicacion no encontrada'});
        
        await publication.update({
            fecha, 
            descripcion, 
            titulo
        });

        res.json({message: 'Publicacion actualizada'});
    } catch (error) {
        res.status(500).json({message: 'Error al actualizar la publicacion.', error});
    }
  });
  
// Eliminar una publicacion
router.delete('/:publication_id', async (req, res) => {
    const { publication_id } = req.params;
    try {
        const publication = await Publication.findByPk(publication_id);

        if (!publication) return res.status(404).json({ message: 'Publicacion no encontrada' });

        await publication.destroy()

        res.json({message: 'Publicacion eliminada correctamente'})
    } catch (error) {
        res.status(500).json({message: 'Error al eliminar la publicacion.', error});
    }
});

//Buscar una publicacion por su ID
router.get('/:publication_id', async (req,res) =>{
    const {publication_id} = req.params;
    try {
      const publication = await Publication.findByPk(publication_id)
      if (!publication) return res.status(404).json({ message: 'Publicacion no encontrada' });
      return res.json(publication);
    } catch (error){
      return res.status(500).json({ error: 'Error en el servidor' })
    }
  })

/* Obtener las publicaciones asociadas a un usuario
router.get('/:idPersona/posts', async (req, res) => {
    const { idPersona } = req.params;
    try {
      
        const persona = await Persona.findByPk(idPersona,{
            include:{
                model: Publication,
                as: 'publication',
            }
        });

        if (!persona) {
            return res.status(404).json({ error: 'Persona no encontrada' });
        };
      
        res.json(persona.services);  // Retorna los servicios asociados
    } catch (error) {
      console.error('Error al obtener las publicaciones:', error);
      return res.status(500).json({ error: 'Error al obtener las publicaciones' });
    }
})*/

//Ver todas las publicaciones de una persona.
router.get('/:usuario/posts', async (req, res) => {
    const { usuario } = req.params;
  
    try {
      const persona = await Persona.findOne({
        where: { usuario: usuario },
        include: {
          model: Publication,
          as: 'publications'
        }
      });
  
      if (!persona) {
        return res.status(404).json({ error: 'Persona no encontrada' });
      }
  
      // Retorna las publicaciones asociadas a la persona
      res.json(persona.publications); 
    } catch (error) {
      console.error('Error al obtener las publicaciones:', error);
      return res.status(500).json({ error: 'Error al obtener las publicaciones' });
    }
  });
  

module.exports = router;  