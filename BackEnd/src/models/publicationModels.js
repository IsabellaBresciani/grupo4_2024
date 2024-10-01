class Publication {
    constructor(idPublicacion, fecha, descripcion, titulo, imagen, idUser) {
      this.idPublicacion = idPublicacion;
      this.fecha = fecha;
      this.descripcion = descripcion;
      this.titulo = titulo;
      this.imagen = imagen;
      this.idUser = idUser;
    }
  
    static async create(connection, { fecha, descripcion, titulo, imagen, idUser }) {
      const sql = `INSERT INTO Publicacion (fecha, descripcion, titulo, imagen, idUser) VALUES (?, ?, ?, ?, ?)`;
      const [result] = await connection.query(sql, [fecha, descripcion, titulo, imagen, idUser]);
      return result;
    }
  
    static async findById(connection, idPublicacion) {
      const sql = `SELECT * FROM Publicacion WHERE idPublicacion = ?`;
      const [rows] = await connection.query(sql, [idPublicacion]);
      return rows[0];
    }

    static async findByUserId(connection, idUser) {
      const sql = 'SELECT p.idPublicacion, p.titulo, p.descripcion, p.fecha, p.imagen, u.usuario FROM servicioya.publicacion p JOIN servicioya.user u ON p.idUser = u.id WHERE p.idUser = ?'
      const [rows] = await connection.query(sql, [idUser]);
      return rows;
    }
  
    static async update(connection, { idPublicacion, descripcion, titulo }) {
      const sql = `UPDATE Publicacion SET descripcion = ?, titulo = ? WHERE idPublicacion = ?`;
      const [result] = await connection.query(sql, [descripcion, titulo, idPublicacion]);
      return result;
    }
  
    static async delete(connection, idPublicacion) {
      const sql = `DELETE FROM Publicacion WHERE idPublicacion = ?`;
      const [result] = await connection.query(sql, [idPublicacion]);
      return result;
    }
  }
  
  module.exports = Publication;
  