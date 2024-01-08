import { getCurrentUser } from "@/actions/getCurrentUser"
import prisma from "@/lib/prismadb"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const user = await getCurrentUser()

  if (!user) return NextResponse.error()

  const body = await request.json()

  const {
    museumDateId,
    museumHourId,
    people,
    payment_intent_id
  } = body

  const museumDate = await prisma.museumDate.findUnique({
    where: { id: museumDateId }
  })

  if (!museumDate) return NextResponse.error()

  const museumHour = await prisma.museumHour.findUnique({
    where: { id: museumHourId }
  })

  if (!museumHour) return NextResponse.error()

  const amount = parseInt(people) * 3500

  const reservation = await prisma.reservation.create({
    data: {
      user: {
        connect: { id: user.id }
      },
      amount: amount,
      currency: "mxn",
      paymentIntentId: payment_intent_id,
      reservationDate: new Date(museumDate.date),
      reservationHour: museumHour.hour,
      quantity: parseInt(people),
    }
  })

  // actualizar el campo available de la tabla museumhour
  // restarle la cantidad de personas que se reservaron
  await prisma.museumHour.update({
    where: { id: museumHourId },
    data: { available: museumHour.available - parseInt(people) }
  })

  return NextResponse.json(reservation)
}
