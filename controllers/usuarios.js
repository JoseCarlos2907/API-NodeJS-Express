import { validatePartialUsuario, validateUsuario } from "../schemas/usuarios";
import { UsuarioModel } from "../models/usuarios";

export class UsuarioController {
  constructor({ usuarioModel }) {
    this.usuarioModel = usuarioModel;
  }

  getAll = async (req, res) => {
    const usuarios = await UsuarioModel.getAll();
    res.json(usuarios);
  };

  getById = async (req, res) => {
    const { id } = req.params;
    const usuario = await UsuarioModel.getById({ id });
    if (usuario) return res.json(usuario);
    res.status(404).json({ message: "Usuario not found" });
  };

  getByEmail = async (req, res) => {
    const { email } = req.params;
    const usuario = await UsuarioModel.getByEmail({ email });
    if (usuario) return res.json(usuario);
    res.status(404).json({ message: "Usuario not found" });
  };

  registrar = async (req, res) => {
    const result = validateUsuario(req.body);

    if (!result.success)
      // 400 Bad Request ó 422 Unprocessable Entity
      return res.status(400).json({ error: JSON.parse(result.error.message) });

    const usuario = await UsuarioModel.create({ input: result.data });

    res.status(201).json(usuario); // Actualizar la caché del cliente
  };

  delete = async (req, res) => {
    const { id } = req.params;

    const result = await UsuarioModel.delete({ id });

    if (result === false)
      return res.status(404).json({ error: "Movie not found" });

    return res.json({
      message: "Movie deleted",
    });
  };

  cambiarDatosPrincipales = async (req, res) => {};

  cambiarDatosPrincipales = async (req, res) => {};
}
