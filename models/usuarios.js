import mysql from "mysql2/promise";
import { configBD } from "../configBD.js";

const connection = await mysql.createConnection(configBD);

export class UsuarioModel {
  static async getAll() {
    const [usuarios] = await connection.query(
      "SELECT idUsuario, ImgPerfil AS imgPerfil, Nombre AS nombre, Apellidos AS apellidos, FechaNac AS fechaNac, NombreUsuario AS nombreUsuario, Correo AS correo, Rol AS rol, TemaSeleccionado AS temaSeleccionado, idPais FROM usuarios;"
    );

    return usuarios;
  }

  static async getById({ id }) {
    const [usuario] = await connection.query(
      "SELECT idUsuario, ImgPerfil AS imgPerfil, Nombre AS nombre, Apellidos AS apellidos, FechaNac AS fechaNac, NombreUsuario AS nombreUsuario, Correo AS correo, Rol AS rol, TemaSeleccionado AS temaSeleccionado, idPais FROM usuarios WHERE idUsuario = ?;",
      [id]
    );

    return usuario;
  }

  static async getByEmail({ correo }) {
    const [usuario] = await connection.query(
      "SELECT idUsuario, ImgPerfil AS imgPerfil, Nombre AS nombre, Apellidos AS apellidos, FechaNac AS fechaNac, NombreUsuario AS nombreUsuario, Correo AS correo, Rol AS rol, TemaSeleccionado AS temaSeleccionado, idPais FROM usuarios WHERE correo = ?;",
      [correo]
    );

    return usuario;
  }

  static async registrar({ usuario }) {
    const {
      imgPerfil,
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
        "INSERT INTO usuarios (ImgPerfil, Nombre, Apellidos, FechaNac, NombreUsuario, Correo, Rol, TemaSeleccionado, idPais) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);",
        [
          imgPerfil,
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

    const [usuarioFinal] = await connection.query(
      "SELECT idUsuario, ImgPerfil AS imgPerfil, Nombre AS nombre, Apellidos AS apellidos, FechaNac AS fechaNac, NombreUsuario AS nombreUsuario, Correo AS correo, Rol AS rol, TemaSeleccionado AS temaSeleccionado, idPais FROM usuarios WHERE correo = ?;",
      [correo]
    );

    return usuarioFinal;
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
      "SELECT idUsuario, ImgPerfil AS imgPerfil, Nombre AS nombre, Apellidos AS apellidos, FechaNac AS fechaNac, NombreUsuario AS nombreUsuario, Correo AS correo, Rol AS rol, TemaSeleccionado AS temaSeleccionado, idPais FROM usuarios WHERE correo = ?;",
      [correo]
    );

    return usuario;
  }

  static async cambiarTemaSeleccionado({ correo, temaSeleccionado }) {
    await connection.query(
      "UPDATE usuarios SET TemaSeleccionado = ? WHERE Correo = ?;",
      [temaSeleccionado, correo]
    );

    const [usuario] = await connection.query(
      "SELECT idUsuario, ImgPerfil AS imgPerfil, Nombre AS nombre, Apellidos AS apellidos, FechaNac AS fechaNac, NombreUsuario AS nombreUsuario, Correo AS correo, Rol AS rol, TemaSeleccionado AS temaSeleccionado, idPais FROM usuarios WHERE correo = ?;",
      [correo]
    );

    return usuario;
  }

  static async getPaisUsuario({ id }) {
    const [pais] = await connection.query(
      "SELECT idPais, Nombre AS nombre, CountryCode AS countryCode FROM Paises WHERE IdPais = (SELECT IdPais FROM Usuarios WHERE IdUsuario = ?)",
      [id]
    );

    return pais;
  }

  static async getSeguidoresUsuario({ id }) {
    const [seguidores] = await connection.query(
      "SELECT idUsuario, NombreUsuario AS nombreUsuario, ImgPerfil AS imgPerfil FROM Usuarios_Siguen_Usuarios USU JOIN Usuarios U ON USU.idUsuario1 = U.idUsuario WHERE USU.idUsuario2 = ?",
      [id]
    );

    if (seguidores.length < 1) return "Este usuario no tiene seguidores";

    const [numComentarios] = await connection.query(
      "SELECT COUNT(Comentario) AS numComentarios FROM Comentarios_Usuarios_Pilotos_Carreras WHERE idUsuario = ?",
      [id]
    );
    if (!numComentarios) numComentarios = 0;

    let seguidoresFinales = [];

    seguidores.forEach((seguidor) => {
      seguidoresFinales.push({
        idUsuario: seguidor.idUsuario,
        nombreUsuario: seguidor.nombreUsuario,
        numComentarios: numComentarios,
        imgPerfil: seguidor.imgPerfil,
      });
    });

    return seguidoresFinales;
  }

  static async getSeguidosUsuario({ id }) {
    const [seguidos] = await connection.query(
      "SELECT idUsuario, NombreUsuario AS nombreUsuario, ImgPerfil AS imgPerfil FROM Usuarios_Siguen_Usuarios USU JOIN Usuarios U ON USU.idUsuario2 = U.idUsuario WHERE USU.idUsuario1 = ?",
      [id]
    );

    if (seguidos.length < 1) return "Este usuario no tiene seguidores";

    const [numComentarios] = await connection.query(
      "SELECT COUNT(Comentario) AS numComentarios FROM Comentarios_Usuarios_Pilotos_Carreras WHERE idUsuario = ?",
      [id]
    );
    if (!numComentarios) numComentarios = 0;

    let seguidosFinales = [];

    seguidos.forEach((seguido) => {
      seguidosFinales.push({
        idUsuario: seguido.idUsuario,
        nombreUsuario: seguido.nombreUsuario,
        numComentarios: numComentarios,
        imgPerfil: seguido.imgPerfil,
      });
    });

    return seguidosFinales;
  }

  static async getPilotosSeguidosUsuario({ id }) {
    const [pilotosSeguidos] = await connection.query(
      "SELECT P.idPiloto, ImgPerfil AS imgPerfil, Nombre AS nombre, Apellido AS apellido, FechaNac AS fechaNac, Peso AS peso, Altura AS altura, Numero AS numero, Puntuacion AS puntuacion FROM Usuarios_Siguen_Pilotos USU JOIN Pilotos P ON P.idPiloto = USU.idPiloto WHERE USU.idUsuario = ?",
      [parseInt(id)]
    );

    if (pilotosSeguidos.length < 1)
      return "Este usuario no sigue ningún piloto";

    return pilotosSeguidos;
  }

  static async getComentariosUsuario({ id }) {
    const [comentarios] = await connection.query(
      "SELECT COM.idUsuario AS idUsuario, COM.idPiloto AS idPiloto, COM.idCarrera AS idCarrera, COM.Comentario AS Comentario, U.NombreUsuario AS nombreUsuario, CONCAT(P.Nombre, ' ', P.Apellido) AS nombrePiloto, PA.Nombre AS nombrePais, U.ImgPerfil AS imgPerfilUsuario, P.ImgPerfil AS imgPerfilPiloto FROM Comentarios_Usuarios_Pilotos_Carreras COM JOIN Usuarios U ON COM.idUsuario = U.idUsuario JOIN Pilotos P ON COM.idPiloto = P.idPiloto JOIN Carreras C ON COM.idCarrera = C.idCarrera JOIN Circuitos Cir ON Cir.idCircuito = C.idCircuito JOIN Paises PA ON Cir.idPais = PA.idPais WHERE U.idUsuario = ?",
      [parseInt(id)]
    );

    if (comentarios.length < 1)
      return "Este usuario no ha hecho ningún comentario";

    return comentarios;
  }

  static async seguirPilotosRegistro({ correo, pilotos }) {
    const [usuario] = await connection.query(
      "SELECT * FROM Usuarios WHERE Correo = ?",
      [correo]
    );

    if (!usuario) return "Usuario no encontrado";

    pilotos.forEach(async (idPiloto) => {
      await connection.query(
        "INSERT INTO Usuarios_Siguen_Pilotos (idUsuario, idPiloto) VALUES (?, ?)",
        [parseInt(usuario.idUsuario), parseInt(idPiloto)]
      );
    });

    return "Pilotos seguidos correctamente";
  }

  static async seguirUsuario({ idUsuario1, idUsuario2 }) {
    await connection.query(
      "INSERT INTO Usuarios_Siguen_Usuarios (idUsuario1, idUsuario2) VALUES (?, ?)",
      [idUsuario1, idUsuario2]
    );

    return "Solicitud de seguimiento aceptada";
  }

  static async dejarDeSeguirUsuario({ idUsuario1, idUsuario2 }) {
    await connection.query(
      "DELETE FROM Usuarios_Siguen_Usuarios WHERE idUsuario1 = ? AND idUsuario2 = ?",
      [parseInt(idUsuario1), parseInt(idUsuario2)]
    );

    return "Solicitud para cancelar seguimiento aceptada";
  }
}
