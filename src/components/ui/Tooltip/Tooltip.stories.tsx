import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { PencilIcon } from "lucide-react"

import { Button } from "@/components/ui/Button"

import { Tooltip, TooltipContent, TooltipTrigger } from "./Tooltip"

type Side = "top" | "right" | "bottom" | "left"
type Args = { side: Side; text: string }

const meta = {
  title: "Components/Tooltip",
  tags: ["autodocs"],
  args: { side: "top", text: "แก้ไขข้อมูลบ้าน" },
  argTypes: {
    side: {
      control: "inline-radio",
      options: ["top", "right", "bottom", "left"],
    },
  },
  render: ({ side, text }) => (
    <Tooltip>
      <TooltipTrigger
        render={<Button variant="outline" size="icon" aria-label={text} />}
      >
        <PencilIcon />
      </TooltipTrigger>
      <TooltipContent side={side}>{text}</TooltipContent>
    </Tooltip>
  ),
} satisfies Meta<Args>

export default meta
type Story = StoryObj<typeof meta>

/** Hover or focus the button. */
export const Playground: Story = {}

export const AllSides: Story = {
  render: () => (
    <div className="flex gap-3 p-12">
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Tooltip key={side}>
          <TooltipTrigger render={<Button variant="outline" size="sm" />}>
            {side}
          </TooltipTrigger>
          <TooltipContent side={side}>แสดงด้าน {side}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  ),
}
