class Review {
  constructor(idreview, precio, atencion, calidad, tiempo, comentario, idAutor) {
    this.idResenia = idreview;
    this.precio = precio;
    this.atencion = atencion;
    this.calidad = calidad;
    this.tiempo = tiempo;
    this.comentario = comentario;
    this.idAutor = idAutor;
  }

  // Crear una nueva reseña
  static async create(connection, { precio, atencion, calidad, tiempo, comentario, idAutor }) {
    const sql = `INSERT INTO review (precio, atencion, calidad, tiempo, comentario, idAutor) VALUES (?, ?, ?, ?, ?, ?)`;
    const [result] = await connection.query(sql, [precio, atencion, calidad, tiempo, comentario, idAutor]);
    return result;
  }

  // Buscar una reseña por su ID
  static async findById(connection, idResenia) {
    const sql = `SELECT * FROM review WHERE idreview = ?`;
    const [rows] = await connection.query(sql, [idResenia]);
    return rows[0];
  }
//Buscar todas las reseñas asociadas a un usuario, por su ID
  static async findByUser(connection, username) {
    const sql = `SELECT * FROM servicioya.review join servicioya.service join servicioya.userXservice join servicioya.User WHERE servicioya.user.name = ?`;
    const [rows] = await connection.query(sql, [username]);
    return rows;
  }

  // Actualizar una reseña (solo comentario en este caso)
  static async update(connection, { idResenia, comentario }) {
    const sql = `UPDATE Review SET comentario = ? WHERE idreview = ?`;
    const [result] = await connection.query(sql, [comentario, idResenia]);
    return result;
  }

  // Eliminar una reseña
  static async delete(connection, idResenia) {
    const sql = `DELETE FROM Review WHERE idreview = ?`;
    const [result] = await connection.query(sql, [idResenia]);
    return result;
  }
}

module.exports = Review;
