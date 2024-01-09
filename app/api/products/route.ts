import { getCurrentUser } from "@/actions/getCurrentUser";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const user = await getCurrentUser()

  if (!user || user.role !== "ADMIN") return NextResponse.error()

  const body = await request.json()

  const {
    name,
    description,
    sizes,
    image,
    stock,
    categoryID,
  } = body

  // Crea instancias de Size utilizando los datos proporcionados
  const sizeInstances = sizes.map(({ name, price }: { name: string, price: string }) => ({
    name,
    price: parseInt(price),
  }));

  const product = await prisma.product.create({
    data: {
      name,
      description,
      stock: parseInt(stock),
      image,
      categories: {
        connect: { id: categoryID }
      },
      sizes: sizeInstances
    }
  })

  return NextResponse.json(product)
}

export async function PUT(request: Request) {
  const user = await getCurrentUser()

  if (!user) return NextResponse.error()

  if (user.role !== "ADMIN") return NextResponse.error()

  const body = await request.json()

  const {
    id,
    name,
    description,
    image,
    categoryID,
  } = body

  const product = await prisma.product.update({
    where: { id },
    data: {
      name,
      description,
      image,
      categories: {
        connect: { id: categoryID }
      },
    }
  })

  return NextResponse.json(product)
}

export async function PATCH(request: Request) {
  const user = await getCurrentUser()

  if (!user) return NextResponse.error()

  if (user.role !== "ADMIN") return NextResponse.error()

  const body = await request.json()

  const { id, stock } = body

  const product = await prisma.product.update({
    where: { id },
    data: {
      stock: parseInt(stock),
    }
  })

  return NextResponse.json(product)
}