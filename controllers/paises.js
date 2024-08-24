import { validatePais, validatePartialPais } from "../schemas/paises.js";

export class PaisController {
  constructor({ paisModel }) {
    this.paisModel = paisModel;
  }

  getAll = async (req, res) => {
    const paises = await this.paisModel.getAll();
    res.json(paises);
  };

  getById = async (req, res) => {
    const { id } = req.params;
    const pais = await this.paisModel.getById({ id });
    if (pais) return res.json(pais);
    return res.status(404).json({ msg: "País no encontrado" });
  };
}
