import Image from "next/image"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="lg:h-[100vh] h-[40vh] flex-col items-center justify-center lg:grid lg:grid-cols-2 xl:grid-cols-3 px-0">

      <div className="w-full h-full flex-col lg:col-span-1 xl:col-span-2 bg-pink-900 bg-muted p-10 text-white flex">
        <div className="relative z-20 flex items-center gap-6">
          <Image
            src={"/logo.jpg"}
            width={90}
            height={90}
            alt="Ring!"
            className="rounded-full"
          />
          <p className="xl:text-6xl lg:text-5xl text-4xl font-semibold">Dorichangos</p>
        </div>

        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Esta es la mejor forma de comprar comida, encuentra
              tus comidas favoritas en un solo lugar.&rdquo;
            </p>
            <footer className="text-sm">Rodrigo Vazquez Arias</footer>
          </blockquote>
        </div>
      </div>

      <div className="p-8 flex items-center justify-center lg:h-[100vh] h-[60vh]">
        {children}
      </div>
    </div>
  )
}
