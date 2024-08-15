import mysql from "mysql2/promise";
import { configBD } from "../configBD.js";

const connection = await mysql.createConnection(configBD);

export class CocheModel {
  static async getAll() {
    const [coches] = await connection.query(
      "SELECT idCoche, Modelo AS modelo, ImgPrincipal AS imgPrincipal, SegundaImg AS segundaImg, TerceraImg AS terceraImg, CuartaImg AS cuartaImg, idEscuderia FROM Coches;"
    );

    return coches;
  }

  static async getById({ id }) {
    const [coche] = await connection.query(
      "SELECT idCoche, Modelo AS modelo, ImgPrincipal AS imgPrincipal, SegundaImg AS segundaImg, TerceraImg AS terceraImg, CuartaImg AS cuartaImg, idEscuderia FROM Coches WHERE idCoche = ?;",
      [id]
    );

    return coche;
  }

  static async getEscuderia({ id }) {
    const [escuderia] = await connection.query(
      "SELECT idEscuderia, imgLogo, imgEscuderia, Nombre AS nombre, Descripcion AS descripcion, Puntuacion AS puntuacion, idPais FROM Escuderias WHERE idEscuderia = (SELECT idEscuderia FROM Coches WHERE idCoche = ?);",
      [id]
    );

    return escuderia;
  }
}
