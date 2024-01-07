import getCategories from "@/actions/getCategories"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { IoAddCircleOutline } from "react-icons/io5"
import { DataTableDemo } from "./manage-categories"

export default async function ManageCategoriesPage() {
  const categories = await getCategories()

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between md:items-center items-start">
        <h1 className="text-xl font-bold mb-4">Administrar Reservaciones</h1>

        <Link
          className={cn(
            buttonVariants({ variant: "default" }),
            "justify-center items-center"
          )}
          href="/admin/museum/add"
        >
          <IoAddCircleOutline className="mr-2 w-4 h-4" />
          Agregar reservaciones
        </Link>
      </div>
      <DataTableDemo categories={categories} />
    </>
  )
}