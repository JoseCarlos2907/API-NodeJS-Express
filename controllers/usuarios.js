import {
  validatePartialUsuario,
  validateUsuario,
} from "../schemas/usuarios.js";

export class UsuarioController {
  constructor({ usuarioModel }) {
    this.usuarioModel = usuarioModel;
  }

  getAll = async (req, res) => {
    const usuarios = await this.usuarioModel.getAll();
    res.json(usuarios);
  };

  getById = async (req, res) => {
    const { id } = req.params;
    const usuario = await this.usuarioModel.getById({ id });
    if (usuario) return res.json(usuario);
    res.status(404).json({ message: "Usuario not found" });
  };

  getByEmail = async (req, res) => {
    const { correo } = req.body;
    const usuario = await this.usuarioModel.getByEmail({ correo });
    if (usuario) return res.json(usuario);
    res.status(404).json({ message: "Usuario not found" });
  };

  registrar = async (req, res) => {
    const result = validateUsuario(req.body);

    if (!result.success)
      // 400 Bad Request ó 422 Unprocessable Entity
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    const usuario = await this.usuarioModel.registrar({ usuario: result.data });

    res.status(201).json(usuario); // Actualizar la caché del cliente
  };

  delete = async (req, res) => {
    const { id } = req.params;

    const result = await this.usuarioModel.delete({ id });

    return res.json({ result });
  };

  cambiarDatosPrincipales = async (req, res) => {
    const result = validatePartialUsuario(req.body);

    if (!result.success)
      return res.status(400).json({ error: JSON.parse(result.error.message) });

    const { correo, nombreUsuario, nombre, apellidos, imgPerfil } = result.data;

    const usuario = await this.usuarioModel.cambiarDatosPrincipales({
      correo,
      nombreUsuario,
      nombre,
      apellidos,
      imgPerfil,
    });

    res.status(201).json(usuario);
  };

  cambiarTemaSeleccionado = async (req, res) => {
    const result = validatePartialUsuario(req.body);

    if (!result.success)
      return res.status(400).json({ error: JSON.parse(result.error.message) });

    const { correo, temaSeleccionado } = result.data;

    const usuario = await this.usuarioModel.cambiarTemaSeleccionado({
      correo,
      temaSeleccionado,
    });

    res.status(201).json(usuario);
  };
}
