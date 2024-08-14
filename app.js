import express, { json } from "express";
import { corsMiddleware } from "./middlewares/cors.js";

// Create routers
import { createUsuarioRouter } from "./routes/usuarios.js";
import { createCarreraRouter } from "./routes/carreras.js";
import { createCircuitoRouter } from "./routes/circuitos.js";
import { createClasificacionRouter } from "./routes/clasificaciones.js";

// Models
import { UsuarioModel } from "./models/usuarios.js";
import { CarreraModel } from "./models/carreras.js";
import { CircuitoModel } from "./models/circuitos.js";
import { ClasificacionModel } from "./models/clasificaciones.js";

const app = express();

app.disable("x-powered-by");
app.use(json());
app.use(corsMiddleware());

// Aqui van los app.use() de los routers de los modelos, de momento solo el de usuarios para probarlo
app.use("/carreras", createCarreraRouter({ carreraModel: CarreraModel }));
app.use("/circuitos", createCircuitoRouter({ circuitoModel: CircuitoModel }));
app.use(
  "/clasificaciones",
  createClasificacionRouter({ clasificacionModel: ClasificacionModel })
);
app.use("/usuarios", createUsuarioRouter({ usuarioModel: UsuarioModel }));

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Server escuchando en el puerto http://localhost:${PORT}`);
});

app.use((req, res) => {
  res.status(404).send("<h1>404 Not Found</h1>");
});
