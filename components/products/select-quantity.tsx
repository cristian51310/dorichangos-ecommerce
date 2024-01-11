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

interface Props {
  product: CartProductType
  productStock: number
  handleSelectQty: (value: string) => void
}

export default function SelectQuantity({ product, productStock, handleSelectQty }: Props) {
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
          {Array.from({ length: productStock }, (_, i) => (
            <SelectItem key={i + 1} value={(i + 1).toString()}>{i + 1}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
