export class PilotoController {
  constructor({ pilotoModel }) {
    this.pilotoModel = pilotoModel;
  }

  getAll = async (req, res) => {
    const pilotos = await this.pilotoModel.getAll();
    return res.json(pilotos);
  };

  getById = async (req, res) => {
    const { id } = req.params;
    const piloto = await this.pilotoModel.getById({ id });
    if (piloto) return res.json(piloto);
    res.status(404).json({ msg: "Piloto no encontrado" });
  };

  getPais = async (req, res) => {
    const { id } = req.params;
    const pais = await this.pilotoModel.getPais({ id });
    if (pais) return res.json(pais);
    res
      .status(404)
      .json({ msg: "Piloto no encontrado, por lo que no se sabe su país" });
  };

  getCoche = async (req, res) => {
    const { id } = req.params;
    const coche = await this.pilotoModel.getCoche({ id });
    if (coche) return res.json(coche);
    res
      .status(404)
      .json({ msg: "Piloto no encontrado, por lo que no se sabe su coche" });
  };

  getUsuariosSeguidores = async (req, res) => {
    const { id } = req.params;
    const seguidores = await this.pilotoModel.getUsuariosSeguidores({ id });
    if (seguidores) return res.json(seguidores);
    res.status(404).json({
      msg: "Piloto no encontrado, por lo que no se saben sus seguidores",
    });
  };

  getComentarios = async (req, res) => {
    const { id } = req.params;
    const coche = await this.pilotoModel.getComentarios({ id });
    if (coche) return res.json(coche);
    res.status(404).json({
      msg: "Piloto no encontrado, por lo que no se saben los comentarios en los que aparece",
    });
  };

  getDatosClasificacion = async (req, res) => {
    const datosClasificacion = await this.pilotoModel.getDatosClasificacion();
    return res.json(datosClasificacion);
  };

  getDatosClasificacionComunidad = async (req, res) => {
    const datosClasificacionComunidad =
      await this.pilotoModel.getDatosClasificacionComunidad();
    return res.json(datosClasificacionComunidad);
  };

  getPuntuaciones = async (req, res) => {
    const { id } = req.params;
    const puntuaciones = await this.pilotoModel.getPuntuaciones({ id });
    if (puntuaciones) return res.json(puntuaciones);
    res.status(404).json({
      msg: "Piloto no encontrado, por lo que no se saben sus puntuaciones",
    });
  };

  getDatosPerfil = async (req, res) => {
    const { id } = req.params;
    const datosPerfil = await this.pilotoModel.getDatosPerfil({ id });
    if (datosPerfil) return res.json(datosPerfil);
    res.status(404).json({
      msg: "Piloto no encontrado, por lo que no se saben los datos del perfil",
    });
  };

  seguirPiloto = async (req, res) => {
    const result = req.body;

    if (!result.success)
      return res.status(400).json({ error: JSON.parse(result.error.message) });

    const { idUsuario, idPiloto } = result.data;

    const datosPerfil = await this.pilotoModel.seguirPiloto({
      idUsuario,
      idPiloto,
    });
    if (datosPerfil)
      return res.json({ msg: "Solicitud de seguimiento aceptada" });
    res.status(404).json({
      msg: "Error al seguir el piloto",
    });
  };

  dejarDeSeguirPiloto = async (req, res) => {
    const result = req.body;

    if (!result.success)
      return res.status(400).json({ error: JSON.parse(result.error.message) });

    const { idUsuario, idPiloto } = result.data;

    await this.pilotoModel.dejarDeSeguirPiloto({ idUsuario, idPiloto });
    return res.json({ msg: "Solicitud de cancelar seguimiento aceptada" });
  };
}
