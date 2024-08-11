import z from "zod";

const pclSchema = z.object({
  idPiloto: z.number(),
  idLibre: z.number(),
  tiempoVueltaMasRapida: z.string(),
  posicionFinal: z.number().min(0).max(20),
});

export function validatePCL(input) {
  return pclSchema.safeParse(input);
}

export function validatePartialPCL(input) {
  return pclSchema.partial().safeParse(input);
}
