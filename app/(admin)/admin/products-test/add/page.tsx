import getCategories from "@/actions/getCategories"
import { getCurrentUser } from "@/actions/getCurrentUser"
import AddProductForm from "./add-form"

export default async function AddProductsPage() {
  const user = await getCurrentUser()
  if (!user) return null

  const categories = await getCategories()

  return (
    <div className="md:mx-20 lg:mx-28 xl:mx-32">
      <h1 className="text-xl font-bold mb-7">Agregar producto</h1>

      <AddProductForm
        categories={categories}
      />
    </div>
  )
}