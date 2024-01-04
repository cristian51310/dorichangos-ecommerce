import prisma from "@/lib/prismadb"

export default async function getProductsByCategory(categoryName: string) {
  try {
    const products = await prisma.product.findMany({
      where: {
        categories: {
          some: {
            name: categoryName
          }
        }
      }
    })
    
    return products
  } catch (err: any) {
    throw new Error(err)
  }
}