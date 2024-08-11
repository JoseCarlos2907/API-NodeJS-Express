import z from "zod";

const pcclSchema = z.object({
  idPiloto: z.number(),
  idClasificacion: z.number(),
  tiempoVueltaMasRapida: z.string(),
  posicionFinal: z.number().min(0).max(20),
});

export function validatePCCL(input) {
  return pcclSchema.safeParse(input);
}

export function validatePartialPCCL(input) {
  return pcclSchema.partial().safeParse(input);
}
