import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function BannerMuseo() {
  return (
    <div className="bg-orange-200 fixed bottom-0 left-24 right-24 h-16 rounded-t-full cursor-pointer">
      <div className="flex items-center justify-center h-full">
        <span className="flex items-center gap-4 hover:gap-6 transition-all duration-300">

          <Link href="/home" className="text-center font-bold text-xl">
            Tunel de los remedios, reserva tu visita aqui
          </Link>

          <ArrowRight className="w-6 h-6" />
        </span>
      </div>
    </div>
  )
}