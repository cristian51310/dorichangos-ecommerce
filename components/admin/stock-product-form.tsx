import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { CubeIcon } from "@radix-ui/react-icons"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

export const stockSchema = z.object({
  stock: z.string({ required_error: "El stock es requerido" })
})

type StockFormValues = z.infer<typeof stockSchema>

export default function StockProductForm({ id, stock }: { id: string, stock: number }) {
  const router = useRouter()

  const form = useForm<StockFormValues>({
    resolver: zodResolver(stockSchema),
    defaultValues: { stock: stock.toString() },
    mode: "onChange",
  })

  async function onSubmit(data: StockFormValues) {
    try {
      toast.info("Actualizando producto...");
      const productData = {
        id: id,
        stock: data.stock
      };
      await axios.patch("/api/products", productData);
      toast.success("Producto actualizado");
      router.refresh();
    } catch (error) {
      toast.error("Algo salió mal");
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon"        >
          <CubeIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar stock</DialogTitle>
          <DialogDescription>
            Realiza cambios en el stock del producto
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Numero de unidades disponibles
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="my-3">
              Actualizar existencias
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
