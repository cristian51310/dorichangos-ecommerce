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
    price,
    image,
    stock,
    categoryID,
  } = body

  const product = await prisma.product.create({
    data: {
      name,
      description,
      price: parseFloat(price),
      stock: parseInt(stock),
      image,
      categories: {
        connect: { id: categoryID }
      },
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
    price,
    image,
    stock,
    categoryID,
  } = body

  const product = await prisma.product.update({
    where: { id },
    data: {
      name,
      description,
      price: parseFloat(price),
      stock: parseInt(stock),
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

  const product = await prisma.product.update({
    where: { id: body.id },
    data: {
      stock: body.stock,
    }
  })

  return NextResponse.json(product)
}