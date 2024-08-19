import mysql from "mysql2/promise";
import { configBD } from "../configBD.js";

const connection = await mysql.createConnection(configBD);

export class LibreModel {
  static async getAll() {
    const [libres] = await connection.query(
      "SELECT idLibre, NumeroLibre AS numeroLibre, Fecha AS fecha, HoraInicio AS horaInicio, Estado AS estado, idCarrera FROM Libres;"
    );

    return libres;
  }

  static async getById({ id }) {
    const [libres] = await connection.query(
      "SELECT idLibre, NumeroLibre AS numeroLibre, Fecha AS fecha, HoraInicio AS horaInicio, Estado AS estado, idCarrera FROM Libres WHERE idLibre = ?;",
      [id]
    );

    return libres;
  }

  static async getCarrera({ id }) {
    const [libres] = await connection.query(
      "SELECT * FROM Carreras WHERE idCarrera = (SELECT idCarrera FROM Libres WHERE idLibre = ?);",
      [id]
    );

    return libres;
  }
}
