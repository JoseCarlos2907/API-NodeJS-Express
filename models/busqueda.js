import mysql from "mysql2/promise";
import { configBD } from "../configBD.js";

const connection = await mysql.createConnection(configBD);

export class BusquedaModel {
  static async buscar({ cadena }) {
    let cantidad;
    let resultadosBusqueda = [];

    const [pilotos] = await connection.query(
      `SELECT idPiloto, ImgPerfil AS imgPerfil, Nombre AS nombre, Apellido AS apellido, FechaNac AS fechaNac, Peso AS peso, Altura AS altura, Numero AS numero, Puntuacion AS puntuacion FROM Pilotos WHERE Nombre LIKE '%${cadena}%' OR Apellido LIKE '%${cadena}%' ORDER BY Nombre ASC, Apellido ASC LIMIT 5`
    );

    pilotos.forEach((piloto) => {
      resultadosBusqueda.push({
        idPiloto: piloto.idPiloto,
        imgPerfil: piloto.imgPerfil,
        nombre: piloto.nombre,
        apellido: piloto.apellido,
        fechaNac: piloto.fechaNac,
        peso: piloto.peso,
        altura: piloto.altura,
        numero: piloto.numero,
        puntuacion: piloto.puntuacion,
        tipo: "piloto",
      });
    });

    if (resultadosBusqueda.length < 5) {
      cantidad = 5 - resultadosBusqueda.length;

      const [escuderias] = await connection.query(
        `SELECT idEscuderia, ImgLogo AS imgLogo, ImgEscuderia AS imgEscuderia, Nombre AS nombre, Descripcion AS descripcion, Puntuacion AS puntuacion FROM Escuderias WHERE Nombre LIKE '%${cadena}%' ORDER BY Nombre ASC LIMIT ${cantidad}`
      );

      escuderias.forEach((escuderia) => {
        resultadosBusqueda.push({
          idEscuderia: escuderia.idEscuderia,
          imgLogo: escuderia.imgLogo,
          imgEscuderia: escuderia.imgEscuderia,
          nombre: escuderia.nombre,
          descripcion: escuderia.descripcion,
          puntuacion: escuderia.puntuacion,
          tipo: "escuderia",
        });
      });
    }

    if (resultadosBusqueda.length < 5) {
      cantidad = 5 - resultadosBusqueda.length;

      const [usuarios] = await connection.query(
        `SELECT idUsuario, ImgPerfil AS imgPerfil, Nombre AS nombre, Apellidos AS apellidos, FechaNac AS fechaNac, NombreUsuario AS nombreUsuario, Correo AS correo, Rol AS rol, TemaSeleccionado AS temaSeleccionado FROM Usuarios WHERE Nombre LIKE '%${cadena}%' OR Apellidos LIKE '%${cadena}%' OR NombreUsuario LIKE '%${cadena}%' ORDER BY Nombre ASC, Apellidos ASC, NombreUsuario ASC LIMIT ${cantidad}`
      );

      usuarios.forEach((usuario) => {
        resultadosBusqueda.push({
          idUsuario: usuario.idUsuario,
          imgPerfil: usuario.imgPerfil,
          nombre: usuario.nombre,
          apellidos: usuario.apellidos,
          fechaNac: usuario.fechaNac,
          nombreUsuario: usuario.nombreUsuario,
          correo: usuario.correo,
          rol: usuario.rol,
          temaSeleccionado: usuario.temaSeleccionado,
          tipo: "usuario",
        });
      });
    }

    return resultadosBusqueda;
  }
}
