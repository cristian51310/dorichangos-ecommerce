"use client"
import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/useCart"
import { useRouter } from "next/navigation"
import { HiOutlineShoppingCart } from "react-icons/hi2"

export function CartSheet() {
  const { cartTotalQty } = useCart()
  const router = useRouter()

  return (
    <Button
      variant="outline"
      className="text-muted-foreground px-2.5 md:px-5"
      onClick={() => router.push("/cart")}
    >
      <HiOutlineShoppingCart className="text-lg md:mr-1.5 text-black" />
      <p className="hidden md:block">{cartTotalQty} Productos</p>
    </Button>
  )
}
