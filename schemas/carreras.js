import z from "zod";

const carreraSchema = z.object({
  vueltas: z.number(),
  fecha: z.string(),
  horaInicio: z.string(),
  estado: z.enum(["Finalizada", "Por correr", "En proceso"]),
  idCircuito: z.number(),
});

export function validateCarrera(input) {
  return carreraSchema.safeParse(input);
}

export function validatePartialCarrera(input) {
  return carreraSchema.partial().safeParse(input);
}
