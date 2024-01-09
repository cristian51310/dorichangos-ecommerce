"use client"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useCart } from "@/hooks/useCart"
import { formatPrice } from "@/lib/formatPrice"
import { truncateText } from "@/lib/truncateText"
import { CartProductType } from "@/types/cart-pruduct-type"
import axios from "axios"
import { Trash2Icon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useCallback, useEffect, useState } from "react"
import { toast } from "sonner"

export default function CartItem({ item }: { item: CartProductType }) {
  const { handleRemoveFromCart, handleCartQtySelect } = useCart()

  const [stock, setStock] = useState(0)
  const [quantity, setQuantity] = useState("")

  // obtener el stock del producto
  useEffect(() => {
    setQuantity(item.quantity.toString())
    axios.get(`/api/products/stock/${item.productId}`)
      .then(res => setStock(res.data.stock))
      .catch(err => console.log(err))
  }, [item.productId, item.quantity])

  const handleSelect = useCallback((value: string) => {
    toast.success('Cantidad actualizada')
    setQuantity(value)
    handleCartQtySelect(item, value)
  }, [handleCartQtySelect, item])

  return (
    <div className="grid grid-cols-5 text-xs md:text-sm gap-4 border-t border-slate-200 py-4">
      <div className="col-span-2 justify-self-start flex flex-col md:flex-row gap-2 md:gap-4">
        <Link href={`/product/${item.id}`}>
          <div className="relative w-[120px] aspect-square">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover rounded-xl"
            />
          </div>
        </Link>
        <div className="flex flex-col justify-between gap-4">
          <Link href={`/product/${item.id}`}>
            <p className="font-bold text-2xl text-rose-900">{truncateText(item.name)}</p>
            <p className="font-semibold mt-1">{item.size}</p>
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
              <Trash2Icon size={16} />
            </Button>
          </div>

        </div>
      </div>
      <div className="justify-self-center">
        {formatPrice(item.price)}
      </div>
      <div className="justify-self-center">
        <Select
          value={quantity}
          onValueChange={handleSelect}
        >
          <SelectTrigger className="w-full px-6 gap-2">
            <SelectValue placeholder="Cantidad" />
          </SelectTrigger>
          <SelectContent className="w-full">
            <SelectGroup>
              <SelectLabel>Cantidad</SelectLabel>
              {Array.from({ length: stock }, (_, i) => (
                <SelectItem key={i + 1} value={(i + 1).toString()}>{i + 1}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className=" justify-self-end font-semibold">
        {formatPrice(item.price * item.quantity)}
      </div>
    </div>
  )
}
