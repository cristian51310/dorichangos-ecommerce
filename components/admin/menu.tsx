"use client"

import { Menubar } from "@/components/ui/menubar"
import { cn } from "@/lib/utils"
import { signOut } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { IoLogOutOutline, IoNotificationsOutline, IoStorefrontOutline } from "react-icons/io5"
import { Button, buttonVariants } from "../ui/button"
import AdminMobileMenu from "./admin-mobile-menu"

export function Menu() {
  const router = useRouter()

  return (
    <Menubar className="rounded-none bg-pink-300 border-y border-none px-2 lg:px-4 py-9 justify-between">
      <div className="flex items-center justify-center font-bold gap-2 ml-3">
        <Image
          src="/logo.jpg"
          alt="Dorichangos Logo"
          width={40}
          height={40}
          className="rounded-full"
        />
        <span className="md:block hidden">
          Dorichangos
        </span>
      </div>

      <div className="flex items-center gap-3">

        <Link
          href="/admin/notifications"
          className={cn(
            buttonVariants({ variant: "outline", size: "icon" }),
            "hidden md:flex"
          )}
        >
          <IoNotificationsOutline className="text-xl" />
        </Link>

        <Button
          variant="default"
          onClick={() => router.push("/home")}
          className="md:px-3 md:m-0 -mr-4"
        >
          <span className="md:block hidden">
            Ir a la tienda
          </span>
          <IoStorefrontOutline className="text-lg md:ml-2" />
        </Button>

        <Button
          variant="destructive"
          onClick={() => signOut()}
          className="md:flex hidden"
        >
          <span className="md:block hidden">
            Cerrar Sesion
          </span>
          <IoLogOutOutline className="text-xl md:ml-2" />
        </Button>

        <AdminMobileMenu />
      </div>

    </Menubar>
  )
}