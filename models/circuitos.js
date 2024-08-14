import mysql from "mysql2/promise";
import { configBD } from "../configBD.js";

const connection = await mysql.createConnection(configBD);

export class CircuitoModel {
  static async getAll() {
    const [circuitos] = await connection.query(
      "SELECT idCircuito, ImgCircuito AS imgCircuito, Nombre AS nombre, Longitud AS longitud, Tipo AS tipo, idPais FROM circuitos;"
    );

    return circuitos;
  }

  static async getById({ id }) {
    const [circuito] = await connection.query(
      "SELECT idCircuito, ImgCircuito AS imgCircuito, Nombre AS nombre, Longitud AS longitud, Tipo AS tipo, idPais FROM circuitos WHERE idCircuito = ?;",
      [id]
    );

    return circuito;
  }

  static async getPais({ id }) {
    const [pais] = await connection.query(
      "SELECT idPais, Nombre AS nombre, CountryCode AS countryCode FROM Paises WHERE IdPais = (SELECT IdPais FROM Circuitos WHERE idCircuito = ?);",
      [id]
    );

    return pais;
  }
}
