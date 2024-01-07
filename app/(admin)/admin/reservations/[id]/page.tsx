import getOrderById from "@/actions/getOrderById"
import NullData from "@/components/null-data"
import OrderDetail from "./order-detail"

interface IParams {
  id: string
}

export default async function OrderDetailPage({ params }: { params: IParams }) {

  const order = await getOrderById(params)

  if (order === null) return <NullData title="Orden no encontrada" />

  return (
    <>
      <h1 className="text-xl font-bold mb-4">Detalle de la orden</h1>
      <OrderDetail order={order} />
    </>
  )
}
