import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { LogOutIcon, MoreHorizontalIcon, UserIcon } from "lucide-react"

import { Button } from "@/components/ui/Button"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./DropdownMenu"

const meta = {
  title: "Components/DropdownMenu",
  component: DropdownMenu,
  tags: ["autodocs"],
} satisfies Meta<typeof DropdownMenu>

export default meta
type Story = StoryObj<typeof meta>

function FullMenu() {
  const [showVacant, setShowVacant] = React.useState(true)
  const [sort, setSort] = React.useState("name")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>
        <MoreHorizontalIcon data-icon="inline-start" />
        ตัวเลือก
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>บัญชี</DropdownMenuLabel>
          <DropdownMenuItem>
            <UserIcon />
            ข้อมูลบัญชี
            <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>ส่งออกข้อมูล</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Excel</DropdownMenuItem>
              <DropdownMenuItem>PDF</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>การแสดงผล</DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            checked={showVacant}
            onCheckedChange={setShowVacant}
          >
            แสดงบ้านว่าง
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>เรียงตาม</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
            <DropdownMenuRadioItem value="name">ชื่อ</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="rent">ค่าเช่า</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <LogOutIcon />
          ออกจากระบบ
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

/** Labels, shortcut, sub-menu, checkbox and radio items, destructive item. */
export const Full: Story = { render: () => <FullMenu /> }

/** `inset` lines text up with items that have a leading icon. */
export const Inset: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>
        เมนู
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-48">
        <DropdownMenuItem>
          <UserIcon />
          มีไอคอน
        </DropdownMenuItem>
        <DropdownMenuItem inset>ไม่มีไอคอน (inset)</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
}
