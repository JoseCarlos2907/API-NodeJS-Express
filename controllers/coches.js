import { validateCoche, validatePartialCoche } from "../schemas/coches.js";

export class CocheController {
  constructor({ cocheModel }) {
    this.cocheModel = cocheModel;
  }

  getAll = async (req, res) => {
    const coches = await this.cocheModel.getAll();
    return res.json(coches);
  };

  getById = async (req, res) => {
    const { id } = req.params;
    const coche = await this.cocheModel.getById({ id });
    if (coche) return res.json(coche);
    return res.staus(404).json({ msg: "Coche no encontrado" });
  };

  getEscuderia = async (req, res) => {
    const { id } = req.params;
    const escuderia = await this.cocheModel.getEscuderia({ id });
    if (escuderia) return res.json(escuderia);
    return res
      .staus(404)
      .json({ msg: "Coche no encontrado, por lo que no se sabe la escudería" });
  };
}
