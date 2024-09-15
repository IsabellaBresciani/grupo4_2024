const express = require('express');
const app = express();
const database = require('./database');
const cors = require('cors');
const Joi = require('joi');



// Defino los puerto
const PORT = process.env.PORT || 3000;

// 3. Middleware para parsear JSON
app.use(express.json());


// 4. Define una ruta de prueba (GET)
app.get('/prueba', (req, res) => {
    res.send('¡Hola Mundo!');
});


// 6. Inicia el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log("Probando");
});



app.get("/register", async(req,res) => {
    const connection = await database.getConnection();
    const result = await connection.query("select * from cliente")
    res.json(result)
})


// Ruta para obtener todos los clientes
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