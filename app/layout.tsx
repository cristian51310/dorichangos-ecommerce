import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/providers/theme-provider'
import { Onest } from "next/font/google"
import { Toaster } from 'sonner'
import './globals.css'

import type { Metadata } from 'next'

const fontSans = Onest({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: 'Dorichangos',
  description: 'Tu comida favorita en dorichangos',
  manifest: '/manifest.webmanifest',
  icons: [
    {
      url: '/logo.jpg',
      href: '/logo.jpg',
    }
  ]
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={cn(
          "bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
       <Toaster richColors />
          {children}
      </body>
    </html>
  )
}
