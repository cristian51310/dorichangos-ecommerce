import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function HeaderMuseum() {
  return (
    <Link
      href="/home/reservations"
      className="h-12 p-4 flex justify-center items-center bg-white text-red-600 font-bold group   cursor-pointer"
    >
      <div className="relative flex justify-center items-center">
        Ven a conocer nuestro museo <span className="hidden md:flex">, sabemos que te encantará</span>
        <ArrowRight className="absolute -right-8 w-5 h-5 group-hover:-right-12" />
      </div>
    </Link>
  )
}