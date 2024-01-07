import { getCurrentUser } from "@/actions/getCurrentUser";
import getOrdersByUserId from "@/actions/getOrdersByUser";
import NullData from "@/components/null-data";
import Section from "@/components/section";
import { OrdersClient } from "./orders-client";

export default async function OrdersPage() {
  const user = await getCurrentUser()

  if (!user) return <NullData title="Acceso Denegado" />

  const orders = await getOrdersByUserId(user.id)

  if (!orders) return <NullData title="No hay ordenes" />

  return (
    <Section title="Mis ordenes" className=" min-h-[70vh]">
      <OrdersClient orders={orders} />
    </Section>
  )
}