import z from "zod";

const usuSchema = z.object({
  idUsuario1: z.number(),
  idUsuario2: z.number(),
});

export function validateUSU(input) {
  return usuSchema.safeParse(input);
}

export function validatePartialUSU(input) {
  return usuSchema.partial().safeParse(input);
}
