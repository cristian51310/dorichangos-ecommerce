import { InstagramLogoIcon, TwitterLogoIcon } from "@radix-ui/react-icons"
import { FacebookIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="mx-auto w-full p-6 md:p-12 py-6 lg:py-8 border-t">
      <div className="md:flex md:justify-between">
        <div className="mb-6 md:mb-0">
          <div className="flex items-center gap-3">
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
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-12 sm:grid-cols-2">
          <div className="text-gray-500 font-medium flex flex-col gap-4">
            <a href="#" className="hover:underline ">
              Terminos y condiciones
            </a>
            <Link href="/pricing" className="hover:underline">
              Politica de privacidad
            </Link>
          </div>

          <div className="text-gray-500 font-medium flex flex-col gap-4">
            <a href="#" className="hover:underline">
              Nuestras tarifas
            </a>
            <a href="#" className="hover:underline">
              Estandares de calidad
            </a>
          </div>
        </div>
      </div>

      <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />

      <div className="md:flex md:items-center md:justify-between">
        <div className="flex mt-4 md:justify-center sm:mt-0 gap-5">
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
        <div className="flex flex-col gap-3 mt-8 md:mt-0">
          <span className="text-sm text-gray-500 text-start md:text-end mt-2 md:mt-0">
            © 2023 Dorichangos SA de CV™. Todos los derechos reservados.
          </span>
        </div>
      </div>
    </footer>
  )
}