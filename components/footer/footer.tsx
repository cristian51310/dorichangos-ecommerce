import { InstagramLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons"
import { FacebookIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="mx-auto w-full p-6 md:p-12 py-6 lg:py-8 border-t">
      <div className="md:flex md:justify-between">

        <div className="flex items-center gap-3 mb-6 md:mb-0">
          <Image
            src={"/logo.jpg"}
            alt="Ring Logo"
            width={75}
            height={75}
            className="rounded-full"
          />
          <span className="self-center text-3xl font-semibold">
            Dorichangos
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-12 sm:grid-cols-2">
          <div className="text-gray-500 font-medium flex flex-col gap-4">
            <Link href="/legal" className="hover:underline">
              Terminos y condiciones
            </Link>
            <Link href="/legal" className="hover:underline">
              Politica de privacidad
            </Link>
          </div>

          <div className="text-gray-500 font-medium flex flex-col gap-4">
            <Link href="/legal" className="hover:underline">
              Nuestras Tarifas
            </Link>
            <Link href="/legal" className="hover:underline">
              Estandares de calidad
            </Link>
          </div>
        </div>
      </div>

      <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />

      <div className="md:flex md:items-center md:justify-between">

        <div className="flex mb-3 md:mb-0 md:justify-center sm:mt-0 gap-5">
          <a href="#" className="text-gray-500 hover:text-gray-900">
            <FacebookIcon className="w-6 h-6" />
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-900">
            <InstagramLogoIcon className="w-6 h-6" />
          </a>
          <a href="#" className="text-gray-500 hover:text-gray-900">
            <TwitterLogoIcon className="w-6 h-6" />
          </a>
        </div>

        <span className="text-sm text-gray-500 text-start md:text-end mt-8 md:mt-0">
          © 2024 Dorichangos S.A. de C.V. Todos los derechos reservados.
        </span>
      </div>
    </footer>
  )
}