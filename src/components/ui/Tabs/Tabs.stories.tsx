import type { Meta, StoryObj } from "@storybook/nextjs-vite"

import {
  Tabs,
  TabsContent,
  TabsList,
  type TabsListVariant,
  TabsTrigger,
} from "./Tabs"

type Args = {
  variant: TabsListVariant
  orientation: "horizontal" | "vertical"
}

const meta = {
  title: "Components/Tabs",
  tags: ["autodocs"],
  args: { variant: "default", orientation: "horizontal" },
  argTypes: {
    variant: { control: "inline-radio", options: ["default", "line"] },
    orientation: {
      control: "inline-radio",
      options: ["horizontal", "vertical"],
    },
  },
  render: ({ variant, orientation }) => (
    <Tabs defaultValue="info" orientation={orientation}>
      <TabsList variant={variant}>
        <TabsTrigger value="info">ข้อมูลบ้าน</TabsTrigger>
        <TabsTrigger value="tenant">ผู้เช่า</TabsTrigger>
        <TabsTrigger value="repair" disabled>
          แจ้งซ่อม
        </TabsTrigger>
      </TabsList>
      <TabsContent value="info">3 ห้องนอน 2 ห้องน้ำ</TabsContent>
      <TabsContent value="tenant">สมชาย ใจกว้าง</TabsContent>
      <TabsContent value="repair">ไม่มีรายการ</TabsContent>
    </Tabs>
  ),
} satisfies Meta<Args>

export default meta
type Story = StoryObj<typeof meta>

/** Pill style (default). The third tab is disabled. */
export const Default: Story = {}

/** Underline style. */
export const Line: Story = { args: { variant: "line" } }

export const Vertical: Story = { args: { orientation: "vertical" } }
