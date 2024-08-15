import { Router } from "express";
import { CocheController } from "../controllers/coches.js";

export const createCocheRouter = ({ cocheModel }) => {
  const cochesRouter = Router();

  const cocheController = new CocheController({ cocheModel: cocheModel });

  cochesRouter.get("/", cocheController.getAll);
  cochesRouter.get("/:id", cocheController.getById);
  cochesRouter.get("/:id/escuderia", cocheController.getEscuderia);

  return cochesRouter;
};
