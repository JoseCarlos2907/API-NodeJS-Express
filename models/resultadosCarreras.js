import mysql from "mysql2/promise";
import { configBD } from "../configBD.js";

const connection = await mysql.createConnection(configBD);

export class ResultadoCarreraModel {
  static async getByIdCarrera({ idCarrera }) {
    const [resultados] = await connection.query(
      "SELECT idPiloto, idCarrera, TiempoTotalEnCarrera AS tiempoTotalEnCarrera, PosicionFinal AS posicionFinal FROM Pilotos_Corren_Carreras WHERE idCarrera = ?;",
      [idCarrera]
    );

    return resultados;
  }

  static async getByIdPiloto({ idCarrera, idPiloto }) {
    const [resultados] = await connection.query(
      "SELECT * FROM Pilotos_Corren_Carreras WHERE idCarrera = ? AND idPiloto = ?;",
      [idCarrera, idPiloto]
    );

    return resultados;
  }

  static async getTopPilotos({ idCarrera }) {
    const [fechaYHora] = await connection.query(
      "SELECT C.HoraInicio AS hora, C.Fecha AS fecha FROM Carreras AS C WHERE C.idCarrera = ?;",
      [idCarrera]
    );

    const [resultados] = await connection.query(
      "SELECT P.Nombre AS nombre, P.Apellido AS apellido, PCC.PosicionFinal AS posicionFinal, PCC.TiempoTotalEnCarrera AS tiempo FROM Pilotos_Corren_Carreras PCC JOIN Pilotos P ON P.idPiloto = PCC.idPiloto WHERE PCC.idCarrera = ? AND PCC.PosicionFinal != 0 ORDER BY CAST(PCC.PosicionFinal AS UNSIGNED) LIMIT 3",
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
