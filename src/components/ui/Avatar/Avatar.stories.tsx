import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  type AvatarSize,
} from "./Avatar"

const sizes: AvatarSize[] = ["sm", "default", "lg"]

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  args: { size: "default" },
  argTypes: { size: { control: "inline-radio", options: sizes } },
  render: (args) => (
    <Avatar {...args}>
      <AvatarFallback>สช</AvatarFallback>
    </Avatar>
  ),
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      {sizes.map((s) => (
        <Avatar key={s} size={s}>
          <AvatarFallback>มล</AvatarFallback>
        </Avatar>
      ))}
    </div>
  ),
}

/** The badge scales with the avatar's size. */
export const WithBadge: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      {sizes.map((s) => (
        <Avatar key={s} size={s}>
          <AvatarFallback>นท</AvatarFallback>
          <AvatarBadge />
        </Avatar>
      ))}
    </div>
  ),
}

/** The "+N" bubble matches the size of the avatars in the group. */
export const Group: Story = {
  render: (args) => (
    <AvatarGroup>
      {["สช", "มล", "นท"].map((n) => (
        <Avatar key={n} size={args.size}>
          <AvatarFallback>{n}</AvatarFallback>
        </Avatar>
      ))}
      <AvatarGroupCount>+4</AvatarGroupCount>
    </AvatarGroup>
  ),
}
