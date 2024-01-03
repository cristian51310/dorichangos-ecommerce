import getBanners from "@/actions/getBanners"
import CustomCarrousel from "@/components/custom-carousel"
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Dorichangos | Tu comida favorita en minutos",
  description: "Tu comida favorita en minutos",
}

export default async function Home() {
  const banners = await getBanners()

  return (
    <>
      <CustomCarrousel banners={banners} />

      <div className="grid gap-3 md:gap-5 grid-cols-2 lg:grid-cols-5">
        aqui van los productos
      </div>
    </>
  )
}
