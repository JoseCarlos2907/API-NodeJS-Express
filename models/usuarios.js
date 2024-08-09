import mysql from "mysql2/promise";
import { configBD } from "../configBD";

const connection = await mysql.createConnection(configBD);

export class UsuarioModel {
  static async getAll() {
    const { usuarios } = await connection.query("SELECT * FROM usuarios;");

    return usuarios;
  }

  static async getById({ id }) {
    const [usuario] = await connection.query(
      "SELECT * FROM usuarios WHERE idUsuario = ?;",
      [id]
    );

    return usuario;
  }

  static async getByEmail({ email }) {
    const [usuario] = await connection.query(
      "SELECT * FROM usuarios WHERE email = ?;",
      [email]
    );

    return usuario;
  }

  static async registrar({ usuario }) {
    const {
      nombre,
      apellidos,
      fechaNac,
      nombreUsuario,
      correo,
      rol,
      temaSeleccionado,
    } = usuario;
    try {
      await connection.query(
        "INSERT INTO usuarios (Nombre, Apellidos, FechaNac, NombreUsuario, Correo, Rol, TemaSeleccionado, idPais) VALUES (?, ?, ?, ?, ?, ?, ?, ?);",
        [
          nombre,
          apellidos,
          fechaNac,
          nombreUsuario,
          correo,
          rol,
          temaSeleccionado,
          3,
        ]
      );
    } catch (error) {
      // Puede enviarle información sensible
      throw new Error("Error creating usuario");

      // Enviar la traza a un servicio interno
      // sendLog(e)
    }

    const [usuario] = await connection.query(
      "SELECT * FROM usuarios WHERE email = ?;",
      [email]
    );

    return usuario;
  }

  static async delete({ id }) {
    await connection.query("DELETE FROM usuarios WHERE idUsuario = ?;", [id]);

    return { msg: "Usuario eliminado correctamente" };
  }

  static async cambiarDatosPrincipales({
    correo,
    nombreUsuario,
    nombre,
    apellidos,
    imgPerfil,
  }) {
    await connection.query(
      "UPDATE usuarios SET NombreUsuario = ?, Nombre = ?, Apellidos = ?, ImgPerfil = ? WHERE Correo = ?;",
      [nombreUsuario, nombre, apellidos, imgPerfil, correo]
    );

    const [usuario] = await connection.query(
      "SELECT * FROM usuarios WHERE email = ?;",
      [email]
    );

    return usuario;
  }

  static async cambiarDatosPrincipales({ correo, temaSeleccionado }) {
    await connection.query(
      "UPDATE usuarios SET TemaSeleccionado = ? WHERE Correo = ?;",
      [temaSeleccionado, correo]
    );

    const [usuario] = await connection.query(
      "SELECT * FROM usuarios WHERE email = ?;",
      [email]
    );

    return usuario;
  }
}
