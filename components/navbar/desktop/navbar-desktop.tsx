import { SafeUser } from "@/types"
import { Category } from "@prisma/client"
import Navbar from "./navbar"

interface Props {
  className?: string
  user: SafeUser | null
  categories: Category[]
}

export default async function NavbarDesktop({ className, user, categories }: Props) {
  return (
    <div className={className}>
      <Navbar
        user={user}
        categories={categories}
      />
    </div>
  )
}