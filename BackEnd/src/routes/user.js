const express = require('express');
const router = express.Router();
const Persona = require('../models/userModels'); // Importar el modelo Persona

// Actualizar un usuario basado en el campo usuario
router.put('/:usuario', async (req, res) => {
  const { usuario } = req.params; // Obtiene el nombre de usuario de los parámetros de la solicitud
  const { dni, nombre, apellido, fecha_nacimiento, password, foto } = req.body;

  // Verificar si se han proporcionado campos para actualizar
  if (!dni && !nombre && !apellido && !fecha_nacimiento && !password && !foto) {
      return res.status(400).json({ error: 'No se ha proporcionado ningún campo para actualizar.' });
  }

  try {
      // Buscar al usuario
      const user = await Persona.findOne({
          where: {
              usuario: usuario // Busca el usuario en la base de datos
          }
      });

      // Verificar si el usuario existe
      if (!user) return res.status(404).json({ message: 'Usuario no encontrado.' });
      
      // Actualizar el usuario
      await user.update({
        dni, 
        nombre, 
        apellido, 
        fecha_nacimiento, 
        password, 
        foto
      });

      res.json({ message: 'Información del usuario actualizada exitosamente.' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar la información del usuario.', error });
  }
});

// Obtener todas las personas
router.get('/', async (req, res) => {
  try {
    const personas = await Persona.findAll(); // Obtiene todas las personas
    return res.json(personas); // Devuelve la lista de personas
  } catch (error) {
    console.error('Error al obtener las personas:', error);
    return res.status(500).json({ error: 'Error al obtener las personas' });
  }
});

// Buscar usuario 
router.get("/:nom_usuario", async (req, res) => {
  const { nom_usuario } = req.params;
  
  try {
      const user = await Persona.findOne({
        where: {
          usuario: nom_usuario
        }
      });
      
      if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
      
      res.json(user);
  } catch (error) {
      return res.status(500).json({ error: 'Error en la consulta' });
  }
});

// Eliminar un usuario exisitente 
router.delete('/:nomusuario', async (req, res) => {
  const { nomUsuario } = req.params;

  try {
      const user = await Persona.findOne({
        where:{
          usuario: nomUsuario
        }
      });

      if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

      await user.destroy()

      res.status(200).json("Usuario eliminado correctamente");
  } catch (error) {
      return res.status(500).json({ error: 'Error al eliminar el Usuario' });
  }
});

/*

// Obtener los servicios asociados a un usuario
router.get('/:idPersona/servicios', async (req, res) => {
  const { idPersona } = req.params;

  try {
    // Consulta para obtener los servicios asociados a la persona con la descripción del servicio
    const [results] = await pool.query(`
        SELECT DISTINCT sa.idServicio, s.description, sa.estado, s.imagen
        FROM ServicioAsociado sa
        JOIN service s ON sa.idServicio = s.idservice
        WHERE sa.idPersona = ?
    `, [idPersona]);

    // Verificar si se encontraron resultados
    if (results.length === 0) {
        return res.status(404).json({ error: 'No se encontraron servicios asociados para esta persona' });
    }

    // Enviar los resultados como respuesta
    res.json(results);

  } catch (error) {
    console.error('Error en la consulta:', error); // Log para ver el error en el servidor
    return res.status(500).json({ error: 'Error al obtener los servicios asociados', details: error.message });
  }
});

// Agregar servicio a un usuario
router.post('/:idPersona/servicios', async (req, res) => {
  const { idPersona } = req.params;
  const { idServicio, estado } = req.body;

  // Validar que el servicio y el estado fueron enviados
  if (!idServicio || !estado) {
      return res.status(400).json({ error: 'ID del servicio y estado son requeridos.' });
  }

  try {
      // Insertar la asociación en la tabla ServicioAsociado
      const [result] = await pool.query(`
          INSERT INTO servicioya.servicioasociado (idPersona, idServicio, estado)
          VALUES (?, ?, ?)
      `, [idPersona, idServicio, estado]);

      // Verificar si la asociación fue exitosa
      if (result.affectedRows === 0) {
          return res.status(500).json({ error: 'No se pudo asociar el servicio al usuario.' });
      }

      // Respuesta exitosa
      res.json({ message: 'Servicio agregado exitosamente.' });

  } catch (error) {
      console.error('Error al agregar el servicio:', error);
      return res.status(500).json({ error: 'Error en el servidor.', details: error.message });
  }
});

// Actualizar el estado de un servicio asociado
router.put('/:idPersona/servicios/:idServicio', async (req, res) => {
  const { idPersona, idServicio } = req.params;
  const { estado } = req.body;

  if (!estado) {
      return res.status(400).json({ error: 'El estado es requerido.' });
  }

  try {
      const [result] = await pool.query(`
          UPDATE ServicioAsociado 
          SET estado = ? 
          WHERE idPersona = ? AND idServicio = ?
      `, [estado, idPersona, idServicio]);

      if (result.affectedRows === 0) {
          return res.status(404).json({ error: 'Servicio asociado no encontrado.' });
      }

      res.json({ message: 'Estado del servicio actualizado correctamente.' });
  } catch (error) {
      console.error('Error al actualizar el estado del servicio:', error);
      return res.status(500).json({ error: 'Error en el servidor' });
  }
});

*/
module.exports = router;