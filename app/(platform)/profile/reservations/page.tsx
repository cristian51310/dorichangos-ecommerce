import { getCurrentUser } from "@/actions/getCurrentUser";
import getReservationsByUser from "@/actions/getReservationsByUser";
import NullData from "@/components/null-data";
import Section from "@/components/section";
import { ReservationsClient } from "./reservations-client";

export default async function OrdersPage() {
  const user = await getCurrentUser()

  if (!user) return <NullData title="Acceso Denegado" />

  const reservations = await getReservationsByUser(user.id)

  if (!reservations) return <NullData title="No hay reservaciones" />

  return (
    <Section title="Mis reservaciones" className=" min-h-[70vh]">
      <ReservationsClient reservations={reservations} />
    </Section>
  )
}