import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Separator } from "./Separator"

const meta = {
  title: "Components/Separator",
  component: Separator,
  tags: ["autodocs"],
  args: { orientation: "horizontal" },
  argTypes: {
    orientation: {
      control: "inline-radio",
      options: ["horizontal", "vertical"],
    },
  },
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const Horizontal: Story = {
  render: (args) => (
    <div className="flex w-64 flex-col gap-3 text-sm">
      <span>บ้านทั้งหมด 12 หลัง</span>
      <Separator {...args} />
      <span>ผู้เช่า 10 ราย</span>
    </div>
  ),
}

export const Vertical: Story = {
  args: { orientation: "vertical" },
  render: (args) => (
    <div className="flex h-5 items-center gap-3 text-sm">
      <span>มีผู้เช่า 10</span>
      <Separator {...args} />
      <span>ว่าง 2</span>
    </div>
  ),
}
