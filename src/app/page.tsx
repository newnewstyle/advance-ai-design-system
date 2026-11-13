import type { Metadata } from "next"

import { ComponentGallery } from "@/components/showcase/component-gallery"

export const metadata: Metadata = { title: "Design System" }

/** Home page: every design-system component on one page. Public (no login). */
export default function Home() {
  return <ComponentGallery />
}
