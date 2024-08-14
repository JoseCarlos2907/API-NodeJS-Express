import {
  validateClasificacion,
  validatePartialClasificacion,
} from "../schemas/clasificaciones.js";

export class ClasificacionController {
  constructor({ clasificacionModel }) {
    this.clasificacionModel = clasificacionModel;
  }

  getAll = async (req, res) => {
    const clasificaciones = await this.clasificacionModel.getAll();
    return res.json(clasificaciones);
  };

  getById = async (req, res) => {
    const { id } = req.params;
    const clasificacion = await this.clasificacionModel.getById({ id });
    if (clasificacion) return res.json(clasificacion);
    return res.status(404).json({ msg: "Clasificación no encontrada" });
  };

  getCarrera = async (req, res) => {
    const { id } = req.params;
    const carrera = await this.clasificacionModel.getById({ id });
    if (carrera) return res.json(carrera);
    return res.status(404).json({
      msg: "Clasificación no encontrada, por lo que no se sabe la carrera",
    });
  };
}
