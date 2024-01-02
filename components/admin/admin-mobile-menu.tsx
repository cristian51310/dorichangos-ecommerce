"use client"

import { Button, buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { IoMenuOutline } from "react-icons/io5"
import { AdminLinkProps, adminLinks } from "./admin-links"

function MenuItem({ pathname, href, children }: AdminLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant: pathname === href ? "secondary" : "ghost" }),
        "w-full justify-start"
      )}
    >
      {children}
    </Link>
  )
}

export default function AdminMobileMenu() {
  const pathname = usePathname()

  return (
    <div className="flex lg:hidden w-full">
      <div className="border-b border-neutral-300 py-4 px-3 w-full">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <IoMenuOutline className="text-xl" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col justify-between h-full">
              <div className="grid gap-5 mt-4">
                {adminLinks.map((option, index) => (
                  <MenuItem
                    key={index}
                    pathname={pathname}
                    href={option.href}
                  >
                    <option.icon className="text-xl mr-3" />
                    {option.label}
                  </MenuItem>
                ))}
              </div>

              <Button
                onClick={() => signOut()}
              >
                Cerrar sesion
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}