import getCategoryById from "@/actions/getCategoryById"
import NullData from "@/components/null-data"
import EditCategoryForm from "./edit-form"

interface IParams {
  id: string
}

export default async function AddProductsPage({ params }: { params: IParams }) {
  const category = await getCategoryById(params)

  if (!category) return <NullData title="No se encontró la categoria" />

  return (
    <div className="md:mx-20 lg:mx-28 xl:mx-32">
      <h1 className="text-xl font-bold mb-7">Editando la categoria</h1>

      <EditCategoryForm category={category} />
    </div>
  )
}