const express = require('express');
const router = express.Router();
const pool = require('../config/database');  // Importar la conexión de la base de datos


router.get('/', async (req, res) => {
    let connection;
    try {
        // Crear la conexión
        connection = await mysql.createConnection(dbConfig);

        // Consulta para obtener todos los clientes
        const [rows] = await connection.execute('SELECT * FROM clientes');

        // Enviar los resultados como respuesta
        res.json(rows);
    } catch (err) {
        console.error('Error en la consulta:', err);
        res.status(500).json({ message: 'Error en el servidor' });
    } finally {
        if (connection) {
            await connection.end(); // Asegúrate de cerrar la conexión
        }
    }
});

router.get("/:user_id", async (req, res) => {
    const { user_id } = req.params;
    
    try {
        const [results] = await pool.query('SELECT * FROM servicioya.user WHERE idPersona = ?', [user_id]);
        
        if (results.length === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        
        res.json(results[0]);
    } catch (error) {
        return res.status(500).json({ error: 'Error en la consulta' });
    }
});


// Actualizar un servicio existente
router.put('/:user_id', async (req, res) => {
    const { user_id } = req.params;
    const { dni } = req.body;
    const { nombre } = req.body;
    const { apellido } = req.body;
    const { fechaNac } = req.body;
    const { mail } = req.body;
    const { nombreUsuario } = req.body;
    const { contrasena } = req.body;

  
    // Validación básica
    if ( !description ) {
        return res.status(400).json({ error: 'Descripcion obligatoria' });
    }
    
    try {
        const [result] = await pool.query('UPDATE servicioya.user SET description = ? WHERE idPersona = ?', [description, user_id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        res.json({ message: 'Usuario actualizado correctamente' });
    } catch (error) {
        return res.status(500).json({ error: 'Error al actualizar el Usuario' });
    }
});


module.exports = router;