import * as React from "react"
import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { HouseIcon, UserIcon, WrenchIcon } from "lucide-react"

import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { usageDoc } from "@/lib/usage-doc"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tabs"
import usage from "./Tabs.md?raw"
import { tabsSpec } from "./Tabs.spec"
import type { TabsListVariant } from "./Tabs.types"

type Args = {
  variant: TabsListVariant
  orientation: "horizontal" | "vertical"
}

const meta = {
  title: "Components/Tabs",
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: usageDoc(usage, tabsSpec) } },
  },
  args: { variant: "default", orientation: "horizontal" },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["default", "line"],
      description: "หน้าตาของแถบ: พื้นเทา หรือเส้นใต้",
    },
    orientation: {
      control: "inline-radio",
      options: ["horizontal", "vertical"],
      description: "แท็บเรียงแนวนอน หรือแนวตั้งข้างเนื้อหา",
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

/**
 * Pill style (default). The third tab is disabled. Keyboard: Tab into the
 * list, arrows move focus, Enter or Space opens the focused tab.
 */
export const Default: Story = {}

/** Underline style. */
export const Line: Story = { args: { variant: "line" } }

export const Vertical: Story = { args: { orientation: "vertical" } }

/** data-icon trims the padding on the icon's side. */
export const WithIcon: Story = {
  render: ({ variant, orientation }) => (
    <Tabs defaultValue="info" orientation={orientation}>
      <TabsList variant={variant}>
        <TabsTrigger value="info">
          <HouseIcon data-icon="inline-start" aria-hidden />
          ข้อมูลบ้าน
        </TabsTrigger>
        <TabsTrigger value="tenant">
          <UserIcon data-icon="inline-start" aria-hidden />
          ผู้เช่า
        </TabsTrigger>
        <TabsTrigger value="repair">
          <WrenchIcon data-icon="inline-start" aria-hidden />
          แจ้งซ่อม
        </TabsTrigger>
      </TabsList>
      <TabsContent value="info">3 ห้องนอน 2 ห้องน้ำ</TabsContent>
      <TabsContent value="tenant">สมชาย ใจกว้าง</TabsContent>
      <TabsContent value="repair">ไม่มีรายการ</TabsContent>
    </Tabs>
  ),
}

function ControlledTabs({ variant, orientation }: Args) {
  const [tab, setTab] = React.useState("month")
  return (
    <div className="flex flex-col gap-3">
      <Tabs value={tab} onValueChange={setTab} orientation={orientation}>
        <TabsList variant={variant}>
          <TabsTrigger value="month">เดือนนี้</TabsTrigger>
          <TabsTrigger value="year">ปีนี้</TabsTrigger>
        </TabsList>
        <TabsContent value="month">เก็บค่าเช่าได้ 48,500 บาท</TabsContent>
        <TabsContent value="year">เก็บค่าเช่าได้ 562,000 บาท</TabsContent>
      </Tabs>
      <p className="text-sm text-muted-foreground">
        แท็บที่เปิดอยู่: <code>{tab}</code>
      </p>
    </div>
  )
}

/**
 * keepMounted on each form tab: type something, switch tabs, come back, and
 * the text is still there.
 */
export const WithForm: Story = {
  render: ({ variant, orientation }) => (
    <Tabs defaultValue="profile" orientation={orientation}>
      <TabsList variant={variant}>
        <TabsTrigger value="profile">ข้อมูลส่วนตัว</TabsTrigger>
        <TabsTrigger value="password">รหัสผ่าน</TabsTrigger>
      </TabsList>
      <TabsContent value="profile" keepMounted>
        <div className="flex flex-col gap-2 pt-2">
          <Label htmlFor="tabs-name">ชื่อ-นามสกุล</Label>
          <Input id="tabs-name" placeholder="สมชาย ใจกว้าง" />
        </div>
      </TabsContent>
      <TabsContent value="password" keepMounted>
        <div className="flex flex-col gap-2 pt-2">
          <Label htmlFor="tabs-password">รหัสผ่านใหม่</Label>
          <Input id="tabs-password" type="password" />
        </div>
      </TabsContent>
    </Tabs>
  ),
}

/** value + onValueChange: the page knows which tab is open (e.g. for the URL). */
export const Controlled: Story = {
  args: { variant: "line" },
  render: (args) => <ControlledTabs {...args} />,
}
