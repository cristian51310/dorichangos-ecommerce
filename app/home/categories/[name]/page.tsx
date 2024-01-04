import getCategories from "@/actions/getCategories"
import getCategoryByName from "@/actions/getCategoryByName"
import NullData from "@/components/null-data"
import Section from "@/components/section"
import CategoryDetail from "./category-detail"
import { products } from "@/app/(admin)/manager/data"
import getProductsByCategory from "@/actions/getProductsByCategory"

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
