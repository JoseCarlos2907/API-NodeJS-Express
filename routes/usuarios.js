import { Router } from "express";
import { UsuarioController } from "../controllers/usuarios.js";

export const createUsuarioRouter = ({ usuarioModel }) => {
  const usuariosRouter = Router();

  const usuarioController = new UsuarioController({
    usuarioModel: usuarioModel,
  });

  usuariosRouter.get("/", usuarioController.getAll);
  usuariosRouter.get("/:id", usuarioController.getById);
  usuariosRouter.post("/gbe", usuarioController.getByEmail);
  usuariosRouter.post("/", usuarioController.registrar);
  usuariosRouter.delete("/:id", usuarioController.delete);
  usuariosRouter.patch(
    "/cambiar-datos-principales",
    usuarioController.cambiarDatosPrincipales
  );
  usuariosRouter.patch(
    "/cambiar-tema-seleccionado",
    usuarioController.cambiarTemaSeleccionado
  );

  return usuariosRouter;
};
