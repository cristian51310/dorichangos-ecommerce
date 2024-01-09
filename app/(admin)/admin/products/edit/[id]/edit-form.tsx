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
import { productSchema } from "@/validations/productSchema"
import { Category, Product } from "@prisma/client"
import axios from "axios"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

type ProductFormValues = z.infer<typeof productSchema>

interface Props {
  categories: Category[]
  product: Product
}

export default function EditProductForm({ categories, product }: Props) {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)

  const form = useForm<ProductFormValues>({
    defaultValues: {
      name: product.name,
      description: product.description,
      image: product.image,
      category: product.categoryIDs[0]
    },
    mode: "onChange",
  })

  async function onSubmit(data: ProductFormValues) {
    setIsLoading(true)

    try {
      let uploadedImage = data.image;

      if (selectedImage) {
        toast.info("Subiendo imagen...");
        uploadedImage = await firebaseImageUpload(data.image[0], "products");
      }

      const categoryData = {
        id: product.id,
        name: data.name,
        description: data.description,
        image: selectedImage ? uploadedImage.url : data.image,
        categoryID: data.category,
      };

      await axios.put("/api/products", categoryData);
      toast.success("Producto Actualizado");
      router.push("/admin/products");
    } catch (error) {
      setIsLoading(false);
      toast.error("Algo salió mal");
    } finally {
      setIsLoading(false);
    }
  }

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

          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Imagen del menu</FormLabel>
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
                    <Image
                      src={selectedImage ? URL.createObjectURL(selectedImage) : product.image}
                      alt="Product Image"
                      width={200}
                      height={200}
                      className="rounded-md object-cover w-40 h-40 border-2"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="my-3">
            {isLoading && (<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />)}
            Actualizar Producto
          </Button>

        </form >
      </Form >
    </>
  )
}