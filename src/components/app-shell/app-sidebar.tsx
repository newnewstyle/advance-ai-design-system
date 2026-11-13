"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import {
  Building2Icon,
  ChevronsUpDownIcon,
  LogOutIcon,
  SunMoonIcon,
  UserIcon,
} from "lucide-react"

import { CURRENT_PHASE, navItems } from "@/components/app-shell/nav-items"
import { useAuth } from "@/components/auth/auth-provider"
import { site } from "@/lib/site"
import { initials } from "@/lib/user"
import { Avatar, AvatarFallback } from "@/components/ui/Avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/Sidebar"

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              render={<Link href="/dashboard" />}
              tooltip={site.name}
            >
              <span className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Building2Icon className="size-4" />
              </span>
              <span className="flex flex-col leading-tight">
                <span className="font-heading font-semibold">{site.name}</span>
                <span className="text-xs text-muted-foreground">
                  {site.tagline}
                </span>
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>เมนู</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const ready = item.phase <= CURRENT_PHASE
                return (
                  <SidebarMenuItem key={item.href}>
                    {ready ? (
                      <SidebarMenuButton
                        render={<Link href={item.href} />}
                        isActive={pathname.startsWith(item.href)}
                        tooltip={item.title}
                      >
                        <item.icon />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    ) : (
                      <>
                        <SidebarMenuButton
                          disabled
                          tooltip={`${item.title} (เร็วๆ นี้)`}
                        >
                          <item.icon />
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                        <SidebarMenuBadge className="text-muted-foreground">
                          เร็วๆ นี้
                        </SidebarMenuBadge>
                      </>
                    )}
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <UserMenu />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

function UserMenu() {
  const { user, logout } = useAuth()
  const router = useRouter()
  const { resolvedTheme, setTheme } = useTheme()
  if (!user) return null

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size="lg"
                className="aria-expanded:bg-sidebar-accent"
              />
            }
          >
            <Avatar>
              <AvatarFallback>
                {initials(user.firstName, user.lastName)}
              </AvatarFallback>
            </Avatar>
            <span className="flex min-w-0 flex-col leading-tight">
              <span className="truncate font-medium">
                {user.firstName} {user.lastName}
              </span>
              <span className="truncate text-xs text-muted-foreground">
                {user.email}
              </span>
            </span>
            <ChevronsUpDownIcon className="ml-auto" />
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top" align="start" className="min-w-56">
            <DropdownMenuGroup>
              <DropdownMenuLabel>บัญชีของฉัน</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => router.push("/account")}>
                <UserIcon />
                ข้อมูลบัญชี
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  setTheme(resolvedTheme === "dark" ? "light" : "dark")
                }
              >
                <SunMoonIcon />
                {resolvedTheme === "dark" ? "โหมดสว่าง" : "โหมดมืด"}
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={logout}>
              <LogOutIcon />
              ออกจากระบบ
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
