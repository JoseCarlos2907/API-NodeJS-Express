import {
  validatePCCA,
  validatePartialPCCA,
} from "../schemas/pilotos_corren_carreras.js";

export class ResultadoCarreraController {
  constructor({ resultadoCarreraModel }) {
    this.resultadoCarreraModel = resultadoCarreraModel;
  }

  getByIdCarrera = async (req, res) => {
    const { id } = req.param;
    const resultados = await this.resultadoCarreraModel.getByIdCarrera({ id });
    return res.json(resultados);
  };

  getByIdPiloto = async (req, res) => {
    const { idCarrera, idPiloto } = req.param;
    const resultados = await this.resultadoCarreraModel.getByIdPiloto({
      idCarrera,
      idPiloto,
    });
    return res.json(resultados);
  };

  getTopPilotos = async (req, res) => {
    const { id } = req.param;
    const resultados = await this.resultadoCarreraModel.getTopPilotos({ id });
    return res.json(resultados);
  };
}
