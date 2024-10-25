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

    static async findUserXService(connection, idPersona) {
      const sql = `SELECT sa.idServicio, sa.idAsociacion, s.description, sa.estado, s.imagen
        FROM ServicioAsociado sa
        JOIN service s ON sa.idServicio = s.idservice
        WHERE sa.idPersona = ?`;
      const [result] = await connection.query(sql, [idPersona]);
      return result;
    }

    static async addUserXService(connection,{ idPersona, idServicio, estado}) {
      const sql = `
          INSERT INTO servicioya.servicioasociado (idPersona, idServicio, estado)
          VALUES (?, ?, ?);
      `;
      const [result] = await connection.query(sql, [idPersona, idServicio, estado]);
      return result;
    }

    static async updateServicioAsoc(connection, { estado, idServicio, idPersona }) {
      const sql = `UPDATE ServicioAsociado SET estado = ? WHERE idPersona = ? AND idServicio = ?`;
      const [result] = await connection.query(sql, [estado, idPersona, idServicio]);
      return result;
    }

  }
  
  module.exports = Service;
  