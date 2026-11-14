import type { Metadata } from "next"
import { Geist_Mono, IBM_Plex_Sans_Thai } from "next/font/google"

import "./globals.css"
import { AuthProvider } from "@/components/auth/auth-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/Sonner"
import { TooltipProvider } from "@/components/ui/Tooltip"
import { site } from "@/lib/site"
import { cn } from "@/lib/utils"

// One font for the whole app: IBM Plex Sans Thai (static font, so weights
// must be listed). It sets --font-plex-thai; globals.css maps the Tailwind
// --font-sans and --font-heading tokens to it. Keep the names different:
// a token named after the variable it reads (--font-sans: var(--font-sans))
// is a self-reference that only works by cascade luck.
const fontSans = IBM_Plex_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-thai",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="th"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        "font-sans",
        fontSans.variable,
        fontMono.variable
      )}
    >
      <body>
        <ThemeProvider>
          <AuthProvider>
            <TooltipProvider>{children}</TooltipProvider>
          </AuthProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
