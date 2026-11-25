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

type Args = { showCloseButton: boolean; footerCloseButton: boolean }

const meta = {
  title: "Components/Dialog",
  tags: ["autodocs"],
  args: { showCloseButton: true, footerCloseButton: false },
  render: ({ showCloseButton, footerCloseButton }) => (
    <Dialog disablePointerDismissal>
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
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">ชื่อ-นามสกุล</Label>
          <Input id="name" />
        </div>
        <DialogFooter showCloseButton={footerCloseButton}>
          <DialogClose
            render={<Button />}
            onClick={() => toast.success("เพิ่มผู้เช่าแล้ว")}
          >
            บันทึก
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
} satisfies Meta<Args>

export default meta
type Story = StoryObj<typeof meta>

/** Click the trigger to open. Esc or the backdrop closes it. */
export const Default: Story = {}

/** No X in the corner; the footer gets a "ปิด" button instead. */
export const FooterCloseButton: Story = {
  args: { showCloseButton: false, footerCloseButton: true },
}

/** Long content: only the body scrolls; title and footer stay in view. */
export const LongContent: Story = {
  render: () => (
    <Dialog disablePointerDismissal>
      <DialogTrigger render={<Button variant="outline" />}>
        ดูเงื่อนไขการเช่า
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>เงื่อนไขการเช่า</DialogTitle>
          <DialogDescription>อ่านให้ครบก่อนยืนยัน</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          {Array.from({ length: 30 }, (_, i) => (
            <p key={i}>
              ข้อ {i + 1}. ผู้เช่าต้องชำระค่าเช่าภายในวันที่ 5 ของทุกเดือน
            </p>
          ))}
        </div>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" />}>
            ยกเลิก
          </DialogClose>
          <DialogClose render={<Button />}>ยอมรับ</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
}
