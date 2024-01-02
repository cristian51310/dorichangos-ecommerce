import prisma from "@/lib/prismadb"

export default async function getMenusByRestaurant() {
  try {
    const menus = await prisma.menu.findMany()

    return menus
  } catch (err: any) {
    throw new Error(err)
  }
}