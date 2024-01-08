import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function BannerMuseo() {
  return (
    <div className="bg-orange-200 absolute bottom-0 left-0 right-0 h-16 rounded-t-3xl cursor-pointer">
      <div className="flex items-center justify-center h-full">
        <span className="flex items-center gap-2 md:gap-4 hover:gap-6 transition-all duration-300">
          <Link href="/home" className="text-center font-bold text-base md:text-xl">
            Tunel de los remedios, reserva tu visita aqui
          </Link>
          <ArrowRight className="md:w-6 w-5" />
        </span>
      </div>
    </div>
  )
}