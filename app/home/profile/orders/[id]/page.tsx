import getOrderById from "@/actions/getOrderById"
import NullData from "@/components/null-data"
import Section from "@/components/section"
import OrderDetail from "./order-detail"

interface IParams {
  id: string
}

export default async function OrderDetailPage({ params }: { params: IParams }) {
  const order = await getOrderById(params)

  if (order === null) return <NullData title="Orden no encontrada" />

  return (
    <Section title="Detalle de la orden">
      <OrderDetail order={order} />
    </Section>
  )
}
