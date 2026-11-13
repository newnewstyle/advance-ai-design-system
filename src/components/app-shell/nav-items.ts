import {
  BellRingIcon,
  ChartColumnIcon,
  FileTextIcon,
  HouseIcon,
  LayoutDashboardIcon,
  UsersIcon,
  WrenchIcon,
  type LucideIcon,
} from "lucide-react"

export type NavItem = {
  title: string
  href: string
  icon: LucideIcon
  /** Build phase that delivers the page (see AGENTS.md). */
  phase: number
}

/** Pages with phase > 1 aren't built yet and show as "เร็วๆ นี้". */
export const navItems: NavItem[] = [
  { title: "ภาพรวม", href: "/dashboard", icon: LayoutDashboardIcon, phase: 1 },
  { title: "บ้านเช่า", href: "/houses", icon: HouseIcon, phase: 2 },
  { title: "ผู้เช่า", href: "/tenants", icon: UsersIcon, phase: 2 },
  {
    title: "สัญญาและการชำระเงิน",
    href: "/leases",
    icon: FileTextIcon,
    phase: 2,
  },
  { title: "ทวงค่าเช่า", href: "/reminders", icon: BellRingIcon, phase: 3 },
  { title: "สถิติ", href: "/stats", icon: ChartColumnIcon, phase: 4 },
  { title: "แจ้งซ่อม", href: "/maintenance", icon: WrenchIcon, phase: 5 },
]

export const CURRENT_PHASE = 1
