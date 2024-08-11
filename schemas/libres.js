import z from "zod";

const libreSchema = z.object({
  numeroLibre: z.number(),
  fecha: z.string(),
  horaInicio: z.string(),
  estado: z.enum(["Finalizada", "Por correr", "En proceso"]),
  idCarrera: z.number(),
});

export function validateLibre(input) {
  return libreSchema.safeParse(input);
}

export function validatePartialLibre(input) {
  return libreSchema.partial().safeParse(input);
}
