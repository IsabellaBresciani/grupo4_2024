const express = require('express');


app.get('/clientes', async (req, res) => {
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