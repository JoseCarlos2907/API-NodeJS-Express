import { Router } from "express";
import { CarreraController } from "../controllers/carreras.js";

export const createCarreraRouter = ({ carreraModel }) => {
  const carrerasRouter = Router();

  const carreraController = new CarreraController({
    carreraModel: carreraModel,
  });

  carrerasRouter.get("/lista-carreras", carreraController.getListaCarreras);
  carrerasRouter.get("/fechas", carreraController.getAllFechas);
  carrerasRouter.get("/", carreraController.getAll);
  carrerasRouter.get("/:id", carreraController.getById);
  carrerasRouter.get("/:id/comentarios", carreraController.getComentarios);
  carrerasRouter.get("/:id/libres", carreraController.getLibres);
  carrerasRouter.get("/:id/clasificacion", carreraController.getClasificacion);
  carrerasRouter.get("/:id/circuito", carreraController.getCircuito);
  carrerasRouter.post("/:id", carreraController.comentarCarrera);

  return carrerasRouter;
};
