"use client"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { museumFormSchema } from "@/validations/museumSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"
import { items } from "../hours"

type DisplayFormValues = z.infer<typeof museumFormSchema>

const defaultValues: Partial<DisplayFormValues> = {
  items: ["7:00"],
}

export function MuseumForm() {
  const router = useRouter()

  const form = useForm<DisplayFormValues>({
    resolver: zodResolver(museumFormSchema),
    defaultValues,
  })

  const [isLoading, setIsLoading] = useState(false)

  async function onSubmit(data: DisplayFormValues) {
    console.log(data)
    setIsLoading(true)

    try {
      const museumDayData = {
        date: data.date,
        items: data.items,
      };

      await axios.post("/api/museum", museumDayData);
      toast.success("Categoria creada");
      router.push("/admin/museum");
    } catch (error) {
      setIsLoading(false);
      toast.error("Algo salió mal");
    } finally {
      setIsLoading(false);
    }

    toast("You submitted the following values:", {
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Fecha de reservaciones</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[440px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Selecciona una fecha para registrar</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="items"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Horarios de reservaciones</FormLabel>
                <FormDescription>
                  Selecciona tantas horas quieras tener disponibles ese dia.
                </FormDescription>
              </div>
              {items.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="items"
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(field.value?.filter((value) => value !== item.id))
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    )
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full my-3" type="submit" disabled={isLoading}>
          {isLoading && (<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />)}
          Registrar Fecha
        </Button>

      </form>
    </Form>
  )
}
