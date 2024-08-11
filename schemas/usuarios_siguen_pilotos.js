import z from "zod";

const uspSchema = z.object({
  idPiloto: z.number(),
  idUsuario: z.number(),
});

export function validateUSP(input) {
  return uspSchema.safeParse(input);
}

export function validatePartialUSP(input) {
  return uspSchema.partial().safeParse(input);
}
