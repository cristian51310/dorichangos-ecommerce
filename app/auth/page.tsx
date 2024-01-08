import { getCurrentUser } from "@/actions/getCurrentUser"
import { Metadata } from "next"
import { UserAuthForm } from "./auth-form"

export const metadata: Metadata = {
  title: "Dorichangos | Inicia sesion",
  description: "Nos da gusto que vuelvas, inicia sesion para continuar",
}

export default async function AuthenticationPage() {
  const user = await getCurrentUser()

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 lg:p-8">

      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-3xl md:text-4xl font-bold sm:my-5 my-3">
          Inicia sesion
        </h1>
        <p className="text-base text-muted-foreground">
          Estamos felices de que hayas vuelto
        </p>
      </div>

      <UserAuthForm user={user} />
    </div>
  )
}