import { validateLibre, validatePartialLibre } from "../schemas/libres.js";

export class LibreController {
  constructor({ libreModel }) {
    this.libreModel = libreModel;
  }

  getAll = async (req, res) => {
    const libres = this.libreModel.getAll();
    return res.json(libres);
  };

  getById = async (req, res) => {
    const { id } = req.params;
    const libre = await this.libreModel.getById({ id });
    if (libre) return res.json(libre);
    return res.status(404).json({ msg: "Libre no encontrado" });
  };

  getCarrera = async (req, res) => {
    const { id } = req.params;
    const carrera = await this.libreModel.getCarrera({ id });
    if (carrera) return res.json(carrera);
    return res
      .status(404)
      .json({ msg: "Libre no encontrado, por lo que no se sabe la carrera" });
  };
}
