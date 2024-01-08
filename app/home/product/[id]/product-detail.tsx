"use client"
import SetQuantity from "@/components/products/set-quantity"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/hooks/useCart"
import { CartProductType } from "@/types/cart-pruduct-type"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { MdCheckCircle } from "react-icons/md"
import { toast } from "sonner"
import Image from "next/image"
import { Product } from "@prisma/client"

export default function ProductDetail({ product }: {product: Product}){
  const router = useRouter()
  const { cartProducts, handleAddToCart } = useCart()
  const [isProductInCart, setIsProductInCart] = useState(false)

  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    image: product.image,
    quantity: 1,
    price: product.price,
  })

  useEffect(() => {
    setIsProductInCart(false)
    if (cartProducts) {
      const existingId = cartProducts.findIndex(item => item.id === product.id)
      if (existingId > -1) { setIsProductInCart(true) }
    }
  }, [cartProducts, product.id])

  const handleQtyIncrement = useCallback(() => {
    if (cartProduct.quantity === 5) return
    setCartProduct((prev) => {
      return { ...prev, quantity: prev.quantity + 1 }
    })
  }, [cartProduct])

  const handleQtyDecrement = useCallback(() => {
    if (cartProduct.quantity === 1) return
    setCartProduct((prev) => {
      return { ...prev, quantity: prev.quantity - 1 }
    })
  }, [cartProduct])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-14">

      <div className="grid grid-cols-5 gap-2 h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]">
        <div className="col-span-5 relative">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="w-full h-full object-cover max-h-[500px] min-h-[300px] sm:min-h-[400px] rounded-md"
          />
        </div>
      </div>

      <div className="flex flex-col text-sm">
        <h2 className="text-4xl font-bold capitalize md:mt-0 -mt-5">
          {product.name}
        </h2>

        <Separator className="my-3 md:my-6" />

        <p className="text-left leading-7 text-foreground">
          {product.description}
        </p>

        <Separator className="my-3 md:my-6" />

        {isProductInCart ? (
          <>
            <p className="md:my-4 my-0 text-slate-500 flex items-center gap-3">
              <MdCheckCircle size={20} className="text-green-500" />
              Producto añadido a tu carrito
            </p>

            <Separator className="my-4" />

            <Button
              variant="secondary"
              onClick={() => router.push('/home/cart')}
            >
              Ir al carrito
            </Button>
          </>
        ) : (
          <>
            <SetQuantity
              cartProduct={cartProduct}
              handleQtyIncrement={handleQtyIncrement}
              handleQtyDecrement={handleQtyDecrement}
            />
            
            <Separator className="my-3 md:my-6" />

            <Button
              disabled={product.stock === 0}
              onClick={() => {
                handleAddToCart(cartProduct)
                toast.success('Producto añadido al carrito')
              }}
            >
              Agregar al carrito
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
