import Link from "next/link"
import { Building2Icon } from "lucide-react"

import { GuestOnly } from "@/components/auth/route-guards"
import { site } from "@/lib/site"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <GuestOnly>
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-4 sm:p-6">
        <Link
          href="/login"
          className="flex items-center gap-2 font-heading text-lg font-semibold"
        >
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Building2Icon className="size-4" aria-hidden />
          </span>
          {site.name}
        </Link>
        <main className="w-full max-w-sm">{children}</main>
      </div>
    </GuestOnly>
  )
}
