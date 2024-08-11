import z from "zod";

const pilotoSchema = z.object({
  imgPerfil: z.string(),
  nombre: z.string(),
  apellido: z.string(),
  fechaNac: z.string(),
  peso: z.number(),
  altura: z.number(),
  numero: z.number(),
  puntuacion: z.number(),
  idPais: z.number(),
  idCoche: z.number(),
});

export function validatePiloto(input) {
  return pilotoSchema.safeParse(input);
}

export function validatePartialPiloto(input) {
  return pilotoSchema.partial().safeParse(input);
}
