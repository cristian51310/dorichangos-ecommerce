import { cn } from "@/lib/utils"
import { SafeUser } from "@/types"
import { Category } from "@prisma/client"
import Header from "./header"
import Navbar from "./navbar"

interface Props {
  className?: string
  user: SafeUser | null
  categories: Category[]
}

export default async function NavbarMobile({ className, user, categories }: Props) {
  return (
    <div className={cn(className)}>
      <Header
        user={user}
      />
      <Navbar
        categories={categories}
      />
    </div>
  )
}