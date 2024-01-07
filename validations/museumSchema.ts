import * as z from "zod";

export const museumFormSchema = z.object({
  date: z.date({
    required_error: "Tienes que seleccionar una fecha.",
  }),
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "Tienes que seleccionar al menos una hora.",
  }),
})