import prisma from "@/lib/prismadb"

export default async function getBanners() {
  try {
    const banners = await prisma.banner.findMany()

    if (!banners) return null

    return banners
  } catch (err: any) {
    throw new Error(err)
  }
}