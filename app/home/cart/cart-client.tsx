"use client"

import NullData from "@/components/null-data"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/useCart"
import { formatPrice } from "@/lib/formatPrice"
import { SafeUser } from "@/types"
import { Product } from "@prisma/client"
import { Trash } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { MdArrowBack } from "react-icons/md"
import CartItem from "./cart-item"

interface Props {
  user: SafeUser | null
  products: Product[]
}

export default function CartClient({ user, products }: Props) {
  const router = useRouter()

  const { cartProducts, cartTotalAmount, handleClearCart } = useCart()

  if (!cartProducts || cartProducts.length === 0 || products.length === 0) return (
    <NullData title="Tu carrito esta vacio">
      <Link
        href="/home"
        className="flex items-center gap-2">
        <MdArrowBack />
        <span>Vamos a comprar</span>
      </Link>
    </NullData>
  )

  return (
    <>
      <div className="grid grid-cols-5 gap-4 pb-3 items-center mt-10 text-sm font-bold md:text-base">
        <div className="col-span-2 justify-self-start">Producto</div>
        <div className="justify-self-center">Precio</div>
        <div className="justify-self-center">Cantidad</div>
        <div className="justify-self-end">Total</div>
      </div>
      <div>
        {cartProducts.map((product) => {
          // Buscar el producto correspondiente en serverProducts
          const matchingProduct = products.find((serverProduct) => serverProduct.id === product.productId);
          // Verificar si se encontró el producto correspondiente
          const stock = matchingProduct ? matchingProduct.stock : 0;
          return (
            <CartItem key={product.id} item={product} stock={stock} />
          )
        })}
      </div>
      <div className="border-t border-slate-200 py-4 flex md:flex-row flex-col justify-between gap-4">
        <div className="max-w-[200px]">
          <Button
            onClick={() => handleClearCart()}
            size="sm"
            variant="destructive"
          >
            <Trash size={16} className="mr-2" />
            Limpiar Carrito
          </Button>
        </div>
        <div className="flex flex-col gap-1 text-sm items-start">
          <div className="flex justify-between w-full text-base font-semibold my-5">
            <span>Subtotal</span>
            <span>{formatPrice(cartTotalAmount)}</span>
          </div>
          <p className="mb-3">Tarifas e impuestos se calculan en el checkout</p>
          <Button
            variant="default"
            className="w-full"
            onClick={() => {
              if (user) router.push("/home/checkout")
              else router.push("/auth")
            }}
          >
            {user ? "Proceder al pago" : "Inicia sesion para continuar"}
          </Button>

          <Link
            href="/"
            className="flex items-center gap-2 mt-3">
            <MdArrowBack />
            <span>Continuar Comprando</span>
          </Link>
        </div>
      </div>
    </>
  )
}
