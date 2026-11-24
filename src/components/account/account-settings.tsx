"use client"

import * as React from "react"
import { toast } from "sonner"

import { initials } from "@/lib/user"
import { useAuth } from "@/components/auth/auth-provider"
import { FormField, PasswordField } from "@/components/auth/form-field"
import { Avatar, AvatarFallback } from "@/components/ui/Avatar"
import { Button } from "@/components/ui/Button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs"
import {
  collectErrors,
  validateConfirm,
  validateEmail,
  validateNewPassword,
  validatePhone,
  validateRequired,
  type FieldErrors,
} from "@/lib/auth/validation"
import type { PublicUser } from "@/lib/mock/users"

const dateFormat = new Intl.DateTimeFormat("th-TH", { dateStyle: "long" })

export function AccountSettings() {
  const { user } = useAuth()
  if (!user) return null

  return (
    <div className="flex max-w-2xl flex-col gap-6 p-4 md:p-6">
      <section className="flex items-center gap-4">
        <Avatar size="lg">
          <AvatarFallback>
            {initials(user.firstName, user.lastName)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <h2 className="truncate text-lg font-semibold">
            {user.firstName} {user.lastName}
          </h2>
          <p className="text-sm text-muted-foreground">
            สมาชิกตั้งแต่ {dateFormat.format(new Date(user.createdAt))}
          </p>
        </div>
      </section>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">ข้อมูลส่วนตัว</TabsTrigger>
          <TabsTrigger value="password">รหัสผ่าน</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          {/* key resets the form when the saved user changes */}
          <ProfileForm key={JSON.stringify(user)} user={user} />
        </TabsContent>
        <TabsContent value="password">
          <PasswordForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}

type ProfileField = "firstName" | "lastName" | "email" | "phone"

function ProfileForm({ user }: { user: PublicUser }) {
  const { updateProfile } = useAuth()
  const initial = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
  }
  const [values, setValues] = React.useState(initial)
  const [errors, setErrors] = React.useState<FieldErrors<ProfileField>>({})
  const [pending, setPending] = React.useState(false)
  const dirty = (Object.keys(initial) as ProfileField[]).some(
    (k) => values[k] !== initial[k]
  )

  const set =
    (field: ProfileField) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setValues((v) => ({ ...v, [field]: e.target.value }))

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const found = collectErrors<ProfileField>({
      firstName: validateRequired(values.firstName, "ชื่อ"),
      lastName: validateRequired(values.lastName, "นามสกุล"),
      email: validateEmail(values.email),
      phone: validatePhone(values.phone),
    })
    setErrors(found ?? {})
    if (found) return

    setPending(true)
    const result = await updateProfile(values)
    setPending(false)
    if (result.ok) toast.success("บันทึกข้อมูลแล้ว")
    else toast.error(result.error)
  }

  return (
    <Card>
      <form onSubmit={onSubmit} noValidate>
        <CardHeader>
          <CardTitle>ข้อมูลส่วนตัว</CardTitle>
          <CardDescription>
            ข้อมูลนี้ใช้ติดต่อคุณและแสดงในข้อความถึงผู้เช่า
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 py-4">
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
            value={values.email}
            onChange={set("email")}
            error={errors.email}
          />
          <FormField
            label="เบอร์โทรศัพท์"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={set("phone")}
            error={errors.phone}
          />
        </CardContent>
        <CardFooter className="justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            disabled={!dirty || pending}
            onClick={() => {
              setValues(initial)
              setErrors({})
            }}
          >
            ยกเลิก
          </Button>
          <Button type="submit" disabled={!dirty} loading={pending}>
            บันทึก
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

type PasswordFieldName = "current" | "next" | "confirm"

function PasswordForm() {
  const { changePassword } = useAuth()
  const empty = { current: "", next: "", confirm: "" }
  const [values, setValues] = React.useState(empty)
  const [errors, setErrors] = React.useState<FieldErrors<PasswordFieldName>>({})
  const [pending, setPending] = React.useState(false)

  const set =
    (field: PasswordFieldName) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setValues((v) => ({ ...v, [field]: e.target.value }))

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const found = collectErrors<PasswordFieldName>({
      current: validateRequired(values.current, "รหัสผ่านปัจจุบัน"),
      next:
        validateNewPassword(values.next) ??
        (values.next === values.current
          ? "รหัสผ่านใหม่ต้องไม่ซ้ำกับรหัสผ่านเดิม"
          : undefined),
      confirm: validateConfirm(values.confirm, values.next),
    })
    setErrors(found ?? {})
    if (found) return

    setPending(true)
    const result = await changePassword(values.current, values.next)
    setPending(false)
    if (!result.ok) {
      setErrors({ current: result.error })
      return
    }
    setValues(empty)
    toast.success("เปลี่ยนรหัสผ่านแล้ว")
  }

  return (
    <Card>
      <form onSubmit={onSubmit} noValidate>
        <CardHeader>
          <CardTitle>เปลี่ยนรหัสผ่าน</CardTitle>
          <CardDescription>
            รหัสผ่านใหม่ต้องมีอย่างน้อย 8 ตัวอักษร
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 py-4">
          <PasswordField
            label="รหัสผ่านปัจจุบัน"
            name="current"
            autoComplete="current-password"
            value={values.current}
            onChange={set("current")}
            error={errors.current}
          />
          <PasswordField
            label="รหัสผ่านใหม่"
            name="next"
            autoComplete="new-password"
            value={values.next}
            onChange={set("next")}
            error={errors.next}
          />
          <PasswordField
            label="ยืนยันรหัสผ่านใหม่"
            name="confirm"
            autoComplete="new-password"
            value={values.confirm}
            onChange={set("confirm")}
            error={errors.confirm}
          />
        </CardContent>
        <CardFooter className="justify-end">
          <Button type="submit" loading={pending}>
            เปลี่ยนรหัสผ่าน
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}
