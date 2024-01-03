import { getCurrentUser } from "@/actions/getCurrentUser";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const user = await getCurrentUser()

  if (!user || user.role !== "ADMIN") return NextResponse.error()

  const body = await request.json()
  const { image } = body

  const promocional = await prisma.banner.create({
    data: {
      image
    }
  })

  return NextResponse.json(promocional)
}

export async function DELETE(request: Request) {
  const user = await getCurrentUser()

  if (!user || user.role !== "ADMIN") return NextResponse.error()

  const body = await request.json()
  const { id } = body

  const promocional = await prisma.banner.delete({
    where: {
      id
    }
  })

  return NextResponse.json(promocional)
}