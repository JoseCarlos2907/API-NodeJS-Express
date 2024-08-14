import mysql from "mysql2/promise";
import { configBD } from "../configBD.js";

const connection = await mysql.createConnection(configBD);

export class ClasificacionModel {
  static async getAll() {
    const [clasificaciones] = await connection.query(
      "SELECT idClasificacion, Fecha AS fecha, HoraInicio AS horaInicio, Estado AS estado, idCarrera FROM Clasificaciones;"
    );

    return clasificaciones;
  }

  static async getById({ id }) {
    const [clasificacion] = await connection.query(
      "SELECT idClasificacion, Fecha AS fecha, HoraInicio AS horaInicio, Estado AS estado, idCarrera FROM Clasificaciones WHERE idClasificacion = ?;",
      [id]
    );

    return clasificacion;
  }

  static async getCarrera({ id }) {
    const [carrera] = await connection.query(
      "SELECT * FROM Carreras WHERE idCarrera = (SELECT idCarrera FROM Clasificaciones WHERE idClasificacion = ?);",
      [id]
    );

    return carrera;
  }
}
