import getCategories from "@/actions/getCategories"
import getProductById from "@/actions/getProductById"
import NullData from "@/components/null-data"
import EditProductForm from "./edit-form"

interface IParams {
  id: string
}

export default async function AddProductsPage({ params }: { params: IParams }) {
  const categories = await getCategories()
  const product = await getProductById(params)

  if (!product) return <NullData title="No se encontró el producto" />

  return (
    <div className="md:mx-20 lg:mx-28 xl:mx-32">
      <h1 className="text-xl font-bold mb-7">Agregar producto</h1>

      <EditProductForm
        categories={categories}
        product={product}
      />
    </div>
  )
}