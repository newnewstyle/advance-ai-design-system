import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { Trash2Icon, TriangleAlertIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/Button"

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
  type AlertDialogSize,
} from "./AlertDialog"

type Args = { size: AlertDialogSize; withMedia: boolean }

const meta = {
  title: "Components/AlertDialog",
  tags: ["autodocs"],
  args: { size: "default", withMedia: true },
  argTypes: { size: { control: "inline-radio", options: ["default", "sm"] } },
  render: ({ size, withMedia }) => (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="destructive" />}>
        <Trash2Icon data-icon="inline-start" />
        ลบบ้าน
      </AlertDialogTrigger>
      <AlertDialogContent size={size}>
        <AlertDialogHeader>
          {withMedia && (
            <AlertDialogMedia>
              <TriangleAlertIcon className="text-destructive" />
            </AlertDialogMedia>
          )}
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
  ),
} satisfies Meta<Args>

export default meta
type Story = StoryObj<typeof meta>

/** On wide screens the icon sits beside the left-aligned text. */
export const Default: Story = {}

/** Narrow, centered, two equal-width buttons. */
export const Small: Story = { args: { size: "sm", withMedia: false } }
