class Localidad {
    constructor(idLocalidad, codPostal, nombre, idProvincia) {
      this.idLocalidad = idLocalidad;
      this.codPostal = codPostal;
      this.nombre = nombre;
      this.idProvincia = idProvincia;
    }
  
    static async create(connection, { codPostal, nombre, idProvincia }) {
      const sql = `INSERT INTO Localidad (codPostal, nombre, idProvincia) VALUES (?, ?, ?)`;
      const [result] = await connection.query(sql, [codPostal, nombre, idProvincia]);
      return result;
    }
  
    static async findById(connection, idLocalidad) {
      const sql = `SELECT * FROM Localidad WHERE idLocalidad = ?`;
      const [rows] = await connection.query(sql, [idLocalidad]);
      return rows[0];
    }

    static async findByUserId(pool, idPersona) {
        const query = `
            SELECT l.*
            FROM localidad l
            INNER JOIN localidadxpersona lp ON l.idLocalidad = lp.idLocalidad
            INNER JOIN user u ON lp.idPersona = u.id
            WHERE u.id = ?
        `;
        const [rows] = await pool.execute(query, [idPersona]);
        return rows;
    }
  
    static async associateLocalidadToUser(pool, idLocalidad, idPersona) {
      const query = `
          INSERT INTO localidadxpersona (idLocalidad, idPersona)
          VALUES (?, ?)
      `;
      const [result] = await pool.execute(query, [idLocalidad, idPersona]);
      return result.insertId; // Retornamos el id del nuevo registro
    }

    static async findAll(connection) {
      const sql = `SELECT * FROM Localidad`;
      const [rows] = await connection.query(sql);
      return rows;
    }
  
    static async update(connection, { idLocalidad, codPostal, nombre }) {
      const sql = `UPDATE Localidad SET codPostal = ?, nombre = ? WHERE idLocalidad = ?`;
      const [result] = await connection.query(sql, [codPostal, nombre, idLocalidad]);
      return result;
    }
  
    static async delete(connection, idLocalidad) {
      const sql = `DELETE FROM Localidad WHERE idLocalidad = ?`;
      const [result] = await connection.query(sql, [idLocalidad]);
      return result;
    }
  }
  
module.exports = Localidad;