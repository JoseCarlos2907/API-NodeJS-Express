import {
  validateEscuderia,
  validatePartialEscuderia,
} from "../schemas/escuderias.js";

export class EscuderiaController {
  constructor({ escuderiaModel }) {
    this.escuderiaModel = escuderiaModel;
  }

  getAll = async (req, res) => {
    const escuderias = await this.escuderiaModel.getAll();
    return res.json(escuderias);
  };

  getById = async (req, res) => {
    const { id } = req.params;
    const escuderia = await this.escuderiaModel.getById({ id });
    if (escuderia) return res.json(escuderia);
    return res.status(404).json({ msg: "Escudería no encontrada" });
  };

  getPais = async (req, res) => {
    const { id } = req.params;
    const pais = await this.escuderiaModel.getPais({ id });
    if (pais) return res.json(pais);
    return res
      .status(404)
      .json({ msg: "Escudería no encontrada, por lo que no se sabe el país" });
  };

  getCoche = async (req, res) => {
    const { id } = req.params;
    const coche = await this.escuderiaModel.getCoche({ id });
    if (coche) return res.json(coche);
    return res
      .status(404)
      .json({ msg: "Escudería no encontrada, por lo que no se sabe el coche" });
  };

  getDatosClasificacionOficial = async (req, res) => {
    const datosClasificacion =
      await this.escuderiaModel.getDatosClasificacionOficial();

    return res.json(datosClasificacion);
  };

  getDatosPerfil = async (req, res) => {
    const { id } = req.params;
    const datosPerfil = await this.escuderiaModel.getDatosPerfil({ id });
    if (datosPerfil) return res.json(datosPerfil);
    return res.status(404).json({ msg: "Escudería no encontrada" });
  };
}
