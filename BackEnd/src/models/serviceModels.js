class Service {
    constructor(idServicio, descripcion) {
      this.idServicio = idServicio;
      this.descripcion = descripcion;
    }
  
    static async create(connection, { descripcion }) {
      const sql = `INSERT INTO Servicio (descripcion) VALUES (?)`;
      const [result] = await connection.query(sql, [descripcion]);
      return result;
    }
  
    static async findById(connection, idServicio) {
      const sql = `SELECT * FROM Servicio WHERE idServicio = ?`;
      const [rows] = await connection.query(sql, [idServicio]);
      return rows[0];
    }
  
    static async update(connection, { idServicio, descripcion }) {
      const sql = `UPDATE Servicio SET descripcion = ? WHERE idServicio = ?`;
      const [result] = await connection.query(sql, [descripcion, idServicio]);
      return result;
    }
  
    static async delete(connection, idServicio) {
      const sql = `DELETE FROM Servicio WHERE idServicio = ?`;
      const [result] = await connection.query(sql, [idServicio]);
      return result;
    }
  }
  
  module.exports = Service;
  