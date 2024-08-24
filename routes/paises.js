import { Router } from "express";
import { PaisController } from "../controllers/paises";

export const createPaisRouter = ({ paisModel }) => {
  const paisesRouter = Router();

  const paisController = new PaisController({ paisModel: paisModel });

  paisesRouter.get("/", paisController.getAll);
  paisesRouter.get("/:id", paisController.getById);

  return paisesRouter;
};
