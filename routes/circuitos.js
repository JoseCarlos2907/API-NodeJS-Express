import { Router } from "express";
import { CircuitoController } from "../controllers/circuitos.js";

export const createCircuitoRouter = ({ circuitoModel }) => {
  const circuitosRouter = Router();

  const circuitoController = new CircuitoController({
    circuitoModel: circuitoModel,
  });

  circuitosRouter.get("/", circuitoController.getAll);
  circuitosRouter.get("/:id", circuitoController.getById);
  circuitosRouter.get("/:id/pais", circuitoController.getPais);

  return circuitosRouter;
};
