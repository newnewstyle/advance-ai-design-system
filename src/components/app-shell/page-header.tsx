import { Separator } from "@/components/ui/Separator"
import { SidebarTrigger } from "@/components/ui/Sidebar"

/** Top bar of every dashboard page: sidebar toggle + page title. */
export function PageHeader({
  title,
  description,
}: {
  title: string
  description?: string
}) {
  return (
    <header className="flex items-start gap-3 border-b px-4 py-4 md:px-6">
      <SidebarTrigger className="mt-0.5 -ml-1" />
      <Separator orientation="vertical" className="mt-1.5 h-4" />
      <div className="min-w-0">
        <h1 className="text-xl font-semibold">{title}</h1>
        {description ? (
          <p className="text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
    </header>
  )
}
