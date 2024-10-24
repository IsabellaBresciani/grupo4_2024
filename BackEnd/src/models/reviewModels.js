class Review {
  constructor(idreview, precio, atencion, calidad, tiempo, comentario, idAutor, servicioasociado_id) {
    this.idResenia = idreview;
    this.precio = precio;
    this.atencion = atencion;
    this.calidad = calidad;
    this.tiempo = tiempo;
    this.comentario = comentario;
    this.idAutor = idAutor;
    this.servicioasociado_id = servicioasociado_id;
  }

  // Crear una nueva reseña
  static async create(connection, { precio, atencion, calidad, tiempo, comentario, idAutor, servicioasociado_id }) {
    const sql = 'INSERT INTO servicioya.review (precio, atencion, calidad, tiempo, comentario, idAutor, servicioasociado_id) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const [result] = await connection.query(sql, [precio, atencion, calidad, tiempo, comentario, idAutor, servicioasociado_id]);
    return result;
  }

  // Buscar todas las reseñas
  static async find(connection) {
    const sql = `SELECT * FROM review`;
    const [rows] = await connection.query(sql);
    return rows;
  }

  // Buscar una reseña por su ID
  static async findById(connection, idreview) {
    const sql = `SELECT * FROM servicioya.review WHERE idreview = ?`;
    const [rows] = await connection.query(sql, [idreview]);
    return rows[0];
  }

  // Buscar todas las reseñas asociadas a un usuario, por su ID
  static async findByUser(connection, username) {
    const sql = `
      SELECT * FROM servicioya.review 
      JOIN servicioya.service ON review.servicioasociado_id = service.idAsociacion 
      JOIN servicioya.userXservice ON service.idAsociacion = userXservice.idAsociacion
      JOIN servicioya.User ON userXservice.idUser = User.id 
      WHERE User.name = ?
    `;
    const [rows] = await connection.query(sql, [username]);
    return rows;
  }

  // Actualizar una reseña (solo comentario y otros atributos, no se puede cambiar idAutor ni servicioasociado_id)
  static async update(connection, { idResenia, comentario, precio, atencion, calidad, tiempo }) {
    const sql = `UPDATE servicioya.review SET comentario = ?, precio = ?, atencion = ?, calidad = ?, tiempo = ? WHERE idreview = ?`;
    const [result] = await connection.query(sql, [comentario, precio, atencion, calidad, tiempo, idResenia]); // Asegúrate de que idResenia es correcto
    return result;
  }

  // Eliminar una reseña
  static async delete(connection, idResenia) {
    const sql = `DELETE FROM servicioya.review WHERE idreview = ?`;
    const [result] = await connection.query(sql, [idResenia]);
    return result;
  }
}

module.exports = Review;
