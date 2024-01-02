"use client"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AdminLinkProps, adminLinks } from "./admin-links"

function SideBarItem({ pathname, href, children }: AdminLinkProps) {
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

export function Sidebar({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const pathname = usePathname()

  return (
    <div className={cn("min-h-[calc(100vh-80px)] space-y-4 p-4", className)}>
      <h2 className="mb-6 mt-4 px-4 text-xl font-bold">Dashboard</h2>
      <div className="grid gap-2">
        {adminLinks.map((option, index) => (
          <SideBarItem
            key={index}
            pathname={pathname}
            href={option.href}
          >
            <option.icon className="text-xl mr-3" />
            {option.label}
          </SideBarItem>
        ))}
      </div>
    </div>
  )
}