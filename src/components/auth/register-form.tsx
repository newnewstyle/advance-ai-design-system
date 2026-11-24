"use client"

import * as React from "react"
import Link from "next/link"
import { toast } from "sonner"

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
import { Checkbox } from "@/components/ui/Checkbox"
import {
  collectErrors,
  validateConfirm,
  validateEmail,
  validateNewPassword,
  validatePhone,
  validateRequired,
  type FieldErrors,
} from "@/lib/auth/validation"

type Field =
  | "firstName"
  | "lastName"
  | "email"
  | "phone"
  | "password"
  | "confirm"
  | "terms"

const empty = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  confirm: "",
}

export function RegisterForm() {
  const { register } = useAuth()
  const [values, setValues] = React.useState(empty)
  const [acceptedTerms, setAcceptedTerms] = React.useState(false)
  const [errors, setErrors] = React.useState<FieldErrors<Field>>({})
  const [formError, setFormError] = React.useState<string>()
  const [pending, setPending] = React.useState(false)

  const set =
    (field: keyof typeof empty) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setValues((v) => ({ ...v, [field]: e.target.value }))

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setFormError(undefined)
    const found = collectErrors<Field>({
      firstName: validateRequired(values.firstName, "ชื่อ"),
      lastName: validateRequired(values.lastName, "นามสกุล"),
      email: validateEmail(values.email),
      phone: validatePhone(values.phone),
      password: validateNewPassword(values.password),
      confirm: validateConfirm(values.confirm, values.password),
      terms: acceptedTerms ? undefined : "กรุณายอมรับเงื่อนไขการใช้งาน",
    })
    setErrors(found ?? {})
    if (found) return

    setPending(true)
    const { firstName, lastName, email, phone, password } = values
    const result = await register({
      firstName,
      lastName,
      email,
      phone,
      password,
    })
    setPending(false)
    if (!result.ok) {
      setFormError(result.error)
      return
    }
    toast.success("สมัครสมาชิกสำเร็จ ยินดีต้อนรับ!")
    // <GuestOnly> redirects to the dashboard once the session exists.
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h1 className="text-xl font-semibold">สมัครสมาชิก</h1>
        </CardTitle>
        <CardDescription>
          สร้างบัญชีเจ้าของบ้านเช่า ใช้เวลาไม่ถึงนาที
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
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              label="ชื่อ"
              name="firstName"
              autoComplete="given-name"
              value={values.firstName}
              onChange={set("firstName")}
              error={errors.firstName}
            />
            <FormField
              label="นามสกุล"
              name="lastName"
              autoComplete="family-name"
              value={values.lastName}
              onChange={set("lastName")}
              error={errors.lastName}
            />
          </div>
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
          <FormField
            label="เบอร์โทรศัพท์"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="081-234-5678"
            value={values.phone}
            onChange={set("phone")}
            error={errors.phone}
          />
          <PasswordField
            label="รหัสผ่าน"
            name="password"
            autoComplete="new-password"
            hint="อย่างน้อย 8 ตัวอักษร"
            value={values.password}
            onChange={set("password")}
            error={errors.password}
          />
          <PasswordField
            label="ยืนยันรหัสผ่าน"
            name="confirm"
            autoComplete="new-password"
            value={values.confirm}
            onChange={set("confirm")}
            error={errors.confirm}
          />
          <div className="flex flex-col gap-2">
            <label className="flex items-start gap-2 text-sm leading-snug">
              <Checkbox
                className="mt-0.5"
                checked={acceptedTerms}
                onCheckedChange={(checked) => setAcceptedTerms(checked)}
                aria-invalid={errors.terms ? true : undefined}
                aria-describedby={errors.terms ? "terms-message" : undefined}
              />
              ฉันยอมรับเงื่อนไขการใช้งานและนโยบายความเป็นส่วนตัว
            </label>
            {errors.terms ? (
              <p id="terms-message" className="text-sm text-destructive">
                {errors.terms}
              </p>
            ) : null}
          </div>
          <Button type="submit" size="lg" className="w-full" loading={pending}>
            สมัครสมาชิก
          </Button>
        </CardContent>
      </form>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          มีบัญชีอยู่แล้ว?{" "}
          <Link
            href="/login"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            เข้าสู่ระบบ
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
