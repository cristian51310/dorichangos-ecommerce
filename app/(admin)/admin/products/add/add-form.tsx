"use client"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { UploadFileIcon, uploadFileContainer } from "@/components/uploadFileIcon"
import { firebaseImageUpload } from "@/lib/firebaseImageUpload"
import { productSchema } from "@/validations/productSchemaTest"
import { zodResolver } from "@hookform/resolvers/zod"
import { Category } from "@prisma/client"
import axios from "axios"
import { ImageIcon } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

type ProductFormValues = z.infer<typeof productSchema>

export default function AddProductForm({ categories }: { categories: Category[] }) {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    mode: "onChange",
  })

  const { fields, append } = useFieldArray({
    name: "sizeName",
    control: form.control,
  })

  async function onSubmittt(data: ProductFormValues) {
    setIsLoading(true)

    try {
      toast.info("Subiendo imagen...");
      const uploadedImage = await firebaseImageUpload(data.image[0], "products");

      const categoryData = {
        name: data.name,
        description: data.description,
        image: uploadedImage.url,
        stock: data.stock,
        categoryID: data.category,
      };

      await axios.post("/api/products", categoryData);
      toast.success("Producto creado");
      router.push("/admin/products");
    } catch (error) {
      setIsLoading(false);
      toast.error("Algo salió mal");
    } finally {
      setIsLoading(false);
    }
  }

  async function onSubmit(data: ProductFormValues) {
    setIsLoading(true)

    try {
      toast.info("Registrando producto ...");
      const uploadedImage = await firebaseImageUpload(data.image[0], "products");

      // aqui obtenemos los sizeName y los sizePrice y los unimos en un unico objeto
      const sizes = data.sizeName.map((item, index) => {
        return {
          name: item.value,
          price: data.sizePrice[index].value,
        }
      })

      const productData = {
        name: data.name,
        description: data.description,
        sizes: sizes,
        image: uploadedImage.url,
        stock: data.stock,
        categoryID: data.category,
      };

      await axios.post("/api/products", productData);
      toast.success("Producto creado");
      router.push("/admin/products");

    } catch (error) {
      setIsLoading(false);
      toast.error("Algo salió mal");
    } finally {
      setIsLoading(false);
    }
  }

  const [selectedImage, setSelectedImage] = useState<File | null>(null)

  return (
    <>
      <Form {...form}>
        <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre del Producto</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormDescription>
                  Este es el nombre del Producto, es como los clientes van a ver tu producto.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Existencias del producto</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categoria</FormLabel>
                <div>
                  <FormControl>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((item) => (
                          <SelectItem key={item.id} value={item.id}>{item.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                </div>
                <FormDescription>
                  Categoria de tu producto.
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
                <FormLabel>Descripcion del producto</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="resize-none"
                  />
                </FormControl>
                <FormDescription>
                  Este es el nombre del menu, debe ser unico.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            {fields.map((field, index) => (
              <div className="border-b border-neutral-400 py-6 grid md:grid-cols-6 gap-5" key={field.id}>
                <FormField
                  control={form.control}
                  name={`sizeName.${index}.value`}
                  render={({ field }) => (
                    <FormItem className="md:col-span-4">
                      <FormLabel>
                        Nombre del Tamaño {index + 1}
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`sizePrice.${index}.value`}
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>
                        Precio del Tamaño {index + 1}
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

            ))}
            <Button
              type="button"
              variant="outline"
              className="mt-12"
              onClick={() => append({ value: "" })}
            >
              Añadir Tamaño
            </Button>
          </div>

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Imagen del Producto</FormLabel>
                <FormControl>
                  <div className="flex items-center justify-center gap-5">
                    <Label className={uploadFileContainer}>
                      <UploadFileIcon />
                      <Input
                        type="file"
                        className="hidden"
                        accept="image/png, image/jpeg, image/webp"
                        name={field.name}
                        onChange={(e) => {
                          field.onChange(e.target.files);
                          setSelectedImage(e.target.files?.[0] || null);
                        }}
                        ref={field.ref}
                      />
                    </Label>
                    {selectedImage ? (
                      <Image
                        src={URL.createObjectURL(selectedImage)}
                        alt="Selected"
                        width={200}
                        height={200}
                        className="rounded-md object-cover w-40 h-40 border-2"
                      />
                    ) : (
                      <div className="grid place-items-center w-40 h-40 bg-pink-100/30 rounded-md border-2">
                        <ImageIcon size={56} className="text-neutral-500" />
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="my-3">
            {isLoading && (<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />)}
            Agregar Producto
          </Button>

        </form >
      </Form >
    </>
  )
}