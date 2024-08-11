import z from "zod";

const usuarioSchema = z.object({
  imgPerfil: z.string(),
  nombre: z.string(),
  apellidos: z.string(),
  fechaNac: z.string(),
  nombreUsuario: z.string(),
  correo: z.string().email(),
  rol: z.enum(["usuario", "admin"]),
  temaSeleccionado: z.number().min(0).max(5),
});

export function validateUsuario(input) {
  return usuarioSchema.safeParse(input);
}

export function validatePartialUsuario(input) {
  return usuarioSchema.partial().safeParse(input);
}
