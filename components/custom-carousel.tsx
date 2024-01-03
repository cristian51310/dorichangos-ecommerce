"use client"

import { Card } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Banner } from "@prisma/client"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"

export default function CustomCarrousel({ banners }: { banners: Banner[] | null }) {
  if (!banners) return null

  return (
    <div className="w-full flex justify-center items-center">
      <Carousel
        className="w-full"
        plugins={[
          Autoplay({
            delay: 3000,
          }),
        ]}
      >
        <CarouselContent className="-ml-1">
          {banners.map((banner) => (
            <CarouselItem key={banner.id} className="pl-3 md:basis-1/2 lg:basis-1/3">
              <Card className="flex aspect-video rounded-xl overflow-hidden bg-cover">
                <Image
                  src={banner.image}
                  alt="banner"
                  width={960}
                  height={480}
                  className=" bg-cover "
                />
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}