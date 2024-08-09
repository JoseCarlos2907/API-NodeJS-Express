import express, { json } from "express";
import { corsMiddleware } from "./middlewares/cors.js";

const app = express();

app.disable("x-powered-by");
app.use(json());
app.use(corsMiddleware());

// Aqui van los app.use() de los routers de los modelos, de momento solo el de usuarios para probarlo

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`server escuchando en puerto http://localhost:${PORT}`);
});

app.use((req, res) => {
  res.status(404).send("<h1>404 Not Found</h1>");
});
