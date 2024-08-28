import { Router } from "express";
import { PilotoController } from "../controllers/pilotos.js";

export const createPilotoRouter = ({ pilotoModel }) => {
  const pilotosRouter = Router();

  const pilotoController = new PilotoController({ pilotoModel: pilotoModel });

  pilotosRouter.get("/", pilotoController.getAll);
  pilotosRouter.get("/:id", pilotoController.getById);
  pilotosRouter.get("/:id/pais", pilotoController.getPais);
  pilotosRouter.get("/:id/coche", pilotoController.getCoche);
  pilotosRouter.get(
    "/:id/usuarios-seguidores",
    pilotoController.getUsuariosSeguidores
  );
  pilotosRouter.get("/:id/comentarios", pilotoController.getComentarios);
  pilotosRouter.get(
    "/datos-clasificacion-oficial",
    pilotoController.getDatosClasificacion
  );
  pilotosRouter.get(
    "/datos-clasificacion-comunidad",
    pilotoController.getDatosClasificacionComunidad
  );
  pilotosRouter.get("/:id/puntuaciones", pilotoController.getPuntuaciones);
  pilotosRouter.get("/:id/datos-perfil", pilotoController.getDatosPerfil);
  pilotosRouter.post("/seguir", pilotoController.seguirPiloto);
  pilotosRouter.post("/no-seguir", pilotoController.dejarDeSeguirPiloto);

  return pilotosRouter;
};
