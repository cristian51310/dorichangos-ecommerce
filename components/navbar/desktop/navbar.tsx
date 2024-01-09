"use client"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { SafeUser } from "@/types"
import { Category } from "@prisma/client"
import Link from "next/link"
import { Button } from "../../ui/button"
import { CartSheet } from "../cart-sheet"
import Dropdown from "../categories-dropdown"
import { UserMenu } from "../user-menu"

export interface Props {
  user: SafeUser | null
  categories: Category[]
}

export default function Navbar({ user, categories }: Props) {
  return (
    <div className="transition items-center justify-between w-full bg-pink-600 h-16 px-6 md:px-12">
      <div className="w-full mx-auto relative flex items-center justify-between">
        <div className="flex gap-12">
          <Link
            href="/home"
            className="flex items-center gap-3"
          >
            <Avatar className="h-10 w-10">
              <AvatarImage src="/logo.jpg" alt="@shadcn" />
            </Avatar>
            <p className="hidden md:block text-2xl font-black text-white">Dorichangos</p>
          </Link>

          <Dropdown
            categories={categories}
          />
        </div>

        <div className="flex items-center gap-3">
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