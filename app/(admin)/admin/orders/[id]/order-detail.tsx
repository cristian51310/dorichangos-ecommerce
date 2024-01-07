import Status from "@/components/status"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { formatPrice } from "@/lib/formatPrice"
import { Order } from "@prisma/client"
import moment from "moment"
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from "react-icons/md"
import OrderItems from "./order-item"

interface Props {
  order: Order
}

export default function OrderDetail({ order }: Props) {
  return (
    <>
      <Card>
        <CardContent className="mt-6">
          <p>Total de la orden: {formatPrice(order.amount / 100)}</p>
          <Separator className="my-5" />

          <div className="flex items-center gap-3">
            <p>Estatus de entrega</p>
            {order.deliveryStatus === "pending" ? (
              <Status
                text="Pendiente"
                icon={MdAccessTimeFilled}
                variant="warning"
              />
            ) : order.deliveryStatus === "dispatched" ? (
              <Status
                text="Despachado"
                icon={MdDeliveryDining}
                variant="info"
              />
            ) : order.deliveryStatus === "delivered" ? (
              <Status
                text="Entregado"
                icon={MdDone}
                variant="success"
              />
            ) : <></>}
          </div>

          <Separator className="my-5" />

          <p>Fecha: {moment(order.createDate).fromNow()}</p>
        </CardContent>
      </Card>

      <Card className="mt-5">
        <CardContent className="mt-8">
          <OrderItems products={order.products} />
        </CardContent>
      </Card>
    </>

  )
}