import z from "zod";

const paisSchema = z.object({
  nombre: z.string(),
  countryCode: z.string(),
});

export function validatePais(input) {
  return paisSchema.safeParse(input);
}

export function validatePartialPais(input) {
  return paisSchema.partial().safeParse(input);
}
