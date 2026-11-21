import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Checkbox } from "./Checkbox"

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  args: { defaultChecked: false, disabled: false },
  // A wrapping <label> gives the checkbox its accessible name.
  render: (args) => (
    <label className="flex items-center gap-2 text-sm">
      <Checkbox {...args} />
      แจ้งเตือนก่อนครบกำหนด 3 วัน
    </label>
  ),
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Checked: Story = { args: { defaultChecked: true } }

export const Disabled: Story = { args: { disabled: true } }

export const Invalid: Story = { args: { "aria-invalid": true } }
