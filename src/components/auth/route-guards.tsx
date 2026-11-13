"use client"

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"
import { LoaderCircleIcon } from "lucide-react"

import { useAuth } from "@/components/auth/auth-provider"

function FullPageSpinner() {
  return (
    <div
      role="status"
      className="flex min-h-svh items-center justify-center text-muted-foreground"
    >
      <LoaderCircleIcon className="size-6 animate-spin" aria-hidden />
      <span className="sr-only">กำลังโหลด…</span>
    </div>
  )
}

/** Only signed-in users see children; guests are sent to /login?next=… */
function RequireAuth({ children }: { children: React.ReactNode }) {
  const { status } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  React.useEffect(() => {
    if (status === "guest") {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`)
    }
  }, [status, router, pathname])

  if (status !== "authenticated") return <FullPageSpinner />
  return children
}

/** Only guests see children (login/register); signed-in users go to the app. */
function GuestOnly({ children }: { children: React.ReactNode }) {
  const { status } = useAuth()
  const router = useRouter()

  React.useEffect(() => {
    if (status === "authenticated") {
      const next = new URLSearchParams(window.location.search).get("next")
      // only allow same-site relative paths
      router.replace(
        next?.startsWith("/") && !next.startsWith("//") ? next : "/dashboard"
      )
    }
  }, [status, router])

  if (status === "authenticated") return <FullPageSpinner />
  return children
}

export { GuestOnly, RequireAuth }
