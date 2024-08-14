import mysql from "mysql2/promise";
import { configBD } from "../configBD.js";

const connection = await mysql.createConnection(configBD);

export class CarreraModel {
  static async getAll() {
    const [carreras] = await connection.query(
      "SELECT idCarrera, Vueltas AS vueltas, Fecha AS fecha, HoraInicio AS horaInicio, Estado AS estado, idCircuito FROM carreras;"
    );

    return carreras;
  }

  static async getById({ id }) {
    const [carrera] = await connection.query(
      "SELECT idCarrera, Vueltas AS vueltas, Fecha AS fecha, HoraInicio AS horaInicio, Estado AS estado, idCircuito FROM carreras WHERE idCarrera = ?;",
      [id]
    );

    if (carrera) return carrera;
    return "Carrera no encontrada";
  }

  static async getComentarios({ id }) {
    const [comentarios] = await connection.query(
      "SELECT COM.idUsuario AS idUsuario, COM.idPiloto AS idPiloto, COM.idCarrera AS idCarrera, COM.Comentario AS Comentario, U.NombreUsuario AS nombreUsuario, U.ImgPerfil AS imgPerfilUsuario, CONCAT(P.Nombre, ' ', P.Apellido) AS nombrePiloto, P.ImgPerfil AS imgPerfilPiloto, PA.Nombre AS nombrePais FROM Comentarios_Usuarios_Pilotos_Carreras COM JOIN Usuarios U ON COM.idUsuario = U.idUsuario JOIN Pilotos P ON COM.idPiloto = P.idPiloto JOIN Carreras C ON COM.idCarrera = C.idCarrera JOIN Circuitos Cir ON Cir.idCircuito = C.idCircuito JOIN Paises PA ON Cir.idPais = PA.idPais WHERE COM.idCarrera = ?",
      [id]
    );

    if (comentarios.length < 1) return "Esta carrera no tiene comentarios";
    return comentarios;
  }

  static async getLibres({ id }) {
    const [libres] = await connection.query(
      "SELECT * FROM Libres WHERE idCarrera = ?",
      [id]
    );

    if (libres) return libres;

    return "Libres no encontrados";
  }

  static async getClasificacion({ id }) {
    const [clasificacion] = await connection.query(
      "SELECT * FROM Clasificaciones WHERE idCarrera = ?;",
      [id]
    );

    if (clasificacion) return clasificacion;

    return "Clasificación no encontrada";
  }

  static async getCircuito({ id }) {
    const [circuito] = await connection.query(
      "SELECT * FROM Circuitos WHERE idCircuito = (SELECT idCircuito FROM Carreras WHERE idCarrera = ?);",
      [id]
    );

    if (circuito) return circuito;

    return "Circuito no encontrado";
  }

  static async getAllFechas() {
    const [fechas] = await connection.query("SELECT Fecha FROM Carreras;");

    return fechas;
  }

  static async getListaCarreras() {
    const [carreras] = await connection.query(
      "SELECT C.idCarrera AS id, Ci.ImgSiluetaCircuito AS imgSiluetaCircuito, P.Nombre AS nombrePais, C.Fecha AS fecha, C.HoraInicio AS horaInicio, C.Estado AS estado FROM Carreras C  JOIN Circuitos Ci ON Ci.idCircuito = C.idCircuito JOIN Paises P ON P.idPais = Ci.idPais;"
    );

    return carreras;
  }

  static async comentarCarrera({ idCarrera, idUsuario, idPiloto, comentario }) {
    const [existeComentario] = await connection.query(
      "SELECT * FROM Comentarios_Usuarios_Pilotos_Carreras WHERE idUsuario = ? AND idCarrera = ?; ",
      [idUsuario, idCarrera]
    );

    if (existeComentario) return "El usuario ya ha comentado en esta carrera";

    await connection.query(
      "INSERT INTO Comentarios_Usuarios_Pilotos_Carreras(idPiloto, idCarrera, idUsuario, Comentario) VALUES(?, ?, ?, '?')",
      [idPiloto, idCarrera, idUsuario, comentario]
    );

    return "Comentario publicado";
  }
}
