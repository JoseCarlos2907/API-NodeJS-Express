export class BusquedaController {
  constructor({ busquedaModel }) {
    this.busquedaModel = busquedaModel;
  }

  buscar = async (req, res) => {
    const { cadena } = req.body;
    const resultadoBusqueda = await this.busquedaModel.buscar({ cadena: cadena });
    return res.json(resultadoBusqueda);
  };
}
