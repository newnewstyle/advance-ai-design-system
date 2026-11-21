import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { CircleAlertIcon, CircleCheckIcon, ClockIcon } from "lucide-react"

import { Badge } from "@/components/ui/Badge"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./Table"

const baht = new Intl.NumberFormat("th-TH", {
  style: "currency",
  currency: "THB",
  maximumFractionDigits: 0,
})

const payments = [
  { tenant: "สมชาย ใจกว้าง", house: "12/3", amount: 6500, status: "paid" },
  { tenant: "มาลี ศรีสุข", house: "45", amount: 8000, status: "due" },
  { tenant: "นิรันดร์ ทองดี", house: "8/1", amount: 5500, status: "overdue" },
] as const

const status = {
  paid: { label: "ชำระแล้ว", icon: CircleCheckIcon, variant: "secondary" },
  due: { label: "ใกล้ครบกำหนด", icon: ClockIcon, variant: "outline" },
  overdue: { label: "ค้างชำระ", icon: CircleAlertIcon, variant: "destructive" },
} as const

const meta = {
  title: "Components/Table",
  component: Table,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof Table>

export default meta
type Story = StoryObj<typeof meta>

/** Digits are tabular (equal width) so money columns line up. */
export const RentPayments: Story = {
  render: (args) => (
    <Table {...args}>
      <TableCaption>การชำระค่าเช่าเดือนนี้ (ข้อมูลตัวอย่าง)</TableCaption>
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
          const s = status[p.status]
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
            {baht.format(payments.reduce((sum, p) => sum + p.amount, 0))}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
}

/** data-state="selected" highlights a row. */
export const SelectedRow: Story = {
  render: (args) => (
    <Table {...args}>
      <TableBody>
        <TableRow>
          <TableCell>บ้านเลขที่ 12/3</TableCell>
        </TableRow>
        <TableRow data-state="selected">
          <TableCell>บ้านเลขที่ 45 (เลือกอยู่)</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>ทาวน์เฮาส์ 8/1</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
}
