import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import { Switch } from "./Switch"

const meta = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
  args: { size: "default", defaultChecked: false, disabled: false },
  argTypes: { size: { control: "inline-radio", options: ["default", "sm"] } },
  render: (args) => (
    <label className="flex items-center gap-2 text-sm">
      <Switch {...args} />
      ส่งข้อความทาง LINE
    </label>
  ),
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Checked: Story = { args: { defaultChecked: true } }

export const Small: Story = { args: { size: "sm", defaultChecked: true } }

export const Disabled: Story = { args: { disabled: true } }
