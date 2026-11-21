import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import {
  BellRingIcon,
  Building2Icon,
  HouseIcon,
  LayoutDashboardIcon,
  UsersIcon,
  WrenchIcon,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "./Sidebar"

type Args = {
  variant: "sidebar" | "floating" | "inset"
  collapsible: "offcanvas" | "icon" | "none"
  side: "left" | "right"
}

const nav = [
  { title: "ภาพรวม", icon: LayoutDashboardIcon, active: true },
  { title: "บ้านเช่า", icon: HouseIcon, badge: "12" },
  { title: "ผู้เช่า", icon: UsersIcon },
  { title: "ทวงค่าเช่า", icon: BellRingIcon, badge: "3" },
  { title: "แจ้งซ่อม", icon: WrenchIcon, disabled: true },
]

const meta = {
  title: "Components/Sidebar",
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
  args: { variant: "sidebar", collapsible: "icon", side: "left" },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["sidebar", "floating", "inset"],
    },
    collapsible: {
      control: "inline-radio",
      options: ["offcanvas", "icon", "none"],
    },
    side: { control: "inline-radio", options: ["left", "right"] },
  },
  render: ({ variant, collapsible, side }) => (
    <SidebarProvider>
      <Sidebar variant={variant} collapsible={collapsible} side={side}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" tooltip="บ้านเช่าทุ่งทอง">
                <span className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Building2Icon className="size-4" />
                </span>
                <span className="font-semibold">บ้านเช่าทุ่งทอง</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>เมนู</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {nav.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      isActive={item.active}
                      disabled={item.disabled}
                      tooltip={item.title}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                    {item.badge && (
                      <SidebarMenuBadge>{item.badge}</SidebarMenuBadge>
                    )}
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>กำลังโหลด</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuSkeleton showIcon />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <p className="px-2 text-xs text-muted-foreground">
            กด Ctrl/⌘ + B เพื่อยุบ/ขยาย
          </p>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <header className="flex items-center gap-2 border-b p-3">
          <SidebarTrigger />
          <span className="text-sm font-medium">พื้นที่เนื้อหา</span>
        </header>
      </SidebarInset>
    </SidebarProvider>
  ),
} satisfies Meta<Args>

export default meta
type Story = StoryObj<typeof meta>

/** Collapses to an icon rail; hover icons for tooltips. */
export const IconCollapsible: Story = {}

/** Slides completely out of view when collapsed. */
export const Offcanvas: Story = { args: { collapsible: "offcanvas" } }

export const Floating: Story = { args: { variant: "floating" } }

/** Main area becomes a raised panel next to the sidebar. */
export const Inset: Story = { args: { variant: "inset" } }

export const RightSide: Story = { args: { side: "right" } }
