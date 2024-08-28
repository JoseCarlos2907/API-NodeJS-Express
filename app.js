import express, { json } from "express";
import { corsMiddleware } from "./middlewares/cors.js";

// Create routers
import { createBusquedaRouter } from "./routes/busqueda.js";
import { createCarreraRouter } from "./routes/carreras.js";
import { createCircuitoRouter } from "./routes/circuitos.js";
import { createClasificacionRouter } from "./routes/clasificaciones.js";
import { createCocheRouter } from "./routes/coches.js";
import { createEscuderiaRouter } from "./routes/escuderias.js";
import { createLibreRouter } from "./routes/libres.js";
import { createPaisRouter } from "./routes/paises.js";
import { createPilotoRouter } from "./routes/pilotos.js";
import { createRCarrerasRouter } from "./routes/resultadosCarreras.js";
import { createRClasificacionesRouter } from "./routes/resultadosClasificaciones.js";
import { createRLibresRouter } from "./routes/resultadosLibres.js";
import { createUsuarioRouter } from "./routes/usuarios.js";

// Models
import { BusquedaModel } from "./models/busqueda.js";
import { CarreraModel } from "./models/carreras.js";
import { CircuitoModel } from "./models/circuitos.js";
import { ClasificacionModel } from "./models/clasificaciones.js";
import { CocheModel } from "./models/coches.js";
import { EscuderiaModel } from "./models/escuderias.js";
import { LibreModel } from "./models/libres.js";
import { PaisModel } from "./models/paises.js";
import { PilotoModel } from "./models/pilotos.js";
import { ResultadoCarreraModel } from "./models/ResultadosCarreras.js";
import { ResultadoClasificacionModel } from "./models/resultadosClasificaciones.js";
import { ResultadoLibreModel } from "./models/resultadosLibres.js";
import { UsuarioModel } from "./models/usuarios.js";

const app = express();

app.disable("x-powered-by");
app.use(json());
app.use(corsMiddleware());

// Aqui van los app.use() de los routers de los modelos
app.use("/buscar", createBusquedaRouter({ busquedaModel: BusquedaModel }));
app.use("/carreras", createCarreraRouter({ carreraModel: CarreraModel }));
app.use("/circuitos", createCircuitoRouter({ circuitoModel: CircuitoModel }));
app.use(
  "/clasificaciones",
  createClasificacionRouter({ clasificacionModel: ClasificacionModel })
);
app.use("/coches", createCocheRouter({ cocheModel: CocheModel }));
app.use(
  "/escuderias",
  createEscuderiaRouter({ escuderiaModel: EscuderiaModel })
);
app.use("/libres", createLibreRouter({ libreModel: LibreModel }));
app.use("/paises", createPaisRouter({ paisModel: PaisModel }));
app.use("/pilotos", createPilotoRouter({ pilotoModel: PilotoModel }));
app.use(
  "/resultados-carreras",
  createRCarrerasRouter({ resultadoCarreraModel: ResultadoCarreraModel })
);
app.use(
  "/resultados-clasificaciones",
  createRClasificacionesRouter({
    resultadoClasificacionModel: ResultadoClasificacionModel,
  })
);
app.use(
  "/resultados-libres",
  createRLibresRouter({
    resultadoLibreModel: ResultadoLibreModel,
  })
);
app.use("/usuarios", createUsuarioRouter({ usuarioModel: UsuarioModel }));

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Server escuchando en el puerto http://localhost:${PORT}`);
});

app.use((req, res) => {
  res.status(404).send("<h1>404 Not Found</h1>");
});
