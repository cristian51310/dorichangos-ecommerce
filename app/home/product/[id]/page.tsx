import getProductById from "@/actions/getProductById"
import getRelatedProducts from "@/actions/getRelatedProducts"
import NullData from "@/components/null-data"
import Section from "@/components/section"
import ProductDetail from "./product-detail"
import { ProductCard } from "@/components/products/product-card"

interface IParams {
  id: string
}

export default async function ProductPage({ params }: { params: IParams }) {
  const product = await getProductById(params)
  const relatedProducts = await getRelatedProducts(params.id)

  if (!product) return <NullData title="No se encontró el producto" />

  return (
    <>
      <Section>
        <ProductDetail product={product} />
      </Section>

      <Section className="-mt-4" title="Tambien podria gustarte">
        <div>
          {relatedProducts && relatedProducts.length > 0 && (
            <div className="grid gap-3 md:gap-5 grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} data={product} />
              ))}
            </div>
          )}
        </div>
      </Section>
    </>
  )
}
