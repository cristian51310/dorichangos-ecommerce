import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/components/null-data";
import Section from "@/components/section";
import CheckoutClient from "./checkout-client";

export default async function CheckoutPage() {
  const user = await getCurrentUser()

  if (!user) return (
    <NullData title="Inicia sesion para continuar" />
  )

  return (
    <Section>
      <CheckoutClient />
    </Section>
  )
}
