"use client"
import { Button } from "@/components/ui/button"
import { Banner } from "@prisma/client"
import Image from "next/image"
import axios from "axios"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

export function DataTableDemo({ banners }: { banners: Banner[] }) {
  const router = useRouter()

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/banners/`, { data: { id } })
      toast.success("Banner eliminado")
      router.refresh()
    } catch (error) {
      toast.error("Algo salió mal")
    }
  }

  return (
    <>
      <div className="mt-10 border rounded-md p-4 grid grid-cols-1 md:grid-cols-2 gap-5">
        {banners.map((banner) => (
          <div
            key={banner.id}
            className="p-2 border rounded-xl grid place-items-center gap-4 bg-pink-100/40"
          >
            <Image
              src={banner.image}
              alt="Picture of the author"
              width={960}
              height={480}
              className="rounded-xl"
            />
            <Button
              variant="destructive"
              onClick={() => handleDelete(banner.id)}
            >
              Eliminar
            </Button>
          </div>
        ))}
      </div>
    </>
  )
}
