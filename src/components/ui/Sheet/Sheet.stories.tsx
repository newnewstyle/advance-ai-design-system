import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Button } from "@/components/ui/Button"
import { Checkbox } from "@/components/ui/Checkbox"

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  type SheetSide,
  SheetTitle,
  SheetTrigger,
} from "./Sheet"

type Args = { side: SheetSide; showCloseButton: boolean }

const meta = {
  title: "Components/Sheet",
  tags: ["autodocs"],
  args: { side: "right", showCloseButton: true },
  argTypes: {
    side: {
      control: "inline-radio",
      options: ["top", "right", "bottom", "left"],
    },
  },
  render: ({ side, showCloseButton }) => (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>
        เปิดตัวกรอง ({side})
      </SheetTrigger>
      <SheetContent side={side} showCloseButton={showCloseButton}>
        <SheetHeader>
          <SheetTitle>ตัวกรอง</SheetTitle>
          <SheetDescription>เลือกบ้านที่ต้องการดู</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-3 px-4 text-sm">
          <label className="flex items-center gap-2">
            <Checkbox defaultChecked /> มีผู้เช่า
          </label>
          <label className="flex items-center gap-2">
            <Checkbox /> ว่าง
          </label>
        </div>
        <SheetFooter>
          <SheetClose render={<Button />}>ใช้ตัวกรอง</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
} satisfies Meta<Args>

export default meta
type Story = StoryObj<typeof meta>

export const Right: Story = {}

export const Left: Story = { args: { side: "left" } }

export const Top: Story = { args: { side: "top" } }

export const Bottom: Story = { args: { side: "bottom" } }
