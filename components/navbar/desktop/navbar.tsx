"use client"
import { SafeUser } from "@/types"
import { Category } from "@prisma/client"
import Link from "next/link"
import { Button } from "../../ui/button"
import { CartSheet } from "../cart-sheet"
import Dropdown from "../categories-dropdown"
import { UserMenu } from "../user-menu"

export default function Navbar({ user, categories }: { user: SafeUser | null, categories: Category[] }) {
  return (
    <div className="transition items-center justify-between w-full bg-pink-600 h-16 px-6 md:px-12">
      <div className="w-full mx-auto relative flex items-center justify-between">
        <Dropdown
          categories={categories}
        />

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <CartSheet />
              <UserMenu user={user} />
            </>
          ) : (
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