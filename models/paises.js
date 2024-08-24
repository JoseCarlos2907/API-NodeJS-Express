import mysql from "mysql2/promise";
import { configBD } from "../configBD.js";

const connection = await mysql.createConnection(configBD);

export class PaisModel {
  static async getAll() {
    const [paises] = await connection.query(
      "SELECT idPais, Nombre AS nombre, CountryCode AS countryCode FROM Paises;"
    );
    return paises;
  }
  static async getById({ id }) {
    const [pais] = await connection.query(
      "SELECT idPais, Nombre AS nombre, CountryCode AS countryCode FROM Paises WHERE idPais = ?;",
      [id]
    );
    return pais;
  }
}
