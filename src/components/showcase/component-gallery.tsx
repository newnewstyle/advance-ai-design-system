"use client"

import * as React from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import {
  BellRingIcon,
  ChartColumnIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CircleAlertIcon,
  CircleCheckIcon,
  ClockIcon,
  DownloadIcon,
  HouseIcon,
  LogOutIcon,
  MoreHorizontalIcon,
  PencilIcon,
  PlusIcon,
  SunMoonIcon,
  Trash2Icon,
  TriangleAlertIcon,
  UserIcon,
  UsersIcon,
  WrenchIcon,
} from "lucide-react"
import { toast } from "sonner"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/AlertDialog"
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
} from "@/components/ui/Avatar"
import { Badge, type BadgeVariant } from "@/components/ui/Badge"
import {
  Button,
  type ButtonSize,
  type ButtonVariant,
} from "@/components/ui/Button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/ButtonGroup"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"
import { Checkbox } from "@/components/ui/Checkbox"
import { ProductCard } from "@/components/ui/ProductCard"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select"
import { Separator } from "@/components/ui/Separator"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  type SheetSide,
} from "@/components/ui/Sheet"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarProvider,
} from "@/components/ui/Sidebar"
import { Skeleton } from "@/components/ui/Skeleton"
import { Switch } from "@/components/ui/Switch"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs"
import { Textarea } from "@/components/ui/Textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/Tooltip"
import { site } from "@/lib/site"

import {
  AlertDemo,
  BreadcrumbDemo,
  ComboboxDemo,
  DatePickerDemo,
  DrawerDemo,
  EmptyDemo,
  FieldDemo,
  InputGroupDemo,
  PaginationDemo,
  PopoverDemo,
  RadioGroupDemo,
  SpinnerDemo,
} from "./gallery-phase2"
import {
  AccordionDemo,
  ChartDemo,
  DataTableDemo,
  FileDropzoneDemo,
  MoneyDemo,
  ProgressDemo,
  ResponsiveDialogDemo,
  StatCardDemo,
  StatusBadgeDemo,
  TimelineDemo,
  ToggleGroupDemo,
} from "./gallery-round2"

/* ------------------------------ data ------------------------------ */

const buttonVariants: ButtonVariant[] = [
  "default",
  "outline",
  "ghost",
  "destructive",
  "destructive-solid",
  "link",
]
const buttonSizes: ButtonSize[] = ["xs", "sm", "default", "lg"]
const badgeVariants: BadgeVariant[] = [
  "default",
  "secondary",
  "outline",
  "success",
  "warning",
  "destructive",
]
const sheetSides: SheetSide[] = ["top", "right", "bottom", "left"]

const houses = [
  { value: "h1", label: "บ้านเลขที่ 12/3 ซอยทุ่งทอง 1" },
  { value: "h2", label: "บ้านเลขที่ 45 ซอยทุ่งทอง 3" },
  { value: "h3", label: "ทาวน์เฮาส์ 8/1 หมู่บ้านทองสุข" },
]

const repairCategories = [
  { value: "plumbing", label: "ประปา" },
  { value: "electric", label: "ไฟฟ้า" },
  { value: "aircon", label: "แอร์" },
  { value: "other", label: "อื่นๆ" },
]

const payments = [
  { tenant: "สมชาย ใจกว้าง", house: "12/3", amount: 6500, status: "paid" },
  { tenant: "มาลี ศรีสุข", house: "45", amount: 8000, status: "due" },
  { tenant: "นิรันดร์ ทองดี", house: "8/1", amount: 5500, status: "overdue" },
] as const

const products = [
  {
    imageSrc: "/demo/product-aircon.svg",
    name: "แอร์ติดผนัง Inverter 12,000 BTU",
    brand: "ทองเย็น",
    price: 15900,
  },
  {
    imageSrc: "/demo/product-heater.svg",
    name: "เครื่องทำน้ำอุ่น 4,500 วัตต์",
    brand: "อุ่นใจ",
    price: 3290,
  },
  {
    imageSrc: "/demo/product-fridge.svg",
    name: "ตู้เย็น 2 ประตู 7.4 คิว",
    brand: "สดเสมอ",
    price: 8990,
  },
]

const statusInfo = {
  paid: { label: "ชำระแล้ว", icon: CircleCheckIcon, variant: "success" },
  due: { label: "ใกล้ครบกำหนด", icon: ClockIcon, variant: "warning" },
  overdue: {
    label: "ค้างชำระ",
    icon: CircleAlertIcon,
    variant: "destructive",
  },
} as const

const baht = new Intl.NumberFormat("th-TH", {
  style: "currency",
  currency: "THB",
  maximumFractionDigits: 0,
})

const sections = [
  { id: "buttons", title: "ปุ่มและป้าย" },
  { id: "forms", title: "ฟอร์ม" },
  { id: "data", title: "แสดงข้อมูล" },
  { id: "overlays", title: "หน้าต่างและเมนู" },
  { id: "layout", title: "โครงหน้า" },
]

/* ------------------------------ layout helpers ------------------------------ */

function Section({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="flex scroll-mt-20 flex-col gap-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="grid gap-4 lg:grid-cols-2">{children}</div>
    </section>
  )
}

/** One card per component: English name (as imported) + what it's for. */
function Demo({
  name,
  description,
  wide,
  children,
}: {
  name: string
  description: string
  wide?: boolean
  children: React.ReactNode
}) {
  return (
    <Card className={wide ? "lg:col-span-2" : undefined}>
      <CardHeader>
        <CardTitle>
          <h3 className="font-mono text-sm">{name}</h3>
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap items-center gap-3">
        {children}
      </CardContent>
    </Card>
  )
}

/* ------------------------------ page ------------------------------ */

export function ComponentGallery() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <div className="min-h-svh bg-muted/40">
      <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 py-3 md:px-6">
          <div className="mr-auto">
            <h1 className="text-lg font-semibold">Design System</h1>
            <p className="text-sm text-muted-foreground">
              component ทั้งหมดของ{site.name}
            </p>
          </div>
          <nav aria-label="หมวด component" className="flex flex-wrap gap-1">
            {sections.map((s) => (
              <Button
                key={s.id}
                variant="ghost"
                size="sm"
                nativeButton={false}
                role="link"
                render={<a href={`#${s.id}`} />}
              >
                {s.title}
              </Button>
            ))}
          </nav>
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
          >
            <SunMoonIcon data-icon="inline-start" />
            {/* static label: the theme is unknown during server render */}
            สลับโหมดสว่าง/มืด
          </Button>
          <Button
            size="sm"
            nativeButton={false}
            role="link"
            render={<Link href="/dashboard" />}
          >
            เข้าสู่ระบบจัดการ
          </Button>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-8 md:px-6">
        {/* ============================ buttons ============================ */}
        <Section id="buttons" title="ปุ่มและป้าย">
          <Demo name="Button — variant" description="รูปแบบปุ่มทั้ง 6 แบบ" wide>
            {buttonVariants.map((v) => (
              <Button key={v} variant={v}>
                {v}
              </Button>
            ))}
          </Demo>

          <Demo name="Button — size" description="ขนาดปุ่ม และปุ่มไอคอน">
            {buttonSizes.map((s) => (
              <Button key={s} size={s}>
                {s}
              </Button>
            ))}
            <Button size="icon-sm" variant="outline" aria-label="เพิ่ม">
              <PlusIcon />
            </Button>
            <Button size="icon" variant="outline" aria-label="แก้ไข">
              <PencilIcon />
            </Button>
          </Demo>

          <Demo
            name="Button — states"
            description="มีไอคอน, กำลังโหลด, ปิดใช้งาน, ปรับด้วย className"
          >
            <Button>
              <PlusIcon data-icon="inline-start" />
              เพิ่มบ้าน
            </Button>
            <Button loading>กำลังบันทึก</Button>
            <Button
              size="icon"
              variant="outline"
              loading
              aria-label="กำลังโหลด"
            />
            <Button disabled>ปิดใช้งาน</Button>
            <Button variant="outline" className="rounded-full">
              rounded-full
            </Button>
          </Demo>

          <Demo
            name="ButtonGroup"
            description="รวมปุ่มที่เกี่ยวข้องเป็นแถบเดียว: ช่วงเวลา, เลื่อนหน้า, ปุ่มแยก"
            wide
          >
            <ButtonGroup>
              <Button variant="outline">วันนี้</Button>
              <Button variant="outline">สัปดาห์นี้</Button>
              <Button variant="outline">เดือนนี้</Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button variant="outline" size="icon" aria-label="หน้าก่อนหน้า">
                <ChevronLeftIcon />
              </Button>
              <ButtonGroupText className="tabular-nums">
                หน้า 2 / 5
              </ButtonGroupText>
              <Button variant="outline" size="icon" aria-label="หน้าถัดไป">
                <ChevronRightIcon />
              </Button>
            </ButtonGroup>
            <ButtonGroup>
              <Button>
                <DownloadIcon data-icon="inline-start" />
                ส่งออก
              </Button>
              <ButtonGroupSeparator />
              <Button size="icon" aria-label="ตัวเลือกการส่งออก">
                <ChevronDownIcon />
              </Button>
            </ButtonGroup>
          </Demo>

          <Demo name="Badge" description="ป้ายกำกับสั้นๆ">
            {badgeVariants.map((v) => (
              <Badge key={v} variant={v}>
                {v}
              </Badge>
            ))}
          </Demo>

          <Demo
            name="Badge — สถานะ"
            description="สถานะต้องมีไอคอนและข้อความเสมอ ไม่ใช้สีอย่างเดียว"
          >
            {Object.values(statusInfo).map((s) => (
              <Badge key={s.label} variant={s.variant}>
                <s.icon aria-hidden />
                {s.label}
              </Badge>
            ))}
          </Demo>
        </Section>

        {/* ============================ forms ============================ */}
        <Section id="forms" title="ฟอร์ม">
          <Demo name="Input + Label" description="ช่องกรอกข้อความ">
            <div className="flex w-full flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="g-name">ชื่อผู้เช่า</Label>
                <Input id="g-name" placeholder="เช่น สมชาย ใจดี" />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="g-rent">ค่าเช่า (บาท)</Label>
                <Input id="g-rent" type="number" defaultValue={6500} />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="g-email">อีเมล (ผิดรูปแบบ)</Label>
                <Input id="g-email" defaultValue="somchai@" aria-invalid />
                <p className="text-sm text-destructive">
                  รูปแบบอีเมลไม่ถูกต้อง
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="g-disabled">ปิดใช้งาน</Label>
                <Input id="g-disabled" disabled defaultValue="แก้ไขไม่ได้" />
              </div>
            </div>
          </Demo>

          <Demo name="Textarea" description="ข้อความหลายบรรทัด">
            <div className="flex w-full flex-col gap-2">
              <Label htmlFor="g-note">รายละเอียดการแจ้งซ่อม</Label>
              <Textarea id="g-note" placeholder="เช่น ก๊อกน้ำในห้องครัวรั่ว" />
            </div>
          </Demo>

          <Demo name="Select" description="เลือก 1 ตัวเลือกจากรายการ">
            <Select items={houses} defaultValue="h1">
              <SelectTrigger className="w-full sm:w-72">
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
            <Select items={repairCategories} defaultValue="plumbing">
              <SelectTrigger size="sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {repairCategories.slice(0, 3).map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
                <SelectSeparator />
                <SelectItem value="other">อื่นๆ</SelectItem>
              </SelectContent>
            </Select>
          </Demo>

          <Demo name="Checkbox + Switch" description="ตัวเลือกเปิด/ปิด">
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-2 text-sm">
                <Checkbox defaultChecked />
                แจ้งเตือนก่อนครบกำหนด 3 วัน
              </label>
              <label className="flex items-center gap-2 text-sm">
                <Checkbox />
                ส่งใบเสร็จทางอีเมล
              </label>
              <label className="flex items-center gap-2 text-sm">
                <Checkbox disabled />
                ปิดใช้งาน
              </label>
            </div>
            <Separator orientation="vertical" className="h-20" />
            <div className="flex flex-col gap-3">
              <label className="flex items-center gap-2 text-sm">
                <Switch defaultChecked />
                ส่งข้อความทาง LINE
              </label>
              <label className="flex items-center gap-2 text-sm">
                <Switch size="sm" />
                ส่ง SMS (ขนาดเล็ก)
              </label>
            </div>
          </Demo>
          <Demo
            name="Field"
            description="ป้าย + ช่องกรอก + คำอธิบาย / ข้อความผิด"
          >
            <FieldDemo />
          </Demo>
          <Demo
            name="InputGroup"
            description="ช่องกรอกที่มีหน่วยหรือไอคอนติดอยู่"
          >
            <InputGroupDemo />
          </Demo>
          <Demo
            name="RadioGroup"
            description="เลือก 1 จากตัวเลือกที่เห็นทั้งหมด"
          >
            <RadioGroupDemo />
          </Demo>
          <Demo name="Combobox" description="พิมพ์ค้นหาแล้วเลือกจากรายการยาว">
            <ComboboxDemo />
          </Demo>
          <Demo
            name="Calendar + Popover (date picker)"
            description="เลือกวันที่ เดือนภาษาไทย ปี พ.ศ."
          >
            <DatePickerDemo />
          </Demo>
          <Demo
            name="FileDropzone"
            description="ลากหรือเลือกรูป ดูตัวอย่างก่อนส่ง"
          >
            <FileDropzoneDemo />
          </Demo>
        </Section>

        {/* ============================ data ============================ */}
        <Section id="data" title="แสดงข้อมูล">
          <Demo
            name="Table"
            description="ตารางข้อมูล ตัวเลขกว้างเท่ากันทุกตัว"
            wide
          >
            <Table>
              <TableCaption>
                การชำระค่าเช่าเดือนนี้ (ข้อมูลตัวอย่าง)
              </TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>ผู้เช่า</TableHead>
                  <TableHead>บ้านเลขที่</TableHead>
                  <TableHead>สถานะ</TableHead>
                  <TableHead className="text-right">ค่าเช่า</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((p) => {
                  const s = statusInfo[p.status]
                  return (
                    <TableRow key={p.tenant}>
                      <TableCell className="font-medium">{p.tenant}</TableCell>
                      <TableCell>{p.house}</TableCell>
                      <TableCell>
                        <Badge variant={s.variant}>
                          <s.icon aria-hidden />
                          {s.label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {baht.format(p.amount)}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>รวม</TableCell>
                  <TableCell className="text-right">
                    {baht.format(
                      payments.reduce((sum, p) => sum + p.amount, 0)
                    )}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </Demo>

          <Demo
            name="ProductCard"
            description="การ์ดสินค้า รูป ยี่ห้อ ชื่อ และราคา (ข้อมูลตัวอย่าง)"
            wide
          >
            <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3">
              {products.map((p) => (
                <ProductCard key={p.name} {...p} />
              ))}
            </div>
          </Demo>

          <Demo name="Card" description="กล่องเนื้อหา ขนาดปกติและขนาดเล็ก">
            <Card className="w-full">
              <CardHeader className="border-b">
                <CardTitle>บ้านเลขที่ 12/3</CardTitle>
                <CardDescription>ซอยทุ่งทอง 1</CardDescription>
                <CardAction>
                  <Badge variant="success">
                    <CircleCheckIcon aria-hidden />
                    มีผู้เช่า
                  </Badge>
                </CardAction>
              </CardHeader>
              <CardContent>ค่าเช่า {baht.format(6500)} / เดือน</CardContent>
              <CardFooter className="justify-end gap-2">
                <Button variant="outline" size="sm">
                  ดูสัญญา
                </Button>
                <Button size="sm">บันทึกการชำระ</Button>
              </CardFooter>
            </Card>
            <Card size="sm" className="w-full">
              <CardHeader>
                <CardTitle>Card size=&quot;sm&quot;</CardTitle>
                <CardDescription>ระยะห่างภายในเล็กลง</CardDescription>
              </CardHeader>
            </Card>
          </Demo>

          <Demo name="Avatar" description="รูปโปรไฟล์ ขนาด, ป้ายสถานะ, กลุ่ม">
            <Avatar size="sm">
              <AvatarFallback>สช</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>มล</AvatarFallback>
              <AvatarBadge />
            </Avatar>
            <Avatar size="lg">
              <AvatarFallback>นท</AvatarFallback>
            </Avatar>
            <AvatarGroup>
              <Avatar>
                <AvatarFallback>สช</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>มล</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>นท</AvatarFallback>
              </Avatar>
              <AvatarGroupCount>+4</AvatarGroupCount>
            </AvatarGroup>
          </Demo>

          <Demo name="Tabs" description="แท็บ แบบปกติ / แบบเส้น / แนวตั้ง" wide>
            <Tabs defaultValue="info" className="w-full sm:w-auto">
              <TabsList>
                <TabsTrigger value="info">ข้อมูลบ้าน</TabsTrigger>
                <TabsTrigger value="tenant">ผู้เช่า</TabsTrigger>
                <TabsTrigger value="repair">แจ้งซ่อม</TabsTrigger>
              </TabsList>
              <TabsContent value="info">3 ห้องนอน 2 ห้องน้ำ</TabsContent>
              <TabsContent value="tenant">สมชาย ใจกว้าง</TabsContent>
              <TabsContent value="repair">ไม่มีรายการ</TabsContent>
            </Tabs>
            <Tabs defaultValue="month" className="w-full sm:w-auto">
              <TabsList variant="line">
                <TabsTrigger value="month">เดือนนี้</TabsTrigger>
                <TabsTrigger value="year">ปีนี้</TabsTrigger>
              </TabsList>
              <TabsContent value="month">
                เก็บได้ {baht.format(20000)}
              </TabsContent>
              <TabsContent value="year">
                เก็บได้ {baht.format(240000)}
              </TabsContent>
            </Tabs>
            <Tabs defaultValue="a" orientation="vertical">
              <TabsList>
                <TabsTrigger value="a">ทั่วไป</TabsTrigger>
                <TabsTrigger value="b">การแจ้งเตือน</TabsTrigger>
              </TabsList>
              <TabsContent value="a">ตั้งค่าทั่วไป</TabsContent>
              <TabsContent value="b">ตั้งค่าการแจ้งเตือน</TabsContent>
            </Tabs>
          </Demo>

          <Demo name="Skeleton" description="กล่องรอโหลดข้อมูล">
            <div className="flex w-full items-center gap-3">
              <Skeleton className="size-10 rounded-full" />
              <div className="flex flex-1 flex-col gap-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            </div>
          </Demo>

          <Demo name="Separator" description="เส้นคั่น แนวนอนและแนวตั้ง">
            <div className="flex w-full flex-col gap-3 text-sm">
              <span>บ้านทั้งหมด 12 หลัง</span>
              <Separator />
              <div className="flex h-5 items-center gap-3">
                <span>มีผู้เช่า 10</span>
                <Separator orientation="vertical" />
                <span>ว่าง 2</span>
              </div>
            </div>
          </Demo>

          <Demo name="Alert" description="แจ้งเตือนที่อยู่บนหน้า จนกว่าจะแก้">
            <AlertDemo />
          </Demo>
          <Demo name="Empty" description="หน้าว่าง บอกว่าทำอะไรต่อได้">
            <EmptyDemo />
          </Demo>
          <Demo name="Spinner" description="กำลังโหลด">
            <SpinnerDemo />
          </Demo>
          <Demo name="Breadcrumb" description="เส้นทางในหน้ารายละเอียด">
            <BreadcrumbDemo />
          </Demo>
          <Demo name="Pagination" description="แบ่งหน้าใต้ตารางยาว" wide>
            <PaginationDemo />
          </Demo>

          <Demo
            name="DataTable"
            description="ตารางที่กรอง เรียง แบ่งหน้าได้ บนมือถือเป็นการ์ด"
            wide
          >
            <DataTableDemo />
          </Demo>
          <Demo
            name="StatCard + Money"
            description="ตัวเลข KPI และจำนวนเงินบาท"
            wide
          >
            <StatCardDemo />
            <MoneyDemo />
          </Demo>
          <Demo
            name="Chart"
            description="กราฟเก็บได้เทียบค้างชำระ (สี --chart-1, --chart-2)"
            wide
          >
            <ChartDemo />
          </Demo>
          <Demo
            name="StatusBadge"
            description="สถานะทั้งหมดของแอป: สี + ไอคอน + ข้อความ"
            wide
          >
            <StatusBadgeDemo />
          </Demo>
          <Demo name="Progress" description="แถบความคืบหน้า / อัตราส่วน">
            <ProgressDemo />
          </Demo>
          <Demo name="ToggleGroup" description="ปุ่มเลือก 1 แบบแถบ ใช้กรอง">
            <ToggleGroupDemo />
          </Demo>
          <Demo name="Accordion" description="หัวข้อที่กดเปิดดูรายละเอียด">
            <AccordionDemo />
          </Demo>
          <Demo name="Timeline" description="ประวัติเหตุการณ์ตามเวลา">
            <TimelineDemo />
          </Demo>
        </Section>

        {/* ============================ overlays ============================ */}
        <Section id="overlays" title="หน้าต่างและเมนู">
          <Demo name="Dialog" description="หน้าต่างซ้อน สำหรับฟอร์มสั้นๆ">
            <Dialog disablePointerDismissal>
              <DialogTrigger render={<Button variant="outline" />}>
                <PlusIcon data-icon="inline-start" />
                เพิ่มผู้เช่า
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>เพิ่มผู้เช่า</DialogTitle>
                  <DialogDescription>
                    กรอกข้อมูลผู้เช่าใหม่ (ตัวอย่าง ไม่บันทึกจริง)
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-2">
                  <Label htmlFor="d-name">ชื่อ-นามสกุล</Label>
                  <Input id="d-name" />
                </div>
                <DialogFooter>
                  <DialogClose render={<Button variant="outline" />}>
                    ยกเลิก
                  </DialogClose>
                  <DialogClose
                    render={<Button />}
                    onClick={() => toast.success("เพิ่มผู้เช่าแล้ว")}
                  >
                    บันทึก
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </Demo>

          <Demo
            name="AlertDialog"
            description="ยืนยันก่อนทำสิ่งที่ย้อนกลับไม่ได้"
          >
            <AlertDialog>
              <AlertDialogTrigger render={<Button variant="destructive" />}>
                <Trash2Icon data-icon="inline-start" />
                ลบบ้าน
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogMedia>
                    <TriangleAlertIcon className="text-destructive" />
                  </AlertDialogMedia>
                  <AlertDialogTitle>ลบบ้านเลขที่ 12/3?</AlertDialogTitle>
                  <AlertDialogDescription>
                    ข้อมูลสัญญาและประวัติการชำระของบ้านหลังนี้จะถูกลบด้วย
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                  <AlertDialogAction
                    variant="destructive-solid"
                    onClick={() => toast("ลบแล้ว (ตัวอย่าง)")}
                  >
                    ลบ
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <AlertDialog>
              <AlertDialogTrigger render={<Button variant="outline" />}>
                ขนาดเล็ก (sm)
              </AlertDialogTrigger>
              <AlertDialogContent size="sm">
                <AlertDialogHeader>
                  <AlertDialogTitle>ออกจากระบบ?</AlertDialogTitle>
                  <AlertDialogDescription>
                    คุณต้องเข้าสู่ระบบใหม่ในครั้งถัดไป
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
                  <AlertDialogAction>ออกจากระบบ</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </Demo>

          <Demo name="Sheet" description="แผงเลื่อนออกจากขอบจอ 4 ทิศ">
            {sheetSides.map((side) => (
              <Sheet key={side}>
                <SheetTrigger render={<Button variant="outline" size="sm" />}>
                  {side}
                </SheetTrigger>
                <SheetContent side={side}>
                  <SheetHeader>
                    <SheetTitle>ตัวกรอง</SheetTitle>
                    <SheetDescription>เลือกบ้านที่ต้องการดู</SheetDescription>
                  </SheetHeader>
                  <div className="flex flex-col gap-3 px-4 text-sm">
                    <label className="flex items-center gap-2">
                      <Checkbox defaultChecked /> มีผู้เช่า
                    </label>
                    <label className="flex items-center gap-2">
                      <Checkbox /> ว่าง
                    </label>
                  </div>
                  <SheetFooter>
                    <SheetClose render={<Button />}>ใช้ตัวกรอง</SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            ))}
          </Demo>

          <Demo
            name="DropdownMenu"
            description="เมนูตัวเลือก พร้อมเมนูย่อยและช่องติ๊ก"
          >
            <GalleryDropdown />
          </Demo>

          <Demo name="Tooltip" description="คำอธิบายเมื่อชี้หรือโฟกัส">
            {(["top", "right", "bottom", "left"] as const).map((side) => (
              <Tooltip key={side}>
                <TooltipTrigger render={<Button variant="outline" size="sm" />}>
                  {side}
                </TooltipTrigger>
                <TooltipContent side={side}>แสดงด้าน {side}</TooltipContent>
              </Tooltip>
            ))}
          </Demo>

          <Demo name="Popover" description="กล่องข้อมูลเล็กๆ ที่เปิดจากปุ่ม">
            <PopoverDemo />
          </Demo>

          <Demo
            name="Drawer"
            description="แผ่นเลื่อนจากล่าง ปัดลงเพื่อปิด (เหมาะกับมือถือ)"
          >
            <DrawerDemo />
          </Demo>

          <Demo
            name="ResponsiveDialog"
            description="Dialog บนจอใหญ่ / Drawer บนมือถือ (ลองย่อจอ)"
          >
            <ResponsiveDialogDemo />
          </Demo>

          <Demo name="Sonner (toast)" description="ข้อความแจ้งผลชั่วคราว">
            <Button
              variant="outline"
              onClick={() => toast.success("บันทึกแล้ว")}
            >
              success
            </Button>
            <Button
              variant="outline"
              onClick={() => toast.info("มีผู้เช่าใกล้ครบกำหนด 2 ราย")}
            >
              info
            </Button>
            <Button
              variant="outline"
              onClick={() => toast.warning("สัญญาเหลือ 30 วัน")}
            >
              warning
            </Button>
            <Button
              variant="outline"
              onClick={() => toast.error("ส่งข้อความไม่สำเร็จ")}
            >
              error
            </Button>
          </Demo>
        </Section>

        {/* ============================ layout ============================ */}
        <Section id="layout" title="โครงหน้า">
          <Demo
            name="Sidebar"
            description="เมนูด้านข้าง (แสดงแบบฝังในกล่อง; ในระบบจริงยุบเป็นไอคอนได้)"
            wide
          >
            <div className="h-80 w-full overflow-hidden rounded-lg border">
              <SidebarProvider className="h-full min-h-0">
                <Sidebar collapsible="none">
                  <SidebarContent>
                    <SidebarGroup>
                      <SidebarGroupLabel>เมนู</SidebarGroupLabel>
                      <SidebarGroupContent>
                        <SidebarMenu>
                          <SidebarMenuItem>
                            <SidebarMenuButton isActive>
                              <HouseIcon />
                              <span>บ้านเช่า</span>
                            </SidebarMenuButton>
                            <SidebarMenuBadge>12</SidebarMenuBadge>
                          </SidebarMenuItem>
                          <SidebarMenuItem>
                            <SidebarMenuButton>
                              <UsersIcon />
                              <span>ผู้เช่า</span>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                          <SidebarMenuItem>
                            <SidebarMenuButton>
                              <BellRingIcon />
                              <span>ทวงค่าเช่า</span>
                            </SidebarMenuButton>
                            <SidebarMenuBadge>3</SidebarMenuBadge>
                          </SidebarMenuItem>
                          <SidebarMenuItem>
                            <SidebarMenuButton variant="outline">
                              <ChartColumnIcon />
                              <span>variant=&quot;outline&quot;</span>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                          <SidebarMenuItem>
                            <SidebarMenuButton disabled>
                              <WrenchIcon />
                              <span>ปิดใช้งาน</span>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
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
                </Sidebar>
                <div className="flex flex-1 items-center justify-center bg-background p-4 text-sm text-muted-foreground">
                  พื้นที่เนื้อหา
                </div>
              </SidebarProvider>
            </div>
          </Demo>
        </Section>
      </main>
    </div>
  )
}

function GalleryDropdown() {
  const [showVacant, setShowVacant] = React.useState(true)
  const [sort, setSort] = React.useState("name")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" />}>
        <MoreHorizontalIcon data-icon="inline-start" />
        ตัวเลือก
      </DropdownMenuTrigger>
      <DropdownMenuContent className="min-w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>บัญชี</DropdownMenuLabel>
          <DropdownMenuItem>
            <UserIcon />
            ข้อมูลบัญชี
            <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>ส่งออกข้อมูล</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Excel</DropdownMenuItem>
              <DropdownMenuItem>PDF</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>การแสดงผล</DropdownMenuLabel>
          <DropdownMenuCheckboxItem
            checked={showVacant}
            onCheckedChange={setShowVacant}
          >
            แสดงบ้านว่าง
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>เรียงตาม</DropdownMenuLabel>
          <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
            <DropdownMenuRadioItem value="name">ชื่อ</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="rent">ค่าเช่า</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive">
          <LogOutIcon />
          ออกจากระบบ
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
