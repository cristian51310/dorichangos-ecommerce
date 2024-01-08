import prisma from "@/lib/prismadb"

export default async function getReservationsByUser(id: string) {
  try {
    const reservations = await prisma.reservation.findMany({
      where: {
        userId: id
      },
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
