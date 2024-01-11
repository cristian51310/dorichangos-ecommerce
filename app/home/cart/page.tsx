import { getCurrentUser } from "@/actions/getCurrentUser"
import getProducts from "@/actions/getProducts"
import Section from "@/components/section"
import CartClient from "./cart-client"

export default async function CartPage() {
  const user = await getCurrentUser()
  const products = await getProducts()

  return (
    <Section>
      <h1 className="text-3xl font-bold mb-4">Carrito de compras</h1>

      <CartClient user={user} products={products} />
    </Section>
  )
}