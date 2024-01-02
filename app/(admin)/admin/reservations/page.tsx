import CalendarAdmin from "./calendar";

export default async function OrdersPage() {
  return (
    <>
      <h1 className="text-xl font-bold mb-6">Administrar Reservaciones</h1>
      <CalendarAdmin />
    </>
  )
}