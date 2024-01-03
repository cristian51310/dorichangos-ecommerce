"use client"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { sizeSchema } from "@/validations/sizeSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

type SizeFormValues = z.infer<typeof sizeSchema>

export default function AddSizeForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSizeCreated, setIsSizeCreated] = useState(false)

  const form = useForm<SizeFormValues>({
    resolver: zodResolver(sizeSchema),
    mode: "onChange",
  })

  async function onSubmit(data: SizeFormValues) {
    setIsLoading(true)

    try {
      const categoryData = {
        name: data.name,
        description: data.description,
        price: data.price,
      };

      await axios.post("/api/size", categoryData);
      setIsSizeCreated(true);
      toast.success("Tamaño creado");
    } catch (error) {
      setIsLoading(false);
      toast.error("Algo salió mal");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (isSizeCreated) {
      setIsSizeCreated(false)
      form.reset()
      toast.success("Categoria Creada")
    }
  }, [isSizeCreated, form])

  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de la categoria</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Este es el nombre de la categoria, debe ser unico.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripcion de la categoria</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  className="resize-none"
                />
              </FormControl>
              <FormDescription>
                Este es el nombre de la categoria, debe ser unico.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="my-3" disabled={isLoading}>
          {isLoading && (<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />)}
          Registrar Tamaño
        </Button>

      </form>
    </Form>
  )
}