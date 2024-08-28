import { Router } from "express";
import { PilotoController } from "../controllers/pilotos.js";

export const createPilotoRouter = ({pilotoModel}) => {
    const pilotosRouter = Router();

    const pilotoController = new PilotoController({pilotoModel: pilotoModel});

    

    return pilotosRouter;
};
