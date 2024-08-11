import z from "zod";

const comentarioSchema = z.object({
  idUsuario: z.number(),
  idPiloto: z.number(),
  idCarrera: z.number(),
  comentario: z.string(),
});

export function validateComentario(input) {
  return comentarioSchema.safeParse(input);
}

export function validatePartialComentario(input) {
  return comentarioSchema.partial().safeParse(input);
}
