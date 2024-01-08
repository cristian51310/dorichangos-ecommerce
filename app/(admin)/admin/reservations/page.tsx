import getReservations from "@/actions/getReservations"
import { DataTableDemo } from "./manage-orders"

export default async function ManageProductsPage() {
  const reservations = await getReservations()

  return (
    <>
      <h1 className="text-xl font-bold mb-4">Administrar Reservaciones</h1>
      <DataTableDemo reservations={reservations} />
    </>
  )
}