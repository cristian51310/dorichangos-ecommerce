"use client"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { UploadFileIcon, uploadFileContainer } from "@/components/uploadFileIcon"
import { firebaseImageUpload } from "@/lib/firebaseImageUpload"
import { categorySchema } from "@/validations/categorySchema"
import { Category } from "@prisma/client"
import axios from "axios"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

type CategoryFormValues = z.infer<typeof categorySchema>

export default function EditCategoryForm({ category }: { category: Category }) {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)

  const form = useForm<CategoryFormValues>({
    defaultValues: {
      name: category.name,
      description: category.description,
      image: category.image,
    },
    mode: "onChange",
  })

  async function onSubmit(data: CategoryFormValues) {
    setIsLoading(true)

    try {
      toast.info("Subiendo imagen...");

      let image = data.image;

      if (selectedImage) {
        image = await firebaseImageUpload(data.image[0], "categories");
      }

      const categoryData = {
        id: category.id,
        name: data.name,
        description: data.description,
        image: image,
      };

      await axios.put("/api/categories", categoryData);
      toast.success("Categoria Actualizada");
      router.push("/admin/categories");
    } catch (error) {
      setIsLoading(false);
      toast.error("Algo salió mal");
    } finally {
      setIsLoading(false);
    }
  }

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

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Imagen de la categoria</FormLabel>
              <FormControl>
                <div className="flex items-center justify-center gap-5">
                  <Label className={uploadFileContainer}>
                    <UploadFileIcon />
                    <Input
                      type="file"
                      className="hidden"
                      name={field.name}
                      onChange={(e) => {
                        field.onChange(e.target.files);
                        setSelectedImage(e.target.files?.[0] || null);
                      }}
                      ref={field.ref}
                    />
                  </Label>
                  <Image
                    src={selectedImage ? URL.createObjectURL(selectedImage) : category.image}
                    alt="Category Image"
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

        <Button className="my-3" disabled={isLoading}>
          {isLoading && (<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />)}
          Actualizar Categoria
        </Button>

      </form>
    </Form>
  )
}