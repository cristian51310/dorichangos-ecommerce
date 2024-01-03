import getBanners from "@/actions/getBanners"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { IoAddCircleOutline } from "react-icons/io5"
import { DataTableDemo } from "./manage-banners"

export default async function ManageCategoriesPage() {
  const banners = await getBanners()

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between md:items-center items-start">
        <h1 className="text-xl font-bold mb-4">Administrar Promocionales</h1>

        <Link
          className={cn(
            buttonVariants({ variant: "default" }),
            "justify-center items-center"
          )}
          href="/admin/banners/add"
        >
          <IoAddCircleOutline className="mr-2 w-4 h-4" />
          Agregar promocional
        </Link>
      </div>

      {!banners || banners.length === 0 ? (
        <h3 className="text-xl font-bold mt-40 text-center">No hay promocionales actualmente</h3>
      ) : (
        <DataTableDemo banners={banners} />
      )}
    </>
  )
}