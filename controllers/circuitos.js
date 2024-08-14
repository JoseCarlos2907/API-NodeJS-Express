import {
  validateCircuito,
  validatePartialCircuito,
} from "../schemas/circuitos.js";

export class CircuitoController {
  constructor({ circuitoModel }) {
    this.circuitoModel = circuitoModel;
  }

  getAll = async (req, res) => {
    const circuitos = await this.circuitoModel.getAll();
    return res.json(circuitos);
  };

  getById = async (req, res) => {
    const { id } = req.params;
    const circuito = await this.circuitoModel.getById({ id });

    if (circuito) return res.json(circuito);
    return res.status(404).json({ msg: "Circuito no encontrado" });
  };

  getPais = async (req, res) => {
    const { id } = req.params;
    const pais = await this.circuitoModel.getPais({ id });

    if (pais) return res.json(pais);
    return res
      .status(404)
      .json({ msg: "Circuito no encontrado, por lo que no se sabe el país" });
  };
}
