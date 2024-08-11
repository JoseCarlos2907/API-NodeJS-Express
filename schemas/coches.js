import z from "zod";

const cocheSchema = z.object({
  modelo: z.string(),
  imgPrincipal: z.string(),
  segundaImg: z.string(),
  terceraImg: z.string(),
  cuartaImg: z.string(),
  idEscuderia: z.number(),
});

export function validateCoche(input) {
  return cocheSchema.safeParse(input);
}

export function validatePartialCoche(input) {
  return cocheSchema.partial().safeParse(input);
}
