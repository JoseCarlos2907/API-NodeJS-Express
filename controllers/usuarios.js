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
    res.status(404).json({ msg: "Usuario not found" });
  };

  getByEmail = async (req, res) => {
    const { correo } = req.body;
    const usuario = await this.usuarioModel.getByEmail({ correo });
    if (usuario) return res.json(usuario);
    res.status(404).json({ msg: "Usuario not found" });
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

  getPaisUsuario = async (req, res) => {
    const { id } = req.params;
    const pais = await this.usuarioModel.getPaisUsuario({ id });

    if (pais) return res.json(pais);
    return res.status(401).json({ msg: "Pais no encontrado" });
  };

  getSeguidoresUsuario = async (req, res) => {
    const { id } = req.params;
    const seguidores = await this.usuarioModel.getSeguidoresUsuario({ id });

    if (typeof seguidores === "string")
      return res.status(401).json({ msg: seguidores });

    return res.json(seguidores);
  };

  getSeguidosUsuario = async (req, res) => {
    const { id } = req.params;
    const seguidos = await this.usuarioModel.getSeguidosUsuario({ id });

    if (typeof seguidos === "string")
      return res.status(401).json({ msg: seguidos });

    return res.json(seguidos);
  };

  getPilotosSeguidosUsuario = async (req, res) => {
    const { id } = req.params;
    const pilotosSeguidos = await this.usuarioModel.getPilotosSeguidosUsuario({
      id,
    });

    if (typeof pilotosSeguidos === "string")
      return res.status(401).json({ msg: pilotosSeguidos });

    return res.json(pilotosSeguidos);
  };

  getComentariosUsuario = async (req, res) => {
    const { id } = req.params;
    const pilotosSeguidos = await this.usuarioModel.getComentariosUsuario({
      id,
    });

    if (typeof pilotosSeguidos === "string")
      return res.status(401).json({ msg: pilotosSeguidos });

    return res.json(pilotosSeguidos);
  };

  seguirPilotosRegistro = async (req, res) => {
    const { correo, pilotos } = req.body;
    const idPilotos = pilotos.split(",").map((piloto) => parseInt(piloto));

    const msg = await this.usuarioModel.seguirPilotosRegistro({
      correo,
      pilotos: idPilotos,
    });

    return res.json({ msg: msg });
  };

  seguirUsuario = async (req, res) => {
    const { idUsuario1, idUsuario2 } = req.body;

    const msg = await this.usuarioModel.seguirUsuario({
      idUsuario1,
      idUsuario2,
    });
    return res.json({ msg: msg });
  };

  dejarDeSeguirUsuario = async (req, res) => {
    const { idUsuario1, idUsuario2 } = req.body;
    const msg = await this.usuarioModel.dejarDeSeguirUsuario({
      idUsuario1,
      idUsuario2,
    });
    return res.json({ msg: msg });
  };
}
