import { z } from "zod";

export const sizeSchema = z.object({
  name: z
    .string({
      required_error: "El nombre es requerido"
    })
    .min(3, {
      message: "El nombre debe tener al menos 3 caracteres"
    })
    .max(255, {
      message: "El nombre debe tener menos de 255 caracteres"
    }),
  description: z
    .string({
      required_error: "La descripción es requerida"
    })
    .min(30, {
      message: "La descripción debe tener al menos 30 caracteres"
    })
    .max(255),
  price: z
    .number({
      required_error: "El precio es requerido"
    })
    .min(0, {
      message: "El precio debe ser mayor o igual a 0"
    }),
})