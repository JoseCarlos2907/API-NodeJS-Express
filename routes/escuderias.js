import { Router } from "express";
import { EscuderiaController } from "../controllers/escuderias.js";

export const createEscuderiaRouter = ({ escuderiaModel }) => {
  const escuderiasRouter = Router();

  const escuderiaController = new EscuderiaController({
    escuderiaModel: escuderiaModel,
  });

  escuderiasRouter.get("/", escuderiaController.getAll);
  escuderiasRouter.get("/:id", escuderiaController.getById);
  escuderiasRouter.get("/:id/pais", escuderiaController.getPais);
  escuderiasRouter.get("/:id/coche", escuderiaController.getCoche);
  escuderiasRouter.get(
    "/datos-clasificacion-oficial",
    escuderiaController.getDatosClasificacionOficial
  );
  escuderiasRouter.get("/:id/datos-perfil", escuderiaController.getDatosPerfil);

  return escuderiasRouter;
};
