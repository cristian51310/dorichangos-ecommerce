import prisma from "@/lib/prismadb"
import { MuseumDate } from "@prisma/client"

export default async function getMuseumHours(museumDates: MuseumDate[]) {
  try {
    const museumHours = await prisma.museumHour.findMany({
      where: {
        museumDateId: {
          in: museumDates.map((museumDate) => museumDate.id),
        }
      }
    })

    return museumHours
  } catch (err: any) {
    throw new Error(err)
  }
}