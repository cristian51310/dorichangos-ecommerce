"use client"
import SelectQuantity from "@/components/products/select-quantity"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/hooks/useCart"
import { formatPrice } from "@/lib/formatPrice"
import { CartProductType } from "@/types/cart-pruduct-type"
import { Product } from "@prisma/client"
import Image from "next/image"
import {
  useCallback,
  useEffect,
  useState
} from "react"
import { MdCheckCircle } from "react-icons/md"
import { toast } from "sonner"

export default function ProductDetail({ product }: { product: Product }) {
  const { cartProducts, handleAddToCart } = useCart()

  const [isProductInCart, setIsProductInCart] = useState(false)
  const [quantity, setQuantity] = useState("1")

  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: crypto.randomUUID(),
    productId: product.id,
    name: product.name,
    image: product.image,
    quantity: parseInt(quantity),
    price: product.sizes[0].price,
    size: product.sizes[0].name,
  })

  useEffect(() => {
    setIsProductInCart(false)
    if (cartProducts) {
      const existingId = cartProducts.findIndex(item => item.id === product.id)
      if (existingId > -1) { setIsProductInCart(true) }
    }
  }, [cartProducts, product.id])

  const handleSelectQty = useCallback((value: string) => {
    setQuantity(value)
    setCartProduct((prev) => ({ ...prev, quantity: parseInt(value) }))
  }, [])

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

        <p className="leading-7 mt-3.5">
          {product.description}
        </p>

        <Separator className="my-3 md:my-6" />

        <div className="flex flex-col gap-2 mb-8">
          <p className="text-base font-bold">Tamaños disponibles</p>
          <div className="flex gap-2">
            {product.sizes.map((size) => (
              <Button
                key={size.name}
                variant={cartProduct.size === size.name ? "default" : "outline"}
                onClick={() => setCartProduct((prev) => ({ ...prev, size: size.name, price: size.price }))}
              >
                {size.name + " - " + formatPrice(size.price)}
              </Button>
            ))}
          </div>
        </div>

        {isProductInCart && (
          <p className="md:my-4 my-0 text-slate-500 flex items-center gap-3">
            <MdCheckCircle size={20} className="text-green-500" />
            Producto añadido a tu carrito
          </p>
        )}

        <div className="flex items-center gap-4">
          <span className="font-bold">Cantidad:</span>
          <SelectQuantity
            product={cartProduct}
            handleSelectQty={handleSelectQty}
          />
        </div>

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
      </div>
    </div>
  )
}
