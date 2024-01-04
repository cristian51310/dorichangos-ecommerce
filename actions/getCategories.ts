import prisma from "@/lib/prismadb"

export default async function getCategories() {
  try {
    const categories = await prisma.category.findMany()
    return categories
  } catch (err: any) {
    throw new Error(err)
  }
}