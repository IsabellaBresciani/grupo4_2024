class User {
  constructor(idPersona, dni, nombre, apellido, fechaNac, email, nombreUsuario, contrasena, foto, telefono, descripcion) {
      this.idPersona = idPersona;
      this.dni = dni;
      this.nombre = nombre;
      this.apellido = apellido;
      this.fechaNac = fechaNac;
      this.mail = email;
      this.nombreUsuario = nombreUsuario;
      this.contrasena = contrasena;
      this.foto = foto;
      this.telefono = telefono;
      this.descripcion = descripcion; // Nueva propiedad para la descripción
  }

  static async create(connection, dni, nombre, apellido, fecha_nacimiento, email, usuario, hashedPassword, descripcion) {
      const sql = `INSERT INTO servicioya.user (dni, nombre, apellido, fecha_nacimiento, email, usuario, password, descripcion) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
      const [result] = await connection.query(sql, [dni, nombre, apellido, fecha_nacimiento, email, usuario, hashedPassword, descripcion]);
      return result;
  }

  static async find(connection) {
      const sql = `SELECT * FROM servicioya.user`;
      const [rows] = await connection.query(sql);
      return rows;
  }

  static async findById(pool, id) {
      try {
          const sql = 'SELECT * FROM user WHERE id = ?';
          const [rows] = await pool.query(sql, [id]);
          return rows;
      } catch (error) {
          console.error('Error al buscar usuario por ID:', error);
          throw error;
      }
  }

  static async findByUsername(connection, username) {
      const sql = `SELECT u.id, u.nombre, u.apellido, u.foto, u.email, u.telefono, u.fecha_nacimiento, l.nombre AS localidad, u.descripcion
                   FROM servicioya.user AS u
                   LEFT JOIN servicioya.localidadxpersona AS lp ON u.id = lp.idPersona
                   LEFT JOIN servicioya.localidad AS l ON lp.idLocalidad = l.idLocalidad
                   WHERE u.usuario = ?;`;

      const [rows] = await connection.query(sql, username);

      if (rows.length === 0) {
          return [];
      }

      return rows;
  }

  static async update(connection, fields, datos) {
      const sql = `UPDATE servicioya.user SET ${fields} WHERE usuario = ?`;
      const [result] = await connection.query(sql, datos);
      return result;
  }

  static async delete(connection, username) {
      const sql = `DELETE FROM servicioya.user WHERE usuario = ?`;
      const [result] = await connection.query(sql, username);
      return result;
  }

  static async findUserByService(connection, nomService) {
      const sql = `SELECT u.id, u.nombre, u.apellido, u.foto, u.email, u.telefono FROM servicioya.user AS u JOIN servicioya.servicioasociado AS sa ON u.id = sa.idPersona JOIN servicioya.service AS s ON sa.idServicio = s.idservice WHERE s.description = ?`;
      const [result] = await connection.query(sql, [nomService]);
      return result;
  }

  static async findUserByEmailUsername(connection, username, email) {
      const sql = `SELECT * FROM servicioya.user WHERE usuario = ? OR email = ?`;
      const [result] = await connection.query(sql, [username, email]);
      return result || [];
  }
}

module.exports = User;