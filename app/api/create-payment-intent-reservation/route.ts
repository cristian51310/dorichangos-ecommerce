import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: "2023-10-16" })

export async function POST(request: Request) {
  const user = await getCurrentUser()

  if (!user) return NextResponse.json(
    { error: "No autorizado" },
    { status: 401 }
  )

  const body = await request.json()

  const { amount } = body

  if (amount === 0) {
    return NextResponse.json(
      { error: "El total de la orden no puede ser 0" },
      { status: 400 }
    )
  }

  if (!user.email) {
    return NextResponse.json(
      { error: "El usuario no tiene un correo electronico" },
      { status: 400 }
    )
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "mxn",
    receipt_email: user.email,
    automatic_payment_methods: { enabled: true },
  })

  return NextResponse.json({ paymentIntent })
}