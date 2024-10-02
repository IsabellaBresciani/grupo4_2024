const express = require('express');
const router = express.Router();
const pool = require('../config/database');  // Importar la conexión de la base de datos

// Listar usuarios
  router.get("/", async (req, res) => {
    try {
        const [results] = await pool.query('SELECT * FROM servicioya.user');
        res.json(results);
    } catch (error) {
        return res.status(500).json({ error: 'Error en la consulta' });
    }
});

// Buscar usuario 
router.get("/:nom_usuario", async (req, res) => {
    const { nom_usuario } = req.params;
    
    try {
        const [results] = await pool.query('SELECT u.nombre, u.apellido, u.foto, u.email, u.telefono, u.fecha_nacimiento , l.nombre AS localidad FROM servicioya.user AS u JOIN servicioya.localidadxpersona AS lp ON u.id = lp.idPersona JOIN servicioya.localidad AS l ON lp.idLocalidad = l.idLocalidad WHERE u.usuario = ?', [nom_usuario]);
        
        if (results.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        
        res.json(results[0]);
    } catch (error) {
        return res.status(500).json({ error: 'Error en la consulta' });
    }
});



// Actualizar un usuario basado en el campo usuario (email o username)
router.put('/:usuario', async (req, res) => {
    const { usuario } = req.params;
    const { dni, nombre, apellido, foto, fecha_nacimiento, email, password, telefono } = req.body;
  
    // Crear una lista de campos a actualizar dinámicamente
    const fields = [];
    const values = [];
  
    if (dni !== undefined) {
      fields.push('dni = ?');
      values.push(dni);
    }
    if (foto !== undefined) {
      fields.push('foto = ?');
      values.push(foto);
    }
    if (nombre !== undefined) {
      fields.push('nombre = ?');
      values.push(nombre);
    }
    if (apellido !== undefined) {
      fields.push('apellido = ?');
      values.push(apellido);
    }
    if (fecha_nacimiento !== undefined) {
      fields.push('fecha_nacimiento = ?');
      values.push(fecha_nacimiento);
    }
    if (email !== undefined) {
      fields.push('email = ?');
      values.push(email);
    }
    if (password !== undefined) {
      fields.push('password = ?');
      values.push(password);
    }
    if (telefono !== undefined) {
      fields.push('telefono = ?');
      values.push(telefono);
    }
  
    // Verificar si se ha proporcionado al menos un campo para actualizar
    if (fields.length === 0) {
      return res.status(400).json({ error: 'No se ha proporcionado ningún campo para actualizar.' });
    }
  
    // Añadir el usuario al final de los valores para la condición WHERE
    values.push(usuario);
  
    // Construir la consulta SQL dinámica usando template literals correctamente
    const sql = `UPDATE user SET ${fields.join(', ')} WHERE usuario = ?`;
  
    try {
      // Ejecutar la consulta
      const [result] = await pool.query(sql, values);
  
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Usuario no encontrado.' });
      }
      res.json({ message: 'Información del usuario actualizada exitosamente.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error al actualizar la información del usuario.', error });
    }
  });


// Eliminar un usuario exisitente 
router.delete('/:usuario', async (req, res) => {
    const { usuario } = req.params;

    try {
        const [result] = await pool.query('DELETE FROM servicioya.user WHERE usuario = ?', [usuario]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.status(200).json("Usuario eliminado correctamente");
    } catch (error) {
        return res.status(500).json({ error: 'Error al eliminar el Usuario' });
    }
});

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

module.exports = router;