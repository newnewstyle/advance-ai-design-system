import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { CircleAlertIcon, CircleCheckIcon, ClockIcon } from "lucide-react"

import { Badge, type BadgeVariant } from "./Badge"

const variants: BadgeVariant[] = [
  "default",
  "secondary",
  "outline",
  "ghost",
  "destructive",
  "link",
]

const meta = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: { children: "ใหม่", variant: "default" },
  argTypes: { variant: { control: "select", options: variants } },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-2">
      {variants.map((v) => (
        <Badge key={v} {...args} variant={v}>
          {v}
        </Badge>
      ))}
    </div>
  ),
}

/** Status badges always pair an icon with a text label, never color alone. */
export const Status: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="secondary">
        <CircleCheckIcon aria-hidden />
        ชำระแล้ว
      </Badge>
      <Badge variant="outline">
        <ClockIcon aria-hidden />
        ใกล้ครบกำหนด
      </Badge>
      <Badge variant="destructive">
        <CircleAlertIcon aria-hidden />
        ค้างชำระ
      </Badge>
    </div>
  ),
}

/** `render` turns the badge into a link; link-only hover styles kick in. */
export const AsLink: Story = {
  args: {
    render: <a href="#" />,
    children: "ดูสัญญา",
  },
}
