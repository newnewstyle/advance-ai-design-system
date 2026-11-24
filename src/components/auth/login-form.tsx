"use client"

import * as React from "react"
import Link from "next/link"

import { useAuth } from "@/components/auth/auth-provider"
import { FormField, PasswordField } from "@/components/auth/form-field"
import { Button } from "@/components/ui/Button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import {
  collectErrors,
  validateEmail,
  validateRequired,
  type FieldErrors,
} from "@/lib/auth/validation"
import { seedUsers } from "@/lib/mock/users"

type Field = "email" | "password"

const demo = seedUsers[0]

export function LoginForm() {
  const { login } = useAuth()
  const [values, setValues] = React.useState({ email: "", password: "" })
  const [errors, setErrors] = React.useState<FieldErrors<Field>>({})
  const [formError, setFormError] = React.useState<string>()
  const [pending, setPending] = React.useState(false)

  const set = (field: Field) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues((v) => ({ ...v, [field]: e.target.value }))

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFormError(undefined)
    const found = collectErrors<Field>({
      email: validateEmail(values.email),
      password: validateRequired(values.password, "รหัสผ่าน"),
    })
    setErrors(found ?? {})
    if (found) return

    setPending(true)
    const result = await login(values.email, values.password)
    setPending(false)
    // On success <GuestOnly> notices the session and redirects.
    if (!result.ok) setFormError(result.error)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h1 className="text-xl font-semibold">เข้าสู่ระบบ</h1>
        </CardTitle>
        <CardDescription>
          จัดการบ้านเช่า ผู้เช่า และค่าเช่าในที่เดียว
        </CardDescription>
      </CardHeader>
      <form onSubmit={onSubmit} noValidate>
        <CardContent className="flex flex-col gap-4">
          {formError ? (
            <p
              role="alert"
              className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive"
            >
              {formError}
            </p>
          ) : null}
          <FormField
            label="อีเมล"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={values.email}
            onChange={set("email")}
            error={errors.email}
          />
          <PasswordField
            label="รหัสผ่าน"
            name="password"
            autoComplete="current-password"
            value={values.password}
            onChange={set("password")}
            error={errors.password}
          />
          <Button type="submit" size="lg" className="w-full" loading={pending}>
            เข้าสู่ระบบ
          </Button>
        </CardContent>
      </form>
      <CardFooter className="flex-col gap-3">
        <p className="text-sm text-muted-foreground">
          ยังไม่มีบัญชี?{" "}
          <Link
            href="/register"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            สมัครสมาชิก
          </Link>
        </p>
        <div className="w-full rounded-lg border border-dashed p-3 text-sm">
          <p className="font-medium">บัญชีทดลอง</p>
          <p className="text-muted-foreground">
            {demo.email} / {demo.password}
          </p>
          <Button
            type="button"
            variant="link"
            onClick={() => {
              setValues({ email: demo.email, password: demo.password })
              setErrors({})
            }}
          >
            กรอกให้อัตโนมัติ
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
