import type { Metadata } from "next"

import { AccountSettings } from "@/components/account/account-settings"
import { PageHeader } from "@/components/app-shell/page-header"

export const metadata: Metadata = { title: "ข้อมูลบัญชี" }

export default function AccountPage() {
  return (
    <>
      <PageHeader
        title="ข้อมูลบัญชี"
        description="แก้ไขข้อมูลส่วนตัวและรหัสผ่านของคุณ"
      />
      <AccountSettings />
    </>
  )
}
