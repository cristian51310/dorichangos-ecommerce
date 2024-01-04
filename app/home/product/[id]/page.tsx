import NullData from "@/components/null-data"
import getProductById from "@/actions/getProductById"
import ProductDetail from "./product-detail"
import Section from "@/components/section"

interface IParams {
  id: string
}

export default async function ProductPage({ params }: { params: IParams }) {
  const product = await getProductById(params)

  if (!product) return <NullData title="No se encontró el producto" />

  return (
    <Section>
      <ProductDetail product={product} />
    </Section>
  )
}
