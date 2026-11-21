import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Checkbox } from "@/components/ui/Checkbox"
import { Input } from "@/components/ui/Input"

import { Label } from "./Label"

const meta = {
  title: "Components/Label",
  component: Label,
  tags: ["autodocs"],
  args: { children: "ชื่อผู้เช่า" },
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const WithInput: Story = {
  render: (args) => (
    <div className="flex w-72 flex-col gap-2">
      <Label {...args} htmlFor="tenant" />
      <Input id="tenant" />
    </div>
  ),
}

/** A label right after a disabled control is dimmed automatically. */
export const AfterDisabledControl: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="locked" disabled />
      <Label htmlFor="locked">ปิดใช้งาน</Label>
    </div>
  ),
}
