import { Router } from "express";
import { ResultadoLibreController } from "../controllers/resultadosLibres.js";

export const createRLibresRouter = ({ resultadoLibreModel }) => {
  const rLibresRouter = Router();

  const rLibreController = new ResultadoLibreController({
    rLibreModel: resultadoLibreModel,
  });

  rLibresRouter.get("/:idLibre", rLibreController.getByIdLibre);
  rLibresRouter.get(
    "/:idLibre/piloto/:idPiloto",
    rLibreController.getByIdPiloto
  );
  rLibresRouter.get("/:idCarrera/top", rLibreController.getTopByIdCarrera);

  return rLibresRouter;
};
