"use client"
import SetQuantity from "@/components/products/set-quantity"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/useCart"
import { formatPrice } from "@/lib/formatPrice"
import { truncateText } from "@/lib/truncateText"
import { CartProductType } from "@/types/cart-pruduct-type"
import { Trash2Icon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"

interface ItemContentProps {
  item: CartProductType
}

export default function CartItem({ item }: ItemContentProps) {
  const { handleRemoveFromCart, handleCartQtyIncrease, handleCartQtyDecrement } = useCart()

  return (
    <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-t border-slate-200 py-4">
      <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
        <Link href={`/product/${item.id}`}>
          <div className="relative w-[90px] aspect-square">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover rounded-xl"
            />
          </div>
        </Link>
        <div className="flex flex-col justify-between">
          <Link href={`/product/${item.id}`}>
            {truncateText(item.name)}
          </Link>
          <div className="w-[90px]">
            <Button
              variant={"outline"}
              size={"sm"}
              onClick={() => {
                handleRemoveFromCart(item)
                toast.success('Producto eliminado')
              }}
            >
              <Trash2Icon size={16}/>
            </Button>
          </div>
        </div>
      </div>
      <div className=" justify-self-center">
        {formatPrice(item.price)}
      </div>
      <div className="justify-self-center">
        <SetQuantity
          cartProduct={item}
          handleQtyDecrement={() => handleCartQtyDecrement(item)}
          handleQtyIncrement={() => handleCartQtyIncrease(item)}
        />
      </div>
      <div className=" justify-self-end font-semibold">
        {formatPrice(item.price * item.quantity)}
      </div>
    </div>
  )
}
