import { Router } from "express";
import { LibreController } from "../controllers/libres.js";

export const createLibreRouter = ({ libreModel }) => {
  const libresRouter = Router();

  const libreController = new LibreController({ libreModel: libreModel });

  libresRouter.get("/", libreController.getAll);
  libresRouter.get("/:id", libreController.getById);
  libresRouter.get("/:id/carrera", libreController.getCarrera);

  return libresRouter;
};
