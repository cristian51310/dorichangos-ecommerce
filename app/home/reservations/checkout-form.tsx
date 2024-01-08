"use client"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/formatPrice"
import {
  PaymentElement,
  useElements,
  useStripe
} from "@stripe/react-stripe-js"
import axios from "axios"
import { useEffect, useState } from "react"
import { toast } from "sonner"

interface Props {
  clientSecret: string
  handleSetPaymentSuccess: (value: boolean) => void
  museumDateId: string
  museumHourId: string
  people: string
}

export default function CheckoutForm({
  clientSecret,
  handleSetPaymentSuccess,
  museumDateId,
  museumHourId,
  people,
}: Props) {
  const [loading, setLoading] = useState(false)
  const stripe = useStripe()
  const elements = useElements()

  useEffect(() => {
    if (!stripe || !clientSecret) return
    handleSetPaymentSuccess(false)
  }, [stripe, clientSecret, handleSetPaymentSuccess])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    stripe
      .confirmPayment({
        elements,
        redirect: "if_required"
      })
      .then(async (result) => {
        if (!result.error) {
          toast.success("Pago exitoso");

          await axios.post("/api/reservations", {
            museumDateId: museumDateId,
            museumHourId: museumHourId,
            people: people,
            payment_intent_id: localStorage.getItem("reservationPaymentIntent"),
          });

          handleSetPaymentSuccess(true);
        } else {
          // Manejar el caso en que hay un error en el pago
          toast.error("Error en el pago: " + result.error.message);
        }
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} id="payment-form">
      <div className="mb-6">
        <h1 className="text-xl font-bold mb-4">Ingresa tus datos</h1>

        <h2 className="font-semibold my-4">Informacion de pago</h2>

        <PaymentElement
          id="payment-element"
          options={{
            layout: "tabs",
          }}
        />

        <p className="py-4 text-center text-slate-700 dark:text-neutral-400 text-lg font-bold">
          Total del pago ({formatPrice(35 * parseInt(people))})
        </p>

        <Button
          disabled={loading || !stripe || !elements}
          className="w-full mt-4"
        >
          {loading ? "Cargando..." : "Pagar"}
        </Button>
      </div>
    </form>
  )
}
