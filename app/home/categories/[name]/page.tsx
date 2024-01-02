import getCategoryByName from "@/actions/getCategoryByName"
import NullData from "@/components/null-data"
import CategoryDetail from "./category-detail"

interface IParams {
  name: string
}

export default async function ProductPage({ params }: { params: IParams }) {
  const category = await getCategoryByName(params)

  if (!category) return <NullData title="No se encontró la categoria" />

  return (
    <div className="">
      <CategoryDetail category={category} />
    </div>
  )
}
