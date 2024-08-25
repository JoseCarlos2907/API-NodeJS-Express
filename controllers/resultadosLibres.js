import {
  validatePCL,
  validatePartialPCL,
} from "../schemas/pilotos_corren_libres.js";

export class ResultadoLibreController {
  constructor({ rLibreModel }) {
    this.rLibreModel = rLibreModel;
  }

  getByIdLibre = async (req, res) => {
    const { idLibre } = req.params;
    const resultados = await this.rLibreModel.getByIdLibre({ idLibre });
    return res.json(resultados);
  };

  getByIdPiloto = async (req, res) => {
    const { idLibre, idPiloto } = req.params;
    const resultado = await this.rLibreModel.getByIdPiloto({
      idLibre,
      idPiloto,
    });
    if (resultado) return res.json(resultado);
    return res.status(404).json({ msg: "Resultado de libre no encontrado" });
  };

  getTopByIdCarrera = async (req, res) => {
    const { idCarrera } = req.params;
    const resultados = await this.rLibreModel.getTopByIdCarrera({ idCarrera });
    return res.json(resultados);
  };
}
