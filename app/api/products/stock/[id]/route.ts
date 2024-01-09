import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string } }
) {
  const id = params.id

  const product = await prisma?.product.findUnique({
    where: { id },
  })

  return NextResponse.json(product)
}