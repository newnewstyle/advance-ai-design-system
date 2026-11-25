import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { PlusIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./Dialog"
import { usageDoc } from "@/lib/usage-doc"

import usage from "./Dialog.md?raw"

type Args = {
  showCloseButton: boolean
  footerCloseButton: boolean
  disablePointerDismissal: boolean
  items: number
}

/**
 * A real "add tenant" flow: required fields, inline errors, a fake save
 * delay, then a toast. The dialog stays open until the save succeeds.
 */
function AddTenantDialog({
  showCloseButton,
  footerCloseButton,
  disablePointerDismissal,
}: Omit<Args, "items">) {
  const [open, setOpen] = React.useState(false)
  const [name, setName] = React.useState("")
  const [phone, setPhone] = React.useState("")
  const [errors, setErrors] = React.useState<{ name?: string; phone?: string }>(
    {}
  )
  const [pending, setPending] = React.useState(false)

  function reset() {
    setName("")
    setPhone("")
    setErrors({})
    setPending(false)
  }

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    const next: typeof errors = {}
    if (!name.trim()) next.name = "กรุณากรอกชื่อ-นามสกุล"
    if (!/^0\d{8,9}$/.test(phone.replace(/-/g, "")))
      next.phone = "เบอร์โทรไม่ถูกต้อง เช่น 081-234-5678"
    setErrors(next)
    if (Object.keys(next).length > 0) return

    setPending(true)
    await new Promise((r) => setTimeout(r, 1000))
    toast.success(`เพิ่มผู้เช่า ${name} แล้ว (ตัวอย่าง ไม่บันทึกจริง)`)
    setOpen(false)
    reset()
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        if (!next) reset()
      }}
      disablePointerDismissal={disablePointerDismissal}
    >
      <DialogTrigger render={<Button variant="outline" />}>
        <PlusIcon data-icon="inline-start" />
        เพิ่มผู้เช่า
      </DialogTrigger>
      <DialogContent showCloseButton={showCloseButton}>
        <DialogHeader>
          <DialogTitle>เพิ่มผู้เช่า</DialogTitle>
          <DialogDescription>
            กรอกข้อมูลผู้เช่าใหม่ (ตัวอย่าง ไม่บันทึกจริง)
          </DialogDescription>
        </DialogHeader>
        <form
          id="add-tenant"
          className="flex flex-col gap-4"
          onSubmit={onSubmit}
          noValidate
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="tenant-name">ชื่อ-นามสกุล</Label>
            <Input
              id="tenant-name"
              placeholder="สมชาย ใจดี"
              value={name}
              onChange={(e) => setName(e.target.value)}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "tenant-name-error" : undefined}
            />
            {errors.name ? (
              <p id="tenant-name-error" className="text-sm text-destructive">
                {errors.name}
              </p>
            ) : null}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="tenant-phone">เบอร์โทร</Label>
            <Input
              id="tenant-phone"
              inputMode="tel"
              placeholder="081-234-5678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "tenant-phone-error" : undefined}
            />
            {errors.phone ? (
              <p id="tenant-phone-error" className="text-sm text-destructive">
                {errors.phone}
              </p>
            ) : null}
          </div>
        </form>
        <DialogFooter showCloseButton={footerCloseButton}>
          {footerCloseButton ? null : (
            <DialogClose render={<Button variant="outline" />}>
              ยกเลิก
            </DialogClose>
          )}
          <Button type="submit" form="add-tenant" loading={pending}>
            บันทึก
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

const meta = {
  title: "Components/Dialog",
  tags: ["autodocs"],
  parameters: { docs: { description: { component: usageDoc(usage) } } },
  args: {
    showCloseButton: true,
    footerCloseButton: false,
    disablePointerDismissal: true,
    items: 30,
  },
  argTypes: {
    showCloseButton: { description: "ปุ่ม X มุมขวาบน" },
    footerCloseButton: {
      description: 'ปุ่ม "ปิด" ด้านล่าง (แทนปุ่ม "ยกเลิก")',
    },
    disablePointerDismissal: {
      description: "คลิกพื้นหลังแล้วไม่ปิด (Dialog ที่มีฟอร์มต้องเปิดไว้)",
    },
    items: {
      description: "จำนวนข้อ (เฉพาะ Long Content) ลองเพิ่มให้ยาวเกินจอ",
      control: { type: "range", min: 1, max: 60, step: 1 },
    },
  },
  render: ({ showCloseButton, footerCloseButton, disablePointerDismissal }) => (
    <AddTenantDialog
      showCloseButton={showCloseButton}
      footerCloseButton={footerCloseButton}
      disablePointerDismissal={disablePointerDismissal}
    />
  ),
} satisfies Meta<Args>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Try it like a user: press บันทึก with empty fields to see the errors,
 * fill them in to save (1 s fake delay, then a toast). Esc or X closes;
 * the backdrop does not while disablePointerDismissal is on.
 */
export const Default: Story = {}

/** No X in the corner; the footer gets a "ปิด" button instead. */
export const FooterCloseButton: Story = {
  args: { showCloseButton: false, footerCloseButton: true },
}

/** Long content: only the body scrolls; title and footer stay in view. */
export const LongContent: Story = {
  render: ({
    showCloseButton,
    footerCloseButton,
    disablePointerDismissal,
    items,
  }) => (
    <Dialog disablePointerDismissal={disablePointerDismissal}>
      <DialogTrigger render={<Button variant="outline" />}>
        ดูเงื่อนไขการเช่า
      </DialogTrigger>
      <DialogContent showCloseButton={showCloseButton}>
        <DialogHeader>
          <DialogTitle>เงื่อนไขการเช่า</DialogTitle>
          <DialogDescription>อ่านให้ครบก่อนยืนยัน</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          {Array.from({ length: items }, (_, i) => (
            <p key={i}>
              ข้อ {i + 1}. ผู้เช่าต้องชำระค่าเช่าภายในวันที่ 5 ของทุกเดือน
            </p>
          ))}
        </div>
        <DialogFooter showCloseButton={footerCloseButton}>
          {footerCloseButton ? null : (
            <>
              <DialogClose render={<Button variant="outline" />}>
                ยกเลิก
              </DialogClose>
              <DialogClose
                render={<Button />}
                onClick={() => toast.success("ยอมรับเงื่อนไขแล้ว")}
              >
                ยอมรับ
              </DialogClose>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}
