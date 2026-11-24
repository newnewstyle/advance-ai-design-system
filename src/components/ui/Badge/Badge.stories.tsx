import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  CalendarClockIcon,
  CircleAlertIcon,
  CircleCheckIcon,
  CircleDashedIcon,
  ClockIcon,
} from "lucide-react"

import { Badge, type BadgeVariant } from "./Badge"

const variants: BadgeVariant[] = [
  "default",
  "secondary",
  "outline",
  "success",
  "warning",
  "destructive",
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

/**
 * Status set: green = done, outline = info, amber = watch, red = act now.
 * Always an icon plus a text label, never color alone.
 */
export const Status: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="success">
        <CircleCheckIcon aria-hidden />
        ชำระแล้ว
      </Badge>
      <Badge variant="success">
        <CircleCheckIcon aria-hidden />
        มีผู้เช่า
      </Badge>
      <Badge variant="outline">
        <CircleDashedIcon aria-hidden />
        ว่าง
      </Badge>
      <Badge variant="warning">
        <ClockIcon aria-hidden />
        ใกล้ครบกำหนด
      </Badge>
      <Badge variant="warning">
        <CalendarClockIcon aria-hidden />
        สัญญาใกล้หมด
      </Badge>
      <Badge variant="destructive">
        <CircleAlertIcon aria-hidden />
        ค้างชำระ
      </Badge>
    </div>
  ),
}

/** secondary is for categories, not status. */
export const Category: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="secondary">ทาวน์เฮาส์</Badge>
      <Badge variant="secondary">ประปา</Badge>
      <Badge variant="secondary">แอร์</Badge>
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
