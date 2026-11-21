import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Label } from "@/components/ui/Label"

import { Textarea } from "./Textarea"

const meta = {
  title: "Components/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  args: { placeholder: "เช่น ก๊อกน้ำในห้องครัวรั่ว", disabled: false },
  decorators: [
    (Story) => (
      <div className="w-80">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

/** Grows with its content (field-sizing: content). */
export const WithLabel: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2">
      <Label htmlFor="repair">รายละเอียดการแจ้งซ่อม</Label>
      <Textarea {...args} id="repair" />
    </div>
  ),
}

export const Invalid: Story = {
  args: { "aria-invalid": true, defaultValue: "" },
}

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "แก้ไขไม่ได้" },
}
