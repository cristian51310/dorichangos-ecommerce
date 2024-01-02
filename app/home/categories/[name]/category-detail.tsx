"use client"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"

interface ProductDetailProps {
  category: any
}

export default function CategoryDetail({ category }: ProductDetailProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
      <div className="grid h-full min-h-[200px] md:min-h-[70vh] relative m-[2px]">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="w-full h-full object-cover min-h-[200px] rounded-xl"
        />
      </div>

      <div className="flex flex-col gap-1 text-sm md:col-span-2 px-8 py-2">
        <h2 className="text-4xl font-bold">
          {category.name}
        </h2>

        <Separator className="my-2" />

        <p className="text-left leading-7 text-foreground">
          {category.description}
        </p>
      </div>
    </div>
  )
}
