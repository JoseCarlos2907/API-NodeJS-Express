import {
  validateCarrera,
  validatePartialCarrera,
} from "../schemas/carreras.js";

export class CarreraController {
  constructor({ carreraModel }) {
    this.carreraModel = carreraModel;
  }

  getAll = async (req, res) => {
    const carreras = await this.carreraModel.getAll();
    return res.json(carreras);
  };

  getById = async (req, res) => {
    const { id } = req.params;
    const carrera = await this.carreraModel.getById({ id });

    if (typeof carrera === "string")
      return res.status(404).json({ msg: carrera });

    return res.json(carrera);
  };

  getComentarios = async (req, res) => {
    const { id } = req.params;
    const comentarios = await this.carreraModel.getComentarios({ id });

    if (typeof comentarios === "string")
      return res.status(404).json({ msg: comentarios });

    return res.json(comentarios);
  };

  getLibres = async (req, res) => {
    const { id } = req.params;
    const libres = await this.carreraModel.getLibres({ id });

    if (typeof libres === "string")
      return res.status(404).json({ msg: libres });

    return res.json(libres);
  };

  getClasificacion = async (req, res) => {
    const { id } = req.params;
    const clasificacion = await this.carreraModel.getClasificacion({ id });

    if (typeof clasificacion === "string")
      return res.status(404).json({ msg: clasificacion });

    return res.json(clasificacion);
  };

  getCircuito = async (req, res) => {
    const { id } = req.params;
    const circuito = await this.carreraModel.getCircuito({ id });

    if (typeof circuito === "string")
      return res.status(404).json({ msg: circuito });

    return res.json(circuito);
  };

  getAllFechas = async (req, res) => {
    const fechas = await this.carreraModel.getAllFechas();

    let fechasFinales = [];
    fechas.forEach((fecha) => {
      fechasFinales.push(fecha["Fecha"]);
    });

    return res.json(fechasFinales);
  };

  getListaCarreras = async (req, res) => {
    const carreras = await this.carreraModel.getListaCarreras();

    let carrerasFinales = [];
    carreras.forEach((carrera) => {
      carrerasFinales.push(carrera);
    });

    return res.json(carrerasFinales);
  };

  comentarCarrera = async (req, res) => {
    const { idCarrera } = req.params;
    const { idUsuario, idPiloto, comentario } = req.body;

    const result = await this.carreraModel.comentarCarrera({
      idCarrera,
      idUsuario,
      idPiloto,
      comentario,
    });

    if (result === "Comentario publicado") {
      return res.status(201).json({ msg: result });
    } else {
      return res.status(400).json({ msg: result });
    }
  };
}
