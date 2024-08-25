import mysql from "mysql2/promise";
import { configBD } from "../configBD.js";

const connection = await mysql.createConnection(configBD);

export class ResultadoClasificacionModel {
  static async getByIdClasificacion({ idClasificacion }) {
    const [resultados] = await connection.query(
      "SELECT * FROM Pilotos_Corren_Clasificacion WHERE idClasificacion = ?;",
      [idClasificacion]
    );
    return resultados;
  }
  static async getByIdPiloto({ idClasificacion, idPiloto }) {
    const [resultado] = await connection.query(
      "SELECT * FROM Pilotos_Corren_Clasificacion WHERE idClasificacion = ? AND idPiloto = ?;",
      [idClasificacion, idPiloto]
    );
    return resultado;
  }
  static async getTopByIdCarrera({ idCarrera }) {
    const [fechaYHora] = await connection.query(
      "SELECT C.HoraInicio AS hora, C.Fecha AS fecha FROM Clasificaciones AS C JOIN Carreras Car ON Car.idCarrera = C.idCarrera WHERE C.idCarrera = ?;",
      [idCarrera]
    );

    const [resultados] = await connection.query(
      "SELECT P.Nombre AS nombre, P.Apellido AS apellido, PCC.PosicionFinal AS posicionFinal, PCC.TiempoVueltaMasRapida AS tiempo FROM Pilotos_Corren_Clasificacion PCC JOIN Pilotos P ON P.idPiloto = PCC.idPiloto JOIN Clasificaciones C ON PCC.idClasificacion = C.idClasificacion WHERE C.idCarrera = ? AND PCC.PosicionFinal <> 0 ORDER BY CAST(PCC.PosicionFinal AS UNSIGNED) LIMIT 3;",
      [idCarrera]
    );

    const resultadosFinal = {
      fecha: fechaYHora.fecha,
      hora: fechaYHora.hora,
      tiempos: [],
    };

    resultados.forEach((resultado) => resultadosFinal.tiempos.push(resultado));

    return resultadosFinal;
  }
}
