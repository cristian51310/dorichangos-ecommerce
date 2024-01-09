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
  icons: { apple: "/icon.jpg" }
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
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster richColors />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
