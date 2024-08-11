import z from "zod";

const circuitoSchema = z.object({
  imgCircuito: z.string(),
  imgSiluetaCircuto: z.string(),
  nombre: z.string(),
  longitud: z.number(),
  tipo: z.string(),
  idPais: z.number(),
});

export function validateCircuito(input) {
  return circuitoSchema.safeParse(input);
}

export function validatePartialCircuito(input) {
  return circuitoSchema.partial().safeParse(input);
}
