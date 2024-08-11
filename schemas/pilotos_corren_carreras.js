import z from "zod";

const pccaSchema = z.object({
  idPiloto: z.number(),
  idCarrera: z.number(),
  tiempoTotalEnCarrera: z.string(),
  posicionFinal: z.number().min(0).max(20),
});

export function validatePCCA(input) {
  return pccaSchema.safeParse(input);
}

export function validatePartialPCCA(input) {
  return pccaSchema.partial().safeParse(input);
}
