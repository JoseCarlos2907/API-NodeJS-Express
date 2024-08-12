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

  usuariosRouter.get("/:id/pais", usuarioController.getPaisUsuario);
  usuariosRouter.get("/:id/seguidores", usuarioController.getSeguidoresUsuario);
  usuariosRouter.get("/:id/seguidos", usuarioController.getSeguidosUsuario);
  usuariosRouter.get(
    "/:id/pilotos-seguidos",
    usuarioController.getPilotosSeguidosUsuario
  );
  usuariosRouter.get(
    "/:id/comentarios",
    usuarioController.getComentariosUsuario
  );
  usuariosRouter.post("/spr", usuarioController.seguirPilotosRegistro);
  usuariosRouter.post("/seguir", usuarioController.seguirUsuario);
  usuariosRouter.post("/no-seguir", usuarioController.dejarDeSeguirUsuario);

  return usuariosRouter;
};
