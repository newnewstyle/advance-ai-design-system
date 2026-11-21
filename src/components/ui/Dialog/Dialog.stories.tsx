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
    <Dialog>
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
