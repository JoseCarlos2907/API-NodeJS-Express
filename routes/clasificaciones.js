import { Router } from "express";
import { ClasificacionController } from "../controllers/clasificaciones";

export const createClasificacionRouter = ({ clasificacionModel }) => {
  const clasificacionesRouter = Router();

  const clasificacionController = new ClasificacionController({
    clasificacionModel: clasificacionModel,
  });

  clasificacionesRouter.get("/", clasificacionController.getAll);
  clasificacionesRouter.get("/:id", clasificacionController.getById);
  clasificacionesRouter.get("/:id/carrera", clasificacionController.getCarrera);

  return clasificacionesRouter;
};
