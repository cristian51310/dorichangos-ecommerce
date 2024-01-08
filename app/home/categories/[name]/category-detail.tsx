"use client"
import { ProductCard } from "@/components/products/product-card"
import { Separator } from "@/components/ui/separator"
import { Category } from "@prisma/client"
import Image from "next/image"
import { Product } from "@prisma/client"

interface Props {
  category: Category
  products: Product[]
}

export default function CategoryDetail({ category,products }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
      <div className="md:grid hidden h-full min-h-[200px] md:min-h-[70vh] relative m-[2px]">
        <Image
          src={category.image}
          alt={category.name}
          fill
          className="w-full object-cover min-h-[200px] rounded-xl"
        />
      </div>

      <div className="flex flex-col text-sm md:col-span-2 px-0 md:px-8 py-2">
        <h2 className="text-4xl font-bold">
          {category.name}
        </h2>

        <Separator className="my-2" />

        <p className="text-left leading-7 text-foreground text-lg mb-5">
          {category.description}
        </p>

        {products.length > 0 && (
          <div className="grid grid-cols-1 gap-4 md:gap-7">
            {products.map((product) => (
              <ProductCard key={product.id} data={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
