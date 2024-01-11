"use client"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { SafeUser } from "@/types"
import Link from "next/link"
import { Button } from "../../ui/button"
import { CartSheet } from "../cart-button"
import { UserMenu } from "../user-menu"

export default function Header({ user }: { user: SafeUser | null }) {
  return (
    <div className="flex transition items-center w-full mx-auto relative bg-almond-500 h-16 px-6 md:px-12">

      <div className="flex items-center gap-3 justify-between w-full">
        <Link
          href="/home"
          className="flex items-center gap-3"
        >
          <Avatar className="h-10 w-10">
            <AvatarImage src="/logo.jpg" alt="@shadcn" />
          </Avatar>
          <p className="hidden md:block text-2xl font-black text-white">Dorichangos</p>
        </Link>

        <div className="flex justify-center items-center gap-3">
          {user && (<UserMenu user={user} />)}

          <CartSheet />

          {!user && (
            <Link
              href="/auth"
              className="hover:scale-105 transition-all duration-300"
            >
              <Button variant="outline">
                Iniciar Sesion
              </Button>
            </Link>
          )}

        </div>

      </div>

    </div>
  )
}