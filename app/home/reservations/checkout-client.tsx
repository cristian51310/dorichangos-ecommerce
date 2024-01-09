"use client"
import { Button } from "@/components/ui/button";
import { Elements } from "@stripe/react-stripe-js";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import CheckoutForm from "./checkout-form";
import Loader from "@/components/loader/loader";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string)

interface Props {
  museumDateId: string
  museumHourId: string
  people: string
}

export default function CheckoutClient({ museumDateId, museumHourId, people }: Props) {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [clientSecret, setClientSecret] = useState("")
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  // actualmente el precio de la reservacion es de 35 pesos por persona
  const amount = 3500

  // create a payment intent as soon as the page loads
  useEffect(() => {
    setLoading(true)
    setError(false)

    fetch("/api/create-payment-intent-reservation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        amount: amount
      })
    })
      .then(res => {
        setLoading(false)
        if (res.status === 401) return router.push("/login")
        return res.json()
      })
      .then(data => {
        setClientSecret(data.paymentIntent.client_secret)
        localStorage.setItem("reservationPaymentIntent", JSON.stringify(data.paymentIntent.id))
      })
      .catch(err => {
        setError(true)
        toast.error("Algo salio mal")
      })
  }, [router, amount])

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "flat",
      labels: "floating"
    }
  }

  const handleSetPaymentSuccess = useCallback((value: boolean) => {
    setPaymentSuccess(value)
  }, [])

  return (
    <div className="w-full">
      {clientSecret && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm
            clientSecret={clientSecret}
            handleSetPaymentSuccess={handleSetPaymentSuccess}
            museumDateId={museumDateId}
            museumHourId={museumHourId}
            people={people}
          />
        </Elements>
      )}

      {loading && (
        <div className="min-h-[60vh]">
          <Loader />
        </div>
      )}
      {error && (
        <div className="min-h-[60vh]">
          <p className="text-2xl text-center text-red-600">Algo salio mal</p>
        </div>
      )}
      {paymentSuccess && (
        <div className="flex flex-col items-center justify-center gap-3 min-h-[60vh]">
          <div>
            <p className="text-5xl font-bold text-center mb-3">Pago exitoso</p>
            <p className="text-xl text-center text-neutral-800 my-4">Gracias por tu compra</p>
          </div>
          <Button onClick={() => router.push("/home/profile/reservations")}>
            Ver mis reservaciones
            <ArrowRight className="ml-2" size={24} />
          </Button>
        </div>
      )}
    </div>
  )
}
