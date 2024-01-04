import { getCurrentUser } from "@/actions/getCurrentUser"
import Section from "@/components/section"
import CartClient from "./cart-client"

export default async function CartPage() {
  const user = await getCurrentUser()

  return (
    <Section>
      <h1 className="text-3xl font-bold mb-4">Carrito de compras</h1>

      <CartClient user={user} />
    </Section>
  )
}