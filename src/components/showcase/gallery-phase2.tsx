"use client"

/*
 * Gallery demos for the components added for phase 2 (forms and data
 * pages). Kept apart from component-gallery.tsx so that file stays readable;
 * each export renders the body of one <Demo> card.
 */
import * as React from "react"
import {
  CalendarIcon,
  CircleAlertIcon,
  HouseIcon,
  PlusIcon,
} from "lucide-react"
import { toast } from "sonner"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/Alert"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/Breadcrumb"
import { Button } from "@/components/ui/Button"
import { Calendar } from "@/components/ui/Calendar"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/Combobox"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/Drawer"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/Empty"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/Field"
import { Input } from "@/components/ui/Input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/InputGroup"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/Pagination"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/Popover"
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup"
import { Spinner } from "@/components/ui/Spinner"

const tenants = ["สมชาย ใจกว้าง", "สมหญิง รักบ้าน", "วีระ ทองดี", "มาลี ศรีสุข"]
const thaiDate = new Intl.DateTimeFormat("th-TH", { dateStyle: "medium" })

export function FieldDemo() {
  return (
    <FieldGroup className="max-w-sm">
      <Field>
        <FieldLabel htmlFor="g-name">ชื่อผู้เช่า</FieldLabel>
        <Input id="g-name" placeholder="สมชาย ใจกว้าง" />
        <FieldDescription>ชื่อ-นามสกุลตามบัตรประชาชน</FieldDescription>
      </Field>
      <Field data-invalid>
        <FieldLabel htmlFor="g-phone">เบอร์โทร</FieldLabel>
        <Input id="g-phone" defaultValue="081-234" aria-invalid />
        <FieldError>เบอร์โทรต้องมี 10 หลัก</FieldError>
      </Field>
    </FieldGroup>
  )
}

export function InputGroupDemo() {
  return (
    <InputGroup className="max-w-xs">
      <InputGroupAddon>
        <InputGroupText>฿</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput
        inputMode="numeric"
        placeholder="8,500"
        aria-label="ค่าเช่าต่อเดือน"
      />
      <InputGroupAddon align="inline-end">
        <InputGroupText>บาท / เดือน</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  )
}

export function RadioGroupDemo() {
  return (
    <RadioGroup defaultValue="line" aria-label="ช่องทางส่งเตือน">
      {[
        ["line", "LINE"],
        ["sms", "SMS"],
        ["email", "อีเมล"],
      ].map(([value, label]) => (
        <Field key={value} orientation="horizontal">
          <RadioGroupItem value={value} id={`g-ch-${value}`} />
          <FieldLabel htmlFor={`g-ch-${value}`}>{label}</FieldLabel>
        </Field>
      ))}
    </RadioGroup>
  )
}

export function ComboboxDemo() {
  return (
    <Combobox items={tenants}>
      <ComboboxInput placeholder="ค้นหาผู้เช่า" aria-label="ผู้เช่า" />
      <ComboboxContent>
        <ComboboxEmpty>ไม่พบผู้เช่า</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  )
}

/** Date picker pattern: Popover + Calendar. */
export function DatePickerDemo() {
  const [open, setOpen] = React.useState(false)
  const [date, setDate] = React.useState<Date | undefined>()
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={<Button variant="outline" className="font-normal" />}
      >
        <CalendarIcon data-icon="inline-start" aria-hidden />
        {date ? thaiDate.format(date) : "เลือกวันครบกำหนด"}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => {
            setDate(d)
            setOpen(false)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}

export function AlertDemo() {
  return (
    <Alert variant="destructive" className="max-w-md">
      <CircleAlertIcon aria-hidden />
      <AlertTitle>ค้างชำระ 3 ราย รวม 24,500 บาท</AlertTitle>
      <AlertDescription>เลยกำหนดชำระมาแล้วมากกว่า 7 วัน</AlertDescription>
    </Alert>
  )
}

export function EmptyDemo() {
  return (
    <Empty className="border">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <HouseIcon aria-hidden />
        </EmptyMedia>
        <EmptyTitle>ยังไม่มีบ้านเช่า</EmptyTitle>
        <EmptyDescription>เพิ่มบ้านหลังแรกเพื่อเริ่มต้น</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button size="sm">
          <PlusIcon data-icon="inline-start" aria-hidden />
          เพิ่มบ้าน
        </Button>
      </EmptyContent>
    </Empty>
  )
}

export function SpinnerDemo() {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Spinner />
      กำลังโหลดรายการผู้เช่า…
    </div>
  )
}

export function BreadcrumbDemo() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">บ้านเช่า</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>บ้านเลขที่ 12/3</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export function PaginationDemo() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        รายละเอียดค่าเช่า
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>
          <PopoverTitle>ค่าเช่าเดือนพฤศจิกายน</PopoverTitle>
          <PopoverDescription>8,500 บาท + ค่าน้ำ 320 บาท</PopoverDescription>
        </PopoverHeader>
      </PopoverContent>
    </Popover>
  )
}

export function DrawerDemo() {
  return (
    <Drawer showSwipeHandle>
      <DrawerTrigger render={<Button variant="outline" />}>
        บันทึกการชำระ
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>บันทึกการชำระ</DrawerTitle>
          <DrawerDescription>บ้านเลขที่ 12/3 · 8,500 บาท</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose
            render={<Button />}
            onClick={() => toast.success("บันทึกการชำระแล้ว")}
          >
            ยืนยันรับเงิน
          </DrawerClose>
          <DrawerClose render={<Button variant="outline" />}>
            ยกเลิก
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
