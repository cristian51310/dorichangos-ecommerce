import prisma from "@/lib/prismadb"

export default async function getRelatedProducts(excludedId: string) {
  try {
    const products = await prisma.product.findMany({
      take: 5,
      where: {
        NOT: {
          id: excludedId
        }
      }
    })
    return products
  } catch (err: any) {
    throw new Error(err)
  }
}
