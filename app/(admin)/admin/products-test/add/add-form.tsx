"use client"
import { Icons } from "@/components/icons"
import CategoryInput from "@/components/inputs/category-input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { UploadFileIcon, uploadFileContainer } from "@/components/uploadFileIcon"
import { firebaseImageUpload } from "@/lib/firebaseImageUpload"
import { productSchema } from "@/validations/productSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Category } from "@prisma/client"
import { DialogClose, DialogDescription, DialogTitle } from "@radix-ui/react-dialog"
import { Separator } from "@radix-ui/react-menubar"
import axios from "axios"
import { ImageIcon } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { FieldValues, SubmitHandler, useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

type ProductFormValues = z.infer<typeof productSchema>

export interface ImageType {
  url: File | null
}

export interface UploadImageType {
  url: string
}

interface Flavor {
  name: string;
  description: string;
}

interface Size {
  name: string;
  price: number;
  description: string;
}

export default function AddProductForm({ categories }: { categories: Category[] }) {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isProductCreated, setIsProductCreated] = useState<boolean>(false)

  const [flavors, setFlavors] = useState<Flavor[]>([]);
  const [sizes, setSizes] = useState<Size[]>([]);

  const addFlavor = (flavor: Flavor) => {
    setFlavors((prevFlavors) => [...prevFlavors, flavor]);
  };

  const removeFlavor = (index: number) => {
    setFlavors((prevFlavors) => [
      ...prevFlavors.slice(0, index),
      ...prevFlavors.slice(index + 1),
    ]);
  };

  const addSize = (size: Size) => {
    setSizes((prevSizes) => [...prevSizes, size]);
  };

  const removeSize = (index: number) => {
    setSizes((prevSizes) => [
      ...prevSizes.slice(0, index),
      ...prevSizes.slice(index + 1),
    ]);
  };

  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      price: "",
      description: "",
      category: [],
      image: null,
    }
  })

  const setCustomValue = useCallback((id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true
    })
  }, [setValue]);

  useEffect(() => {
    if (isProductCreated) {
      reset()
      setIsProductCreated(false)
    }
  }, [isProductCreated, reset])

  const category = watch("category")

  const onSubmittest: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    try {
      toast.loading("Agregando producto...")
      const uploadedImage = await firebaseImageUpload(data.image[0], "products");

      const flavorsData = flavors.map((flavor) => ({
        name: flavor.name,
        description: flavor.description,
      }));

      const sizesData = sizes.map((size) => ({
        name: size.name,
        price: size.price,
        description: size.description,
      }));

      const productData = {
        name: data.name,
        description: data.description,
        price: data.price,
        image: uploadedImage.url,
        inStock: true,
        category: data.category,
        sizes: sizesData,
        flavors: flavorsData,
      };

      await axios.post("/api/products-beta", productData);
      setIsProductCreated(true);
      toast.success("Producto creado");
      router.push("/admin/productsbeta");

      console.log(productData)
    } catch (error) {
      setIsLoading(false);
      toast.error("Algo salió mal");
    } finally {
      setIsLoading(false);
    }
  };

  const [selectedImage, setSelectedImage] = useState<File | null>(null)

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      image: undefined
    },
    mode: "onChange",
  })

  async function onSubmit(data: ProductFormValues) {
    console.log(data)
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
                <FormLabel>Nombre del menu</FormLabel>
                <FormControl>
                  <Input {...field} />
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
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Precio del producto</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Este es el precio del producto, si por alguna razon quieres que sea gratis
                  el precio debe de ser 0.
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
                      <div className="grid place-items-center w-40 h-40 bg-neutral-100 rounded-md border-2">
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

        </form>
      </Form>

      <div className="grid gap-4">

        <Label className="my-3">Seleccionar las categorias de tu producto</Label>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-5 overflow-y-auto">
          {categories.map((item) => {
            if (item.name === "all") return null;
            return (
              <CategoryInput
                key={item.id}
                onClick={() => {
                  const currentCategories = watch("category") || [];
                  const updatedCategories = currentCategories.includes(item.id)
                    ? currentCategories.filter((categoryId: any) => categoryId !== item.id)
                    : [...currentCategories, item.id];
                  setCustomValue("category", updatedCategories);
                }}
                selected={category.includes(item.id)} // Check if category ID is in the array
                label={item.name}
                image={item.image}
              />
            );
          })}
        </div>

        <Separator />
        <p className="font-semibold">Sabores disponibles</p>
        <p className="text-muted-foreground text-sm">Tu producto tiene alguna variacion de sabor?, agregala aqui</p>
        <div className="grid grid-cols-4 gap-6">
          {flavors.map((flavor, index) => (
            <Card
              key={index}
              className="flex flex-col items-center justify-between p-3 pt-5 gap-6"
            >
              <p>{flavor.name}</p>
              <Button
                variant="destructive"
                onClick={() => removeFlavor(index)}
              >
                Eliminar
              </Button>
            </Card>
          ))}
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                Agregar Sabor
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Agrega un sabor para el producto</DialogTitle>
                <DialogDescription className="text-sm">
                  Si el producto tiene variaciones de sabor agrega cada una hasta completarlas
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Input
                  type="text"
                  placeholder="Nombre del sabor"
                  onChange={(e) => setCustomValue("flavorName", e.target.value)}
                />
                <Textarea
                  placeholder="Descripción del sabor"
                  onChange={(e) => setCustomValue("flavorDescription", e.target.value)}
                />
                <DialogClose asChild>
                  <Button
                    onClick={() => {
                      addFlavor({
                        name: watch("flavorName"),
                        description: watch("flavorDescription"),
                      });
                    }}
                  >
                    Agregar Sabor
                  </Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Separator />
        <p className="font-semibold">Tamaños de los productos</p>
        <p className="text-muted-foreground text-sm">Agrega los tamaños en los que este producto esta disponible</p>
        <div className="grid grid-cols-4 gap-6">
          {sizes.map((flavor, index) => (
            <Card
              key={index}
              className="flex flex-col items-center justify-between p-3 pt-5 gap-6"
            >
              <p>{flavor.name}</p>
              <Button
                variant="destructive"
                onClick={() => removeSize(index)}
              >
                Eliminar
              </Button>
            </Card>
          ))}
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                Agregar Sabor
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Agrega un sabor para el producto</DialogTitle>
                <DialogDescription className="text-sm">
                  Si el producto tiene variaciones de sabor agrega cada una hasta completarlas
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Input
                  type="text"
                  placeholder="Nombre del tamaño"
                  onChange={(e) => setCustomValue("sizeName", e.target.value)}
                />
                <Input
                  type="number"
                  placeholder="Precio del tamaño"
                  onChange={(e) => setCustomValue("sizePrice", e.target.value)}
                />
                <Textarea
                  placeholder="Descripción del tamaño"
                  onChange={(e) => setCustomValue("sizeDescription", e.target.value)}
                />
                <DialogClose asChild>
                  <Button
                    onClick={() => {
                      addSize({
                        name: watch("sizeName"),
                        price: watch("sizePrice"),
                        description: watch("sizeDescription"),
                      })
                    }}
                  >
                    Agregar Sabor
                  </Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>

  )
}