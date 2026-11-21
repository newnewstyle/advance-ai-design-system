import type { Preview } from "@storybook/nextjs-vite"
import { withThemeByDataAttribute } from "@storybook/addon-themes"
import { Geist_Mono, IBM_Plex_Sans_Thai } from "next/font/google"

import "../src/app/globals.css"
import { Toaster } from "../src/components/ui/Sonner"
import { TooltipProvider } from "../src/components/ui/Tooltip"

// Same fonts and variable names as src/app/layout.tsx.
const fontSans = IBM_Plex_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-thai",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

// Put the font variables on <html> (like the app's root layout) so that
// portalled content (dialogs, menus, tooltips) gets the font too.
document.documentElement.lang = "th"
document.documentElement.classList.add(
  "antialiased",
  "font-sans",
  fontSans.variable,
  fontMono.variable
)

const preview: Preview = {
  parameters: {
    layout: "centered",
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
  },
  decorators: [
    // Toolbar theme switch; uses data-theme like next-themes does in the app.
    withThemeByDataAttribute({
      themes: { light: "light", dark: "dark" },
      defaultTheme: "light",
      attributeName: "data-theme",
    }),
    (Story) => (
      <TooltipProvider>
        <Story />
        <Toaster />
      </TooltipProvider>
    ),
  ],
}

export default preview
