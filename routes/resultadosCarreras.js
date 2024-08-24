import { Router } from "express";
import { ResultadoCarreraController } from "../controllers/resultadosCarreras";

export const createRCarrerasRouter = ({ resultadoCarreraModel }) => {
  const rCarrerasRouter = Router();

  const rCarreraController = new ResultadoCarreraController({
    resultadoCarreraModel: resultadoCarreraModel,
  });

  rCarrerasRouter.get("/:id", rCarreraController.getByIdCarrera);
  rCarrerasRouter.get(
    "/:idCarrera/piloto/:idPiloto",
    rCarreraController.getByIdPiloto
  );
  rCarrerasRouter.get("/:id/top", rCarreraController.getTopPilotos);

  return rCarrerasRouter;
};
