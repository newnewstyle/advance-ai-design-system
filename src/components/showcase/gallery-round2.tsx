"use client"

/*
 * Gallery demos for round 2: charts, KPIs, statuses and the
 * project-specific components. Same pattern as gallery-phase2.tsx.
 */
import * as React from "react"
import {
  BellIcon,
  CircleAlertIcon,
  CircleCheckIcon,
  TimerIcon,
} from "lucide-react"
import { toast } from "sonner"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion"
import { Button } from "@/components/ui/Button"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/Chart"
import { DataTable, type DataTableColumn } from "@/components/ui/DataTable"
import { Field, FieldLabel } from "@/components/ui/Field"
import { FileDropzone } from "@/components/ui/FileDropzone"
import { Input } from "@/components/ui/Input"
import { Money } from "@/components/ui/Money"
import {
  Progress,
  ProgressLabel,
  ProgressValue,
} from "@/components/ui/Progress"
import {
  ResponsiveDialog,
  ResponsiveDialogClose,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from "@/components/ui/ResponsiveDialog"
import { StatCard } from "@/components/ui/StatCard"
import { StatusBadge, type StatusKey } from "@/components/ui/StatusBadge"
import { Timeline, TimelineItem } from "@/components/ui/Timeline"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/ToggleGroup"

const chartConfig = {
  collected: { label: "เก็บได้", color: "var(--chart-1)" },
  overdue: { label: "ค้างชำระ", color: "var(--chart-2)" },
} satisfies ChartConfig

const monthly = [
  { month: "ก.ค.", collected: 91500, overdue: 4200 },
  { month: "ส.ค.", collected: 88000, overdue: 12700 },
  { month: "ก.ย.", collected: 95700, overdue: 3500 },
  { month: "ต.ค.", collected: 94200, overdue: 6800 },
  { month: "พ.ย.", collected: 79500, overdue: 24500 },
]

export function ChartDemo() {
  return (
    <ChartContainer config={chartConfig} className="h-56 w-full">
      <BarChart data={monthly} accessibilityLayer>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="month" tickLine={false} axisLine={false} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="collected" fill="var(--color-collected)" radius={4} />
        <Bar dataKey="overdue" fill="var(--color-overdue)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}

export function StatCardDemo() {
  return (
    <div className="grid w-full gap-3 sm:grid-cols-3">
      <StatCard
        label="ค้างชำระรวม"
        value={<Money value={24500} />}
        description="3 ราย"
        icon={<CircleAlertIcon />}
      />
      <StatCard
        label="ส่งเตือนเดือนนี้"
        value="18 ครั้ง"
        description="LINE 12 · SMS 6"
        icon={<BellIcon />}
      />
      <StatCard
        label="จ่ายหลังเตือนเฉลี่ย"
        value="2.4 วัน"
        description="เร็วขึ้น 0.6 วัน"
        icon={<TimerIcon />}
      />
    </div>
  )
}

const statuses: StatusKey[] = [
  "vacant",
  "occupied",
  "lease-ending",
  "paid",
  "due-soon",
  "overdue",
  "repair-pending",
  "repair-in-progress",
  "repair-done",
  "repair-urgent",
]

export function StatusBadgeDemo() {
  return (
    <div className="flex flex-wrap gap-2">
      {statuses.map((s) => (
        <StatusBadge key={s} status={s} />
      ))}
    </div>
  )
}

export function MoneyDemo() {
  return (
    <div className="flex flex-wrap items-baseline gap-4 text-sm">
      <Money value={8500} />
      <Money value={8500} display="word" />
      <Money value={1250.5} fractionDigits={2} />
      <Money value={-1200} />
    </div>
  )
}

type Row = { id: string; name: string; rent: number; status: StatusKey }

const rows: Row[] = [
  { id: "1", name: "สมชาย ใจกว้าง", rent: 8500, status: "paid" },
  { id: "2", name: "สมหญิง รักบ้าน", rent: 7200, status: "overdue" },
  { id: "3", name: "วีระ ทองดี", rent: 9800, status: "due-soon" },
  { id: "4", name: "มาลี ศรีสุข", rent: 6500, status: "paid" },
  { id: "5", name: "ประเสริฐ มั่นคง", rent: 11000, status: "overdue" },
]

const columns: DataTableColumn<Row>[] = [
  {
    key: "name",
    header: "ผู้เช่า",
    cell: (r) => r.name,
    sortValue: (r) => r.name,
  },
  {
    key: "rent",
    header: "ค่าเช่า",
    align: "end",
    cell: (r) => <Money value={r.rent} />,
    sortValue: (r) => r.rent,
  },
  {
    key: "status",
    header: "สถานะ",
    cell: (r) => <StatusBadge status={r.status} />,
  },
]

export function DataTableDemo() {
  return (
    <DataTable
      label="รายการผู้เช่า"
      data={rows}
      columns={columns}
      getRowId={(r) => r.id}
      pageSize={3}
      filters={[
        { value: "all", label: "ทั้งหมด" },
        {
          value: "overdue",
          label: "ค้างชำระ",
          predicate: (r) => r.status === "overdue",
        },
      ]}
    />
  )
}

export function ToggleGroupDemo() {
  return (
    <ToggleGroup
      aria-label="ช่วงเวลา"
      variant="outline"
      size="sm"
      spacing={0}
      defaultValue={["month"]}
    >
      <ToggleGroupItem value="month">เดือนนี้</ToggleGroupItem>
      <ToggleGroupItem value="quarter">3 เดือน</ToggleGroupItem>
      <ToggleGroupItem value="year">ปีนี้</ToggleGroupItem>
    </ToggleGroup>
  )
}

export function ProgressDemo() {
  return (
    <Progress value={82} className="w-full max-w-xs">
      <ProgressLabel>จ่ายตรงเวลา</ProgressLabel>
      <ProgressValue />
    </Progress>
  )
}

export function AccordionDemo() {
  return (
    <Accordion className="w-full">
      <AccordionItem value="a">
        <AccordionTrigger>ก๊อกน้ำห้องครัวรั่ว</AccordionTrigger>
        <AccordionContent>
          ช่างนัดเข้าวันที่ 27 · ประมาณ 450 บาท
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>แอร์ห้องนอนไม่เย็น</AccordionTrigger>
        <AccordionContent>ล้างแอร์และเติมน้ำยา · 1,200 บาท</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export function TimelineDemo() {
  return (
    <Timeline className="w-full">
      <TimelineItem
        title="ชำระแล้ว 8,500 บาท"
        time={new Date(2026, 10, 7, 14, 20)}
        icon={<CircleCheckIcon />}
        tone="success"
      />
      <TimelineItem
        title="ส่งเตือนค้างชำระทาง LINE"
        time={new Date(2026, 10, 6, 9, 0)}
        icon={<BellIcon />}
        tone="destructive"
      />
    </Timeline>
  )
}

export function FileDropzoneDemo() {
  const [files, setFiles] = React.useState<File[]>([])
  return (
    <FileDropzone
      files={files}
      onFilesChange={setFiles}
      aria-label="รูปจุดที่ต้องซ่อม"
      hint="ไม่เกิน 5 รูป (ไม่ได้อัปโหลดจริง)"
    />
  )
}

export function ResponsiveDialogDemo() {
  const [open, setOpen] = React.useState(false)
  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={setOpen}
      disablePointerDismissal
    >
      <ResponsiveDialogTrigger render={<Button variant="outline" />}>
        บันทึกการชำระ (ปรับตามจอ)
      </ResponsiveDialogTrigger>
      <ResponsiveDialogContent>
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>บันทึกการชำระ</ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            บ้านเลขที่ 12/3
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>
        <Field>
          <FieldLabel htmlFor="g-pay">จำนวนเงิน (บาท)</FieldLabel>
          <Input id="g-pay" inputMode="numeric" defaultValue="8500" />
        </Field>
        <ResponsiveDialogFooter>
          <ResponsiveDialogClose render={<Button variant="outline" />}>
            ยกเลิก
          </ResponsiveDialogClose>
          <Button
            onClick={() => {
              setOpen(false)
              toast.success("บันทึกการชำระแล้ว")
            }}
          >
            บันทึก
          </Button>
        </ResponsiveDialogFooter>
      </ResponsiveDialogContent>
    </ResponsiveDialog>
  )
}
