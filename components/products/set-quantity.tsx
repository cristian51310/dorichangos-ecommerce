"use client"

import { CartProductType } from "@/types/cart-pruduct-type"
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons"
import { Button } from "../ui/button"

interface SetQuantityProps {
  cartProduct: CartProductType
  handleQtyIncrement: () => void
  handleQtyDecrement: () => void
}

export default function SetQuantity({
  cartProduct,
  handleQtyIncrement,
  handleQtyDecrement,
}: SetQuantityProps) {

  return (
    <div className="flex flex-col md:flex-row justify-center items-center border rounded-md bg-blue-100/30">
      <Button onClick={handleQtyDecrement} variant="link" size="sm">
        <MinusIcon />
      </Button>
      <p className="mx-1 w-6 text-center">
        {cartProduct.quantity}
      </p>
      <Button onClick={handleQtyIncrement} variant="link" size="sm">
        <PlusIcon />
      </Button>
    </div>
  )
}
