"use client"

import { Icons } from "@/components/icons"
import Loader from "@/components/loader/loader"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { SafeUser } from "@/types"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import {
  useEffect,
  useState
} from "react"
import {
  FaFacebookF,
  FaGoogle,
  FaTwitter
} from "react-icons/fa"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  user: SafeUser | null
}

export function UserAuthForm({ user, className, ...props }: UserAuthFormProps) {
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push("/home")
      router.refresh()
    }
  }, [router, user])

  const [googleLoading, setGoogleLoading] = useState(false)
  const [facebookLoading, setFacebookLoading] = useState(false)
  const [twitterLoading, setTwitterLoading] = useState(false)

  if (user) return (
    <div className="min-h-[70vh]">
      <Loader />
    </div>
  )

  return (
    <div className={cn("grid gap-4 px-6", className)} {...props}>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Ingresa con
          </span>
        </div>
      </div>

      <Button
        variant="outline"
        type="button"
        disabled={facebookLoading || googleLoading || twitterLoading}
        onClick={() => {
          setGoogleLoading(true)
          signIn("google")
        }}
        className="bg-king-500 border-king-500 text-white hover:bg-king-700 hover:text-white"
      >
        {googleLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <FaGoogle className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>

      <Button
        variant="outline"
        type="button"
        disabled={facebookLoading || googleLoading || twitterLoading}
        onClick={() => {
          setFacebookLoading(true)
          signIn("google")
        }}
        className="border-2 bg-blue-600 border-blue-600 text-white hover:bg-blue-700 hover:text-white"
      >
        {facebookLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <FaFacebookF className="mr-2 h-4 w-4" />
        )}{" "}
        Facebook
      </Button>

      <Button
        variant="outline"
        type="button"
        disabled={facebookLoading || googleLoading || twitterLoading}
        onClick={() => {
          setTwitterLoading(true)
          signIn("google")
        }}
        className="border-2 bg-neutral-800 text-white border-neutral-800 hover:text-white hover:bg-neutral-700"
      >
        {twitterLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <FaTwitter className="mr-2 h-4 w-4" />
        )}{" "}
        Twitter
      </Button>
    </div>
  )
}