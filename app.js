import express, { json } from "express";
import { corsMiddleware } from "./middlewares/cors.js";

import { createUsuarioRouter } from "./routes/usuarios.js";
import { createCarreraRouter } from "./routes/carreras.js";

import { UsuarioModel } from "./models/usuarios.js";
import { CarreraModel } from "./models/carreras.js";

const app = express();

app.disable("x-powered-by");
app.use(json());
app.use(corsMiddleware());

// Aqui van los app.use() de los routers de los modelos, de momento solo el de usuarios para probarlo
app.use("/carreras", createCarreraRouter({ carreraModel: CarreraModel }));
app.use("/usuarios", createUsuarioRouter({ usuarioModel: UsuarioModel }));

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`Server escuchando en el puerto http://localhost:${PORT}`);
});

app.use((req, res) => {
  res.status(404).send("<h1>404 Not Found</h1>");
});
