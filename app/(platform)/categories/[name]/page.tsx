import getCategoryByName from "@/actions/getCategoryByName"
import getProductsByCategory from "@/actions/getProductsByCategory"
import NullData from "@/components/null-data"
import Section from "@/components/section"
import CategoryDetail from "./category-detail"

interface IParams {
  name: string
}

export default async function ProductPage({ params }: { params: IParams }) {
  const category = await getCategoryByName(params)
  const products = await getProductsByCategory(params.name)

  if (!category) return <NullData title="No se encontró la categoria" />

  return (
    <Section>
      <CategoryDetail
        category={category}
        products={products}
      />
    </Section>
  )
}
