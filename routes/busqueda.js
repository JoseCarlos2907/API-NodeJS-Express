import { Router } from "express";
import { BusquedaController } from "../controllers/busqueda.js";

export const createBusquedaRouter = ({ busquedaModel }) => {
  const busquedaRouter = Router();

  const busquedaController = new BusquedaController({
    busquedaModel: busquedaModel,
  });

  busquedaRouter.post("/", busquedaController.buscar);

  return busquedaRouter;
};
