import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/providers/theme-provider'
import type { Metadata } from 'next'
import { Inter as FontSans } from "next/font/google"
import './globals.css'
import { Toaster } from 'sonner'

export const fontSans = FontSans({
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
          <Toaster 
            richColors
          />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
