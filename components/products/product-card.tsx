"use client"

import { useCart } from "@/hooks/useCart"
import { formatPrice } from "@/lib/formatPrice"
import { cn } from "@/lib/utils"
import { CartProductType } from "@/types/cart-pruduct-type"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { Card } from "../ui/card"

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  data: any
}

export function ProductCard({ data, className }: Props) {
  const router = useRouter()
  const { handleAddToCart, cartProducts } = useCart()

  const [isProductInCart, setIsProductInCart] = useState(false)

  const cartProduct: CartProductType = ({
    id: data.id,
    name: data.name,
    description: data.description,
    image: data.image,
    quantity: 1,
    price: data.price,
  })

  useEffect(() => {
    setIsProductInCart(false)
    if (cartProducts) {
      const existingId = cartProducts.findIndex(item => item.id === data.id)
      if (existingId > -1) { setIsProductInCart(true) }
    }
  }, [cartProducts, data.id])

  return (
    <Card
      className={cn("p-2 hover:cursor-pointer hover:shadow-xl", className)}
    >
      <div
        className="overflow-hidden rounded-md"
        onClick={() => router.push(`/home/product/${data.id}`)}
      >
        <Image
          src={data.image}
          alt={data.name}
          height={150}
          width={150}
          className={cn(
            "h-auto w-full object-cover transition-transform hover:scale-105 aspect-[2.5/1] md:aspect-square"
          )}
        />
      </div>

      <div className="text-sm mt-3">
        <h3 className="font-medium text-base leading-none mb-2.5">
          {data.name}
        </h3>
        <div className="flex gap-2 mb-2">
          <p className="text-xs line-through font-bold text-red-500">
            {formatPrice(data.price * 1.3)}
          </p>
          <p className="text-lg font-bold -mt-1 text-green-500">
            {formatPrice(data.price)}
          </p>
        </div>

        {isProductInCart ? (
          <Button
            onClick={() => router.push("/home/cart")}
            className="w-full bg-blue-400"
          >
            Ver carrito
          </Button>
        ) : (
          <Button
            onClick={() => handleAddToCart(cartProduct)}
            className="w-full"
          >
            Agregar al carrito
          </Button>
        )}
      </div>

    </Card>
  )
}