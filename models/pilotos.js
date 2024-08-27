import mysql from "mysql2/promise";
import { configBD } from "../configBD.js";

const connection = await mysql.createConnection(configBD);

export class PilotoModel {
  static async getAll() {
    const [pilotos] = await connection.query(
      "SELECT idPiloto, ImgPerfil AS imgPerfil, Nombre AS nombre, Apellido AS apellido, FechaNac AS fechaNac, Peso AS peso, Altura AS altura, Numero AS numero, Puntuacion AS puntuacion, idPais, idCoche FROM Pilotos;"
    );
    return pilotos;
  }

  static async getById({ id }) {
    const [piloto] = await connection.query(
      "SELECT idPiloto, ImgPerfil AS imgPerfil, Nombre AS nombre, Apellido AS apellido, FechaNac AS fechaNac, Peso AS peso, Altura AS altura, Numero AS numero, Puntuacion AS puntuacion, idPais, idCoche FROM Pilotos WHERE idPiloto = ?;",
      [id]
    );
    return piloto;
  }
  static async getPais({ id }) {
    const [pais] = await connection.query(
      "SELECT idPais, Nombre AS nombre, CountryCode AS countryCode FROM Paises WHERE IdPais = (SELECT IdPais FROM Pilotos WHERE IdPiloto = ?);",
      [id]
    );
    return pais;
  }

  static async getCoche({ id }) {
    const [coche] = await connection.query(
      "SELECT idCoche, Modelo AS modelo, ImgPrincipal AS imgPrincipal, SegundaImg AS segundaImg, TerceraImg AS terceraImg, CuartaImg AS cuartaImg, idEscuderia FROM Coches WHERE IdCoche = (SELECT IdCoche FROM Pilotos WHERE IdPiloto = ?);",
      [id]
    );
    return coche;
  }

  static async getUsuariosSeguidores({ id }) {
    const [seguidores] = await connection.query(
      "SELECT * FROM Usuarios_Siguen_Pilotos USP JOIN Usuarios U ON USP.idUsuario = U.idUsuario WHERE USP.idPiloto = ?;",
      [id]
    );
    return seguidores;
  }

  static async getComentarios({ id }) {
    const [comentarios] = await connection.query(
      "SELECT * FROM Comentarios_Usuarios_Pilotos_Carreras WHERE idPiloto = ?;",
      [id]
    );
    return comentarios;
  }

  static async getDatosClasificacion() {
    const [datosClasificacion] = await connection.query(
      "SELECT P.idPiloto AS idPiloto, P.Nombre AS nombre, P.Apellido AS apellido, P.ImgPerfil AS imgPerfil, P.Puntuacion AS puntosTotales, E.Nombre AS nombreEscuderia, PA.CountryCode AS paisCC, PA.Nombre AS nombrePais FROM  Pilotos P JOIN  Coches C ON P.idCoche = C.idCoche JOIN  Escuderias E ON C.idEscuderia = E.idEscuderia JOIN  Paises PA ON P.idPais = PA.idPais ORDER BY puntosTotales DESC"
    );
    return datosClasificacion;
  }

  static async getDatosClasificacionComunidad() {
    const [datosClasificacionComunidad] = await connection.query(
      "SELECT P.idPiloto AS idPiloto, P.Nombre AS nombre, P.Apellido AS apellido, P.ImgPerfil AS imgPerfil, COUNT(CM.Comentario) AS votosTotales, E.Nombre AS nombreEscuderia, PA.CountryCode AS paisCC FROM Pilotos P JOIN Coches C ON P.idCoche = C.idCoche JOIN Escuderias E ON C.idEscuderia = E.idEscuderia JOIN Paises PA ON P.idPais = PA.idPais LEFT JOIN Comentarios_Usuarios_Pilotos_Carreras CM ON P.idPiloto = CM.idPiloto GROUP BY P.idPiloto, P.Nombre, P.Apellido, P.ImgPerfil, E.Nombre, PA.CountryCode ORDER BY votosTotales DESC"
    );
    return datosClasificacionComunidad;
  }

  static async getPuntuaciones({ id }) {
    const [posicionesPiloto] = await connection.query(
      "SELECT R.PosicionFinal FROM Carreras C JOIN Pilotos_Corren_Carreras R ON C.idCarrera = R.idCarrera WHERE R.idPiloto = ?;",
      [id]
    );

    let puntuaciones = [];

    posicionesPiloto.forEach((posicion) => {
      let puntuacion;
      switch (posicion) {
        case 1:
          puntuacion = 25;
          break;
        case 2:
          puntuacion = 18;
          break;
        case 3:
          puntuacion = 15;
          break;
        case 4:
          puntuacion = 12;
          break;
        case 5:
          puntuacion = 10;
          break;
        case 6:
          puntuacion = 8;
          break;
        case 7:
          puntuacion = 6;
          break;
        case 8:
          puntuacion = 4;
          break;
        case 9:
          puntuacion = 2;
          break;
        case 10:
          puntuacion = 1;
          break;

        default:
          puntuacion = 0;
          break;
      }

      puntuaciones.push(puntuacion);
    });

    return puntuaciones;
  }

  static async getDatosPerfil({ id }) {
    const [datosPerfil] = await connection.query(
      "SELECT P.ImgPerfil AS imgPerfil, C.ImgPrincipal AS imgCoche, CONCAT(P.Nombre, ' ', P.Apellido) AS nombreCompleto, P.FechaNac AS fechaNac, P.Altura AS altura, P.Peso AS peso, P.Numero AS numero, E.Nombre AS nombreEscuderia FROM Pilotos P JOIN Coches C ON C.idCoche = P.idCoche JOIN Escuderias E ON E.idEscuderia = (SELECT idEscuderia FROM Coches C WHERE C.idCoche = P.idCoche) WHERE P.idPiloto = ?;",
      [id]
    );
    return datosPerfil;
  }

  static async seguirPiloto({ idPiloto, idUsuario }) {
    await connection.query(
      "INSERT INTO Usuarios_Siguen_Pilotos (idUsuario, idPiloto) VALUES (?, ?);",
      [idUsuario, idPiloto]
    );

    const [seguimiento] = await connection.query(
      "SELECT * FROM Usuarios_Siguen_Pilotos WHERE idUsuario = ? AND idPiloto = ?;",
      [idUsuario, idPiloto]
    );

    return seguimiento;
  }

  static async dejarDeSeguirPiloto({ idPiloto, idUsuario }) {
    await connection.query(
      "DELETE FROM Usuarios_Siguen_Pilotos WHERE idUsuario = ? AND idPiloto = ?;",
      [idUsuario, idPiloto]
    );
  }
}
