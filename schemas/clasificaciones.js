import z from "zod";

const clasificacionSchema = z.object({
  fecha: z.string(),
  horaInicio: z.string(),
  estado: z.enum(["Finalizada", "Por correr", "En proceso"]),
  idCarrera: z.number(),
});

export function validateClasificacion(input) {
  return clasificacionSchema.safeParse(input);
}

export function validatePartialClasificacion(input) {
  return clasificacionSchema.partial().safeParse(input);
}
