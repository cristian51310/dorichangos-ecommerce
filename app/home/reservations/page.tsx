import Section from "@/components/section";
import ReservationsForm from "./reservations-form";
import getMuseumDates from "@/actions/getMuseumDates";
import getMuseumHours from "@/actions/getMuseumHours";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/components/null-data";

export default async function ReservationsPage(){
  const days = await getMuseumDates()
  const hours = await getMuseumHours(days)
  const user = await getCurrentUser()

  if (!user) return (
    <NullData title="Inicia sesion para continuar" />
  )

  return(
    <Section title="¿Que dia quieres acompañarnos?">
      <ReservationsForm days={days} hours={hours} />
    </Section>
  )
}