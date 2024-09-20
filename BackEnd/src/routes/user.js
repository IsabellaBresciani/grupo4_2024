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
        const [results] = await pool.query('SELECT * FROM servicioya.user WHERE usuario = ?', [nom_usuario]);
        
        if (results.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        
        res.json(results[0]);
    } catch (error) {
        return res.status(500).json({ error: 'Error en la consulta' });
    }
});



// Actualizar un usuario
// Actualizar un usuario basado en el campo usuario (email o username)
router.put('/:usuario', async (req, res) => {
    const { usuario } = req.params;
    const { dni, nombre, apellido, fecha_nacimiento, email, password } = req.body;
  
    // Crear una lista de campos a actualizar dinámicamente
    const fields = [];
    const values = [];
  
    if (dni !== undefined) {
      fields.push('dni = ?');
      values.push(dni);
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

module.exports = router;