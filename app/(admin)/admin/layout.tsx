import { getCurrentUser } from "@/actions/getCurrentUser"
import { Menu } from "@/components/admin/menu"
import { Sidebar } from "@/components/admin/sidebar"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: 'Administracion'
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser()

  if (!user || (user.role !== "ADMIN")) {
    return (
      <div className="w-full min-h-screen px-6 md:px-12 flex flex-col items-center justify-center ">
        <h1 className="text-xl md:text-4xl font-bold text-center mb-4">
          Acceso denegado
        </h1>

        <Link href="/">
          Regresar al inicio
        </Link>
      </div>
    )
  }

  return (
    <>
      <Menu />

      <div className="grid lg:grid-cols-5">
        <Sidebar className="hidden lg:block" />

        <ScrollArea className="col-span-3 lg:col-span-4 lg:border-l h-[90vh]">
          <div className="h-full px-8 py-6 lg:px-8">
            {children}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </>
  )
}