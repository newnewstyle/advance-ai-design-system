import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Label } from "@/components/ui/Label"

import { Input } from "./Input"

const meta = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  args: { placeholder: "เช่น สมชาย ใจดี", disabled: false },
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const WithLabel: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2">
      <Label htmlFor="rent">ค่าเช่า (บาท)</Label>
      <Input {...args} id="rent" type="number" defaultValue={6500} />
    </div>
  ),
}

/** aria-invalid switches to the destructive border and ring. */
export const Invalid: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2">
      <Label htmlFor="email">อีเมล</Label>
      <Input
        {...args}
        id="email"
        defaultValue="somchai@"
        aria-invalid
        aria-describedby="email-error"
      />
      <p id="email-error" className="text-sm text-destructive">
        รูปแบบอีเมลไม่ถูกต้อง
      </p>
    </div>
  ),
}

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "แก้ไขไม่ได้" },
}
