import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { PencilIcon, PlusIcon, Trash2Icon } from "lucide-react"

import { usageDoc } from "@/lib/usage-doc"

import { Button, type ButtonSize, type ButtonVariant } from "./Button"
import usage from "./Button.md?raw"
import { buttonSpec } from "./Button.spec"

const variants: ButtonVariant[] = [
  "default",
  "outline",
  "ghost",
  "destructive",
  "destructive-solid",
  "link",
]
const sizes: ButtonSize[] = ["xs", "sm", "default", "lg"]
const iconSizes: ButtonSize[] = ["icon-xs", "icon-sm", "icon", "icon-lg"]

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: usageDoc(usage, buttonSpec) } },
  },
  args: {
    children: "บันทึก",
    variant: "default",
    size: "default",
    disabled: false,
  },
  argTypes: {
    variant: { control: "select", options: variants },
    size: { control: "select", options: [...sizes, ...iconSizes] },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

/** Try every prop with the controls panel. */
export const Playground: Story = {}

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-3">
      {variants.map((v) => (
        <Button key={v} {...args} variant={v}>
          {v}
        </Button>
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {sizes.map((s) => (
        <Button key={s} {...args} size={s}>
          {s}
        </Button>
      ))}
    </div>
  ),
}

/** Icon-only buttons always need a Thai aria-label. */
export const IconOnly: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      {iconSizes.map((s) => (
        <Button key={s} {...args} variant="outline" size={s} aria-label="แก้ไข">
          <PencilIcon />
        </Button>
      ))}
    </div>
  ),
}

/** data-icon trims the padding on the icon's side. */
export const WithIcon: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-3">
      <Button {...args}>
        <PlusIcon data-icon="inline-start" />
        เพิ่มบ้านเช่า
      </Button>
      <Button {...args} variant="destructive">
        <Trash2Icon data-icon="inline-start" />
        ลบผู้เช่า
      </Button>
    </div>
  ),
}

/** loading shows a spinner, disables the button and sets aria-busy. */
export const Loading: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-3">
      <Button {...args} loading>
        กำลังบันทึก
      </Button>
      <Button
        {...args}
        variant="outline"
        size="icon"
        loading
        aria-label="แก้ไข"
      >
        <PencilIcon />
      </Button>
    </div>
  ),
}

/** Solid red is only for the final confirm of an irreversible delete. */
export const DestructiveSolid: Story = {
  args: { variant: "destructive-solid", children: "ลบถาวร" },
}

export const Disabled: Story = {
  args: { disabled: true, children: "ปิดใช้งาน" },
}

/** Utilities passed via className override the module styles. */
export const ClassNameOverride: Story = {
  args: { className: "w-64 rounded-full", children: "ส่งข้อความเตือน" },
}

/** Navigation that looks like a button. Renders an <a>, but Base UI still sets role="button" (see the TODO in Button.spec.ts). */
export const AsLink: Story = {
  args: {
    nativeButton: false,
    render: <a href="#dashboard" />,
    children: "ไปหน้าภาพรวม",
  },
}
