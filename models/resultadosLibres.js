import mysql from "mysql2/promise";
import { configBD } from "../configBD.js";

const connection = await mysql.createConnection(configBD);

export class ResultadoLibreModel {
  static async getByIdLibre({ idLibre }) {
    const [resultados] = await connection.query(
      "SELECT NumeroLibre FROM Libres WHERE idLibre = ?;",
      [idLibre]
    );
    return resultados;
  }
  static async getByIdPiloto({ idLibre, idPiloto }) {
    const [resultado] = await connection.query(
      "SELECT NumeroLibre FROM Libres WHERE idLibre = ?;",
      [idLibre, idPiloto]
    );
    return resultado;
  }
  static async getTopByIdCarrera({ idCarrera }) {
    const [libres] = await connection.query(
      "SELECT L.NumeroLibre AS numero, L.Fecha AS fecha, L.HoraInicio AS hora, CASE  WHEN L.NumeroLibre = 1 THEN 'Libre - 1' WHEN L.NumeroLibre = 2 THEN 'Libre - 2' WHEN L.NumeroLibre = 3 THEN 'Libre - 3' WHEN L.NumeroLibre = 4 THEN 'Cla. Sprint' WHEN L.NumeroLibre = 5 THEN 'Sprint' ELSE 'Desconocido' END AS tipo FROM Libres L WHERE idCarrera = ?;",
      [idCarrera]
    );

    let resultadosFinales;

    libres.forEach(async (libre) => {
      let num = parseInt(libre.numero);
      const [resultados] = await connection.query(
        "SELECT PCL.PosicionFinal AS posicion, P.Nombre AS nombrePiloto, P.Apellido AS apellidoPiloto, PCL.TiempoVueltaMasRapida AS tiempo FROM Pilotos_Corren_Libres PCL JOIN Pilotos P ON P.idPiloto = PCL.idPiloto JOIN Libres L ON L.idLibre = PCL.idLibre JOIN Carreras C ON C.idCarrera = L.idCarrera WHERE C.idCarrera = ? AND L.NumeroLibre = ? AND PCL.PosicionFinal != 0 AND PCL.TiempoVueltaMasRapida != '+0 vueltas' AND PCL.TiempoVueltaMasRapida != 'DNF' ORDER BY STR_TO_DATE(PCL.TiempoVueltaMasRapida, '%i:%s:%f') LIMIT 3",
        [idCarrera, num]
      );

      let tiempos = [];

      resultados.forEach((resultado) => {
        tiempos.push({
          posicion: parseInt(resultado.posicion),
          nombrePiloto: resultado.nombrePiloto,
          apellidoPiloto: resultado.apellidoPiloto,
          tiempo: resultado.tiempo,
        });
      });

      resultadosFinales.push({
        tipo: libre.tipo,
        fecha: libre.fecha,
        hora: libre.hora,
        numeroLibre: num,
        tiempos: tiempos,
      });
    });

    return resultadosFinales;
  }
}
