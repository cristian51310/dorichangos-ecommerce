"use client"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CartProductType } from "@/types/cart-pruduct-type"
import axios from "axios"
import { useEffect, useState } from "react"

interface Props {
  product: CartProductType
  handleSelectQty: (value: string) => void
}

export default function SelectQuantity({ product, handleSelectQty }: Props) {
  const [stock, setStock] = useState(0)

  // obtener el stock del producto
  useEffect(() => {
    axios.get(`/api/products/stock/${product.productId}`)
      .then(res => setStock(res.data.stock))
      .catch(err => console.log(err))
  }, [product.productId])

  return (
    <Select
      value={product.quantity.toString()}
      onValueChange={handleSelectQty}
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
  )
}
