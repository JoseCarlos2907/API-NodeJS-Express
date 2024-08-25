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
    const resultado = await this.resultadoCarreraModel.getByIdPiloto({
      idCarrera,
      idPiloto,
    });

    if (resultado) return res.json(resultado);
    return res.status(404).json({ msg: "Resultado de carrera no encontrado" });
  };

  getTopPilotos = async (req, res) => {
    const { id } = req.param;
    const resultados = await this.resultadoCarreraModel.getTopPilotos({ id });
    return res.json(resultados);
  };
}
