import getBanners from "@/actions/getBanners"
import getProducts from "@/actions/getProducts"
import CustomCarrousel from "@/components/custom-carousel"
import { ProductCard } from "@/components/products/product-card"
import Section from "@/components/section"
import { shuffleProducts } from "@/lib/suffleProducts"
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Dorichangos | Tu comida favorita en minutos",
  description: "Tu comida favorita en minutos",
}

export default async function Home() {
  const products = await getProducts()
  const banners = await getBanners()
  const randomProducts = shuffleProducts(products)

  return (
    <>
      <CustomCarrousel banners={banners} />

      <Section className="md:pt-0 md:-mt-28 z-40 relative backdrop-blur-md">
        <div>
          <h2 className="mb-5 font-bold text-2xl block md:hidden">Sabemos que te encantara</h2>
          {products && products.length > 0 && (
            <div className="grid gap-3 md:gap-5 grid-cols-1 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} data={product} />
              ))}
            </div>
          )}
        </div>
      </Section>

      <Section title="¿Se te antoja algo?">
        <div>
          {randomProducts && randomProducts.length > 0 && (
            <div className="grid gap-3 md:gap-5 grid-cols-1 lg:grid-cols-4">
              {randomProducts.map((product) => (
                <ProductCard key={product.id} data={product} />
              ))}
            </div>
          )}
        </div>
      </Section>

    </>
  )
}
