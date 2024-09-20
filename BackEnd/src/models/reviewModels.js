class Resenia {
  constructor(idResenia, precio, atencion, calidad, tiempo, comentario, idAutor) {
    this.idResenia = idResenia;
    this.precio = precio;
    this.atencion = atencion;
    this.calidad = calidad;
    this.tiempo = tiempo;
    this.comentario = comentario;
    this.idAutor = idAutor;
  }

  // Crear una nueva reseña
  static async create(connection, { precio, atencion, calidad, tiempo, comentario, idAutor }) {
    const sql = `INSERT INTO Resenia (precio, atencion, calidad, tiempo, comentario, idAutor) VALUES (?, ?, ?, ?, ?, ?)`;
    const [result] = await connection.query(sql, [precio, atencion, calidad, tiempo, comentario, idAutor]);
    return result;
  }

  // Buscar una reseña por su ID
  static async findById(connection, idResenia) {
    const sql = `SELECT * FROM Resenia WHERE idResenia = ?`;
    const [rows] = await connection.query(sql, [idResenia]);
    return rows[0];
  }

  // Actualizar una reseña (solo comentario en este caso)
  static async update(connection, { idResenia, comentario }) {
    const sql = `UPDATE Resenia SET comentario = ? WHERE idResenia = ?`;
    const [result] = await connection.query(sql, [comentario, idResenia]);
    return result;
  }

  // Eliminar una reseña
  static async delete(connection, idResenia) {
    const sql = `DELETE FROM Resenia WHERE idResenia = ?`;
    const [result] = await connection.query(sql, [idResenia]);
    return result;
  }
}

module.exports = Resenia;
