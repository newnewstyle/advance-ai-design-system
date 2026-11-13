import type { Metadata } from "next"

import { LoginForm } from "@/components/auth/login-form"

export const metadata: Metadata = { title: "เข้าสู่ระบบ" }

export default function LoginPage() {
  return <LoginForm />
}
