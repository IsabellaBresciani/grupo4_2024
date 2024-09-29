class Publicacion {
    constructor(idPublicacion, fecha, descripcion, titulo) {
      this.idPublicacion = idPublicacion;
      this.fecha = fecha;
      this.descripcion = descripcion;
      this.titulo = titulo;
    }
  
    static async create(connection, { fecha, descripcion, titulo }) {
      const sql = `INSERT INTO Publicacion (fecha, descripcion, titulo) VALUES (?, ?, ?)`;
      const [result] = await connection.query(sql, [fecha, descripcion, titulo]);
      return result;
    }
  
    static async findById(connection, idPublicacion) {
      const sql = `SELECT * FROM Publicacion WHERE idPublicacion = ?`;
      const [rows] = await connection.query(sql, [idPublicacion]);
      return rows[0];
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
  
  module.exports = Publicacion;
  