import { AppSidebar } from "@/components/app-shell/app-sidebar"
import { RequireAuth } from "@/components/auth/route-guards"
import { SidebarInset, SidebarProvider } from "@/components/ui/Sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <RequireAuth>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>{children}</SidebarInset>
      </SidebarProvider>
    </RequireAuth>
  )
}
