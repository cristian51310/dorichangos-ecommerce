"use client"

import { useCart } from "@/hooks/useCart"
import { formatPrice } from "@/lib/formatPrice"
import { CartProductType } from "@/types/cart-pruduct-type"
import { Product } from "@prisma/client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { Card } from "../ui/card"

export function ProductCard({ data }: { data: Product }) {
  const router = useRouter()
  const { handleAddToCart } = useCart()

  const cartProduct: CartProductType = ({
    id: crypto.randomUUID(),
    productId: data.id,
    name: data.name,
    image: data.image,
    quantity: 1,
    size: data.sizes[0].name,
    price: data.sizes[0].price,
  })

  return (
    <Card className="p-2 hover:cursor-pointer hover:shadow-xl">
      <div
        className="overflow-hidden rounded-md"
        onClick={() => router.push(`/home/product/${data.id}`)}
      >
        <Image
          src={data.image}
          alt={data.name}
          height={150}
          width={150}
          className="h-auto w-full object-cover transition-transform hover:scale-105 aspect-[2.5/1] md:aspect-square"
        />
      </div>

      <div className="text-sm mt-3">
        <h3 className="font-medium text-base leading-none mb-2.5">
          {data.name}
        </h3>

        <div className="flex gap-2 mb-2">
          <p className="text-xs line-through font-bold text-red-500">
            {formatPrice(data.sizes[0].price * 1.3)}
          </p>
          <p className="text-lg font-bold -mt-1 text-green-500">
            {formatPrice(data.sizes[0].price)}
          </p>
        </div>

        <Button
          onClick={() => handleAddToCart(cartProduct)}
          className="w-full"
        >
          Agregar al carrito
        </Button>
      </div>

    </Card>
  )
}