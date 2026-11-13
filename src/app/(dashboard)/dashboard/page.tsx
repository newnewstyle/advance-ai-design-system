import type { Metadata } from "next"

import { PageHeader } from "@/components/app-shell/page-header"
import { Overview } from "@/components/dashboard/overview"

export const metadata: Metadata = { title: "ภาพรวม" }

export default function DashboardPage() {
  return (
    <>
      <PageHeader title="ภาพรวม" description="สรุปบ้านเช่าของคุณ" />
      <Overview />
    </>
  )
}
