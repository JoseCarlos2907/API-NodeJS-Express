import { Router } from "express";
import { ResultadoClasificacionController } from "../controllers/resultadosClasificaciones.js";

export const createRClasificacionesRouter = ({
  resultadoClasificacionModel,
}) => {
  const rClasificacionesRouter = Router();

  const rClasificacionController = new ResultadoClasificacionController({
    rClasificacionModel: resultadoClasificacionModel,
  });

  rClasificacionesRouter.get(
    "/:idClasificacion",
    rClasificacionController.getByIdClasificacion
  );
  rClasificacionesRouter.get(
    "/:idClasificacion/piloto/:idPiloto",
    rClasificacionController.getByIdPiloto
  );
  rClasificacionesRouter.get(
    "/:idCarrera/top",
    rClasificacionController.getTopByIdCarrera
  );

  return rClasificacionesRouter;
};
