"use client"

import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel"
import { Banner } from "@prisma/client"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"

export default function CustomCarrousel({ banners }: { banners: Banner[] | null }) {
  if (!banners) return null

  return (
    <div className="w-full flex justify-center items-center z-0 relative">
      <Carousel
        className="w-full"
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
      >
        <CarouselContent>
          {banners.map((banner) => (
            <CarouselItem className="" key={banner.id}>
              <Image
                src={banner.image}
                alt="banner"
                width={1500}
                height={500}
                className="bg-cover w-full md:h-full h-48"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}