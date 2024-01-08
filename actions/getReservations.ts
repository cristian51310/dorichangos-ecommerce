import prisma from "@/lib/prismadb"

export default async function getReservations() {
  try {
    const reservations = await prisma.reservation.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createDate: "desc"
      }
    })
    return reservations
  } catch (err: any) {
    throw new Error(err)
  }
}
