import { cn } from "@/lib/utils"

interface Props {
  children: React.ReactNode
  className?: string
  title?: string
}

export default function Section({ children, className, title }: Props) {
  return (
    <div className={cn(
      "p-8 px-6 md:px-24 lg:px-40",
      className
    )}>
      {title && (
        <h2 className="text-2xl font-bold mb-5">
          {title}
        </h2>
      )}
      {children}
    </div>
  )
}