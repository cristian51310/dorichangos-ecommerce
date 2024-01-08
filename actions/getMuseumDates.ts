import prisma from "@/lib/prismadb"

export default async function getMuseumDates() {
  try {
    const museumDates = await prisma.museumDate.findMany({
      where: {
        date: {
          gte: new Date(),
        }
      }
    })
    return museumDates
  } catch (err: any) {
    throw new Error(err)
  }
}