import {
  validatePCCL,
  validatePartialPCCL,
} from "../schemas/pilotos_corren_clasificacion.js";

export class ResultadoClasificacionController {
  constructor({ rClasificacionModel }) {
    this.rClasificacionModel = rClasificacionModel;
  }

  getByIdClasificacion = async (req, res) => {
    const { idClasificacion } = req.params;
    const resultados = this.rClasificacionModel.getByIdClasificacion({
      idClasificacion,
    });

    return res.json(resultados);
  };

  getByIdPiloto = async (req, res) => {
    const { idClasificacion, idPiloto } = req.params;
    const resultado = this.rClasificacionModel.getByIdPiloto({
      idClasificacion,
      idPiloto,
    });

    if (resultado) return res.json(resultado);
    return res
      .status(404)
      .json({ msg: "Resultado de clasificación no encontrado" });
  };

  getTopByIdCarrera = async (req, res) => {
    const { idCarrera } = req.params;
    const resultados = this.rClasificacionModel.getTopByIdCarrera({
      idCarrera,
    });

    return res.json(resultados);
  };
}
