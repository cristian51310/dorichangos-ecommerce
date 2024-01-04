import { cn } from "@/lib/utils"

interface Props {
  children: React.ReactNode
  className?: string
}

export default function Section({ children, className }: Props) {
  return (
    <div className={cn(
      "p-8 px-6 md:px-24 lg:px-40",
      className
    )}>
      {children}
    </div>
  )
}