import z from "zod";

const escuderiaSchema = z.object({
  imgLogo: z.string(),
  imgEscuderia: z.string(),
  nombre: z.string(),
  descripcion: z.string(),
  puntuacion: z.number(),
  idPais: z.number(),
});

export function validateEscuderia(input) {
  return escuderiaSchema.safeParse(input);
}

export function validatePartialEscuderia(input) {
  return escuderiaSchema.partial().safeParse(input);
}
