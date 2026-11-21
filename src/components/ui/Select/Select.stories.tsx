import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  type SelectTriggerSize,
  SelectValue,
} from "./Select"

const houses = [
  { value: "h1", label: "บ้านเลขที่ 12/3 ซอยทุ่งทอง 1" },
  { value: "h2", label: "บ้านเลขที่ 45 ซอยทุ่งทอง 3" },
  { value: "h3", label: "ทาวน์เฮาส์ 8/1 หมู่บ้านทองสุข" },
]

type Args = { size: SelectTriggerSize; disabled: boolean }

const meta = {
  title: "Components/Select",
  tags: ["autodocs"],
  args: { size: "default", disabled: false },
  argTypes: { size: { control: "inline-radio", options: ["default", "sm"] } },
  render: ({ size, disabled }) => (
    <Select items={houses} defaultValue="h1" disabled={disabled}>
      <SelectTrigger size={size} className="w-72">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>บ้านเช่า</SelectLabel>
          {houses.map((h) => (
            <SelectItem key={h.value} value={h.value}>
              {h.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  ),
} satisfies Meta<Args>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Small: Story = { args: { size: "sm" } }

export const Disabled: Story = { args: { disabled: true } }

/** Groups split by a separator. */
export const WithSeparator: Story = {
  render: () => (
    <Select
      items={[
        { value: "plumbing", label: "ประปา" },
        { value: "electric", label: "ไฟฟ้า" },
        { value: "other", label: "อื่นๆ" },
      ]}
      defaultValue="plumbing"
    >
      <SelectTrigger className="w-48">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="plumbing">ประปา</SelectItem>
        <SelectItem value="electric">ไฟฟ้า</SelectItem>
        <SelectSeparator />
        <SelectItem value="other">อื่นๆ</SelectItem>
      </SelectContent>
    </Select>
  ),
}
