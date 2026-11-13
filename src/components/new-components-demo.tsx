"use client"

import { HomeIcon, InboxIcon, SettingsIcon } from "lucide-react"
import { toast } from "sonner"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Switch } from "@/components/ui/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

const fruits = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Mango", value: "mango" },
]

const students = [
  { name: "Somchai", score: 85, grade: "A" },
  { name: "Malee", score: 78, grade: "B+" },
  { name: "Niran", score: 66, grade: "C+" },
]

const menu = [
  { title: "Home", icon: HomeIcon },
  { title: "Inbox", icon: InboxIcon },
  { title: "Settings", icon: SettingsIcon },
]

export function NewComponentsDemo() {
  return (
    <div className="flex flex-col gap-6">
      {/* Checkbox + Switch */}
      <section>
        <h2 className="font-medium">Checkbox + Switch</h2>
        <div className="mt-2 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Checkbox id="terms" />
            <Label htmlFor="terms">Accept terms and conditions</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch id="notify" />
            <Label htmlFor="notify">Turn on notifications</Label>
          </div>
        </div>
      </section>

      {/* Select */}
      <section>
        <h2 className="font-medium">Select</h2>
        <Select items={fruits} defaultValue="apple">
          <SelectTrigger className="mt-2 w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {fruits.map((fruit) => (
              <SelectItem key={fruit.value} value={fruit.value}>
                {fruit.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </section>

      {/* Textarea */}
      <section>
        <h2 className="font-medium">Textarea</h2>
        <Textarea className="mt-2" placeholder="Type your message here..." />
      </section>

      {/* Sonner */}
      <section>
        <h2 className="font-medium">Sonner (toast)</h2>
        <Button
          variant="outline"
          className="mt-2"
          onClick={() => toast.success("Saved successfully!")}
        >
          Show toast
        </Button>
      </section>

      {/* Tabs */}
      <section>
        <h2 className="font-medium">Tabs</h2>
        <Tabs defaultValue="account" className="mt-2">
          <TabsList>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="password">Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="pt-2">
            This is the Account tab.
          </TabsContent>
          <TabsContent value="password" className="pt-2">
            This is the Password tab.
          </TabsContent>
        </Tabs>
      </section>

      {/* Dropdown Menu */}
      <section>
        <h2 className="font-medium">Dropdown Menu</h2>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<Button variant="outline" className="mt-2" />}
          >
            Open menu
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </section>

      {/* Alert Dialog */}
      <section>
        <h2 className="font-medium">Alert Dialog</h2>
        <AlertDialog>
          <AlertDialogTrigger
            render={<Button variant="destructive" className="mt-2" />}
          >
            Delete item
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This cannot be undone. The item will be deleted.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => toast("Item deleted")}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </section>

      {/* Table */}
      <section>
        <h2 className="font-medium">Table</h2>
        <Table className="mt-2">
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Grade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((s) => (
              <TableRow key={s.name}>
                <TableCell>{s.name}</TableCell>
                <TableCell>{s.score}</TableCell>
                <TableCell>{s.grade}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      {/* Sidebar (small preview inside a box) */}
      <section>
        <h2 className="font-medium">Sidebar</h2>
        <div className="mt-2 h-48 overflow-hidden rounded-xl border">
          <SidebarProvider className="h-full min-h-0">
            <Sidebar collapsible="none">
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupLabel>My App</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {menu.map((item, i) => (
                        <SidebarMenuItem key={item.title}>
                          <SidebarMenuButton isActive={i === 0}>
                            <item.icon />
                            <span>{item.title}</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
            </Sidebar>
          </SidebarProvider>
        </div>
      </section>
    </div>
  )
}
