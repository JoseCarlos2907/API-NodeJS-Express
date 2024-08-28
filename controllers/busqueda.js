export class BusquedaController {
  constructor({ busquedaModel }) {
    this.busquedaModel = busquedaModel;
  }

  buscar = async (req, res) => {
    const { cadena } = req.body;
    const resultadoBusqueda = this.busquedaModel.buscar({ cadena });
    return res.json(resultadoBusqueda);
  };
}
