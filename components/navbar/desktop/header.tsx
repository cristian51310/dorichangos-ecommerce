import Link from "next/link"
import { Avatar, AvatarImage } from "../../ui/avatar"

export default async function Header() {
  return (
    <div className="flex h-16 items-center px-6 md:px-12 bg-pink-700">
      <Link
        href="/home"
        className="flex items-center gap-3"
      >
        <Avatar className="h-12 w-12">
          <AvatarImage src="/logo.jpg" alt="@shadcn" />
        </Avatar>
        <p className="hidden md:block text-xl font-semibold text-white">Dorichangos</p>
      </Link>
    </div>
  )
}