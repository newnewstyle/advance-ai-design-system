import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  CalendarClockIcon,
  CircleAlertIcon,
  CircleCheckIcon,
  CircleDashedIcon,
  ClockIcon,
} from "lucide-react"

import { usageDoc } from "@/lib/usage-doc"

import { Badge } from "./Badge"
import usage from "./Badge.md?raw"
import { badgeSpec } from "./Badge.spec"
import type { BadgeVariant } from "./Badge.types"

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
  parameters: {
    docs: { description: { component: usageDoc(usage, badgeSpec) } },
  },
  args: { children: "ใหม่", variant: "default" },
  argTypes: {
    variant: {
      control: "select",
      options: variants,
      description: "สีของป้าย: เลือกตามระดับสถานะ หรือหมวดหมู่",
    },
  },
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
        <CircleCheckIcon data-icon="inline-start" aria-hidden />
        ชำระแล้ว
      </Badge>
      <Badge variant="success">
        <CircleCheckIcon data-icon="inline-start" aria-hidden />
        มีผู้เช่า
      </Badge>
      <Badge variant="outline">
        <CircleDashedIcon data-icon="inline-start" aria-hidden />
        ว่าง
      </Badge>
      <Badge variant="warning">
        <ClockIcon data-icon="inline-start" aria-hidden />
        ใกล้ครบกำหนด
      </Badge>
      <Badge variant="warning">
        <CalendarClockIcon data-icon="inline-start" aria-hidden />
        สัญญาใกล้หมด
      </Badge>
      <Badge variant="destructive">
        <CircleAlertIcon data-icon="inline-start" aria-hidden />
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
