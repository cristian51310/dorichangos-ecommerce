"use client"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UploadFileIcon, uploadFileContainer } from "@/components/uploadFileIcon"
import { firebaseImageUpload } from "@/lib/firebaseImageUpload"
import { bannerSchema } from "@/validations/bannerSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { ImageIcon } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

type BannerFormValues = z.infer<typeof bannerSchema>

export default function AddCategoryForm() {
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)

  const form = useForm<BannerFormValues>({
    mode: "onChange",
  })

  async function onSubmit(data: BannerFormValues) {
    setIsLoading(true)

    try {
      toast.info("Subiendo imagen...");
      const uploadedImage = await firebaseImageUpload(data.image[0], "banners");

      const bannerData = {
        image: uploadedImage.url,
      };

      await axios.post("/api/banners", bannerData);
      toast.success("Banner creado");
      router.push("/admin/banners");
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
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="flex items-center justify-center gap-5">
                  <Label className={uploadFileContainer}>
                    <UploadFileIcon />
                    <Input
                      type="file"
                      className="hidden"
                      accept="image/jpeg, image/png, image/webp"
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
                      <ImageIcon size={56} className="text-neutral-400" />
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="my-3" disabled={isLoading}>
          {isLoading && (<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />)}
          Agregar Promocional
        </Button>
      </form>
    </Form>
  )
}