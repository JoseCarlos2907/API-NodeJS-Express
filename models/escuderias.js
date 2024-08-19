import mysql from "mysql2/promise";
import { configBD } from "../configBD.js";

const connection = await mysql.createConnection(configBD);

export class EscuderiaModel {
  static async getAll() {
    const [escuderias] = await connection.query(
      "SELECT idEscuderia, imgLogo, imgEscuderia, Nombre AS nombre, Descripcion AS descripcion, Puntuacion AS puntuacion, idPais FROM Escuderias;"
    );

    return escuderias;
  }

  static async getById({ id }) {
    const [escuderia] = await connection.query(
      "SELECT idEscuderia, imgLogo, imgEscuderia, Nombre AS nombre, Descripcion AS descripcion, Puntuacion AS puntuacion, idPais FROM Escuderias WHERE idEscuderia = ?;",
      [id]
    );

    return escuderia;
  }

  static async getPais({ id }) {
    const [pais] = await connection.query(
      "SELECT idPais, Nombre AS nombre, CountryCode AS countryCode FROM Paises WHERE IdPais = (SELECT IdPais FROM Escuderias WHERE IdEscuderia = ?);",
      [id]
    );

    return pais;
  }

  static async getCoche({ id }) {
    const [coche] = await connection.query(
      "SELECT idCoche, Modelo AS modelo, ImgPrincipal AS imgPrincipal, SegundaImg AS segundaImg, TerceraImg AS terceraImg, CuartaImg AS cuartaImg, idEscuderia FROM Coches WHERE IdEscuderia = ?;",
      [id]
    );

    return coche;
  }

  static async getDatosClasificacionOficial() {
    const [datosEscuderias] = await connection.query(
      "SELECT E.idEscuderia AS idEscuderia, E.imgLogo AS imgLogo, E.Nombre AS nombre, E.Puntuacion AS puntosTotales, P.CountryCode AS paisCC, P.Nombre AS nombrePais FROM Escuderias E JOIN Paises P ON P.idPais = E.idPais;"
    );

    return datosEscuderias;
  }

  static async getDatosPerfil({ id }) {
    const [datosPerfil] = await connection.query(
      "SELECT E.Nombre AS nombre,E.imgLogo,E.imgEscuderia,E.Descripcion AS descripcion,C.ImgPrincipal AS imgPrincipal,C.SegundaImg AS segundaImg,C.TerceraImg AS terceraImg,C.CuartaImg AS cuartaImg FROM Escuderias E JOIN Coches C ON C.idEscuderia = E.idEscuderia WHERE E.idEscuderia = ?;",
      [id]
    );

    return datosPerfil;
  }
}
