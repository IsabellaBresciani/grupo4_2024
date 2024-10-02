  class Persona {
    constructor(idPersona, dni, nombre, apellido, fechaNac, email, nombreUsuario, contrasena, foto, telefono) {
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
    }
  
    static async create(connection, { dni, nombre, apellido, fechaNac, email, nombreUsuario, contrasena }) {
      const sql = `INSERT INTO Persona (DNI, nombre, apellido, fechaNac, email, nombreUsuario, contraseña) VALUES (?, ?, ?, ?, ?, ?, ?)`;
      const [result] = await connection.query(sql, [dni, nombre, apellido, fechaNac, email, nombreUsuario, contrasena]);
      return result;
    }
  
    static async findById(connection, idPersona) {
      const sql = `SELECT u.nombre, u.apellido, u.foto, u.email, u.telefono, u.fecha_nacimiento , l.nombre FROM servicioya.user AS u JOIN servicioya.localidadxpersona AS lp ON u.id = lp.idPersona JOIN servicioya.localidad AS l ON lp.idLocalidad = l.idLocalidad WHERE u.id = ?;`;
      const [rows] = await connection.query(sql, [idPersona]);
      return rows[0];
    }
  
    static async update(connection, { idPersona, nombre, apellido, email }) {
      const sql = `UPDATE Persona SET nombre = ?, apellido = ?, email = ? WHERE idPersona = ?`;
      const [result] = await connection.query(sql, [nombre, apellido, email, idPersona]);
      return result;
    }
  
    static async delete(connection, idPersona) {
      const sql = `DELETE FROM Persona WHERE idPersona = ?`;
      const [result] = await connection.query(sql, [idPersona]);
      return result;
    }
  }
  
  module.exports = Persona;
  