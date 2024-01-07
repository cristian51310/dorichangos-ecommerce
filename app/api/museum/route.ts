import { getCurrentUser } from "@/actions/getCurrentUser";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const user = await getCurrentUser()

  if (!user || user.role !== "ADMIN") return NextResponse.error()

  const body = await request.json()

  const { date, items } = body

  const createdMuseumDate = await prisma.museumDate.create({
    data: {
      date: new Date(date),
      hours: {
        create: items.map((item: any) => ({
          hour: item,
        })),
      },
    },
    include: {
      hours: true,
    },
  });

  return NextResponse.json(createdMuseumDate)
}