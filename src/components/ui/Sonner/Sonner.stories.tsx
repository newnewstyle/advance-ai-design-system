import type { Meta, StoryObj } from "@storybook/nextjs-vite"
import { toast } from "sonner"

import { Button } from "@/components/ui/Button"

import { Toaster } from "./Sonner"

const meta = {
  title: "Components/Sonner (Toast)",
  component: Toaster,
  tags: ["autodocs"],
  // <Toaster /> is already mounted by .storybook/preview.tsx (like the app's
  // root layout), so stories only call toast().
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" onClick={() => toast.success("บันทึกแล้ว")}>
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
      <Button
        variant="outline"
        onClick={() =>
          toast.promise(new Promise((r) => setTimeout(r, 1500)), {
            loading: "กำลังส่งข้อความเตือน…",
            success: "ส่งแล้ว",
            error: "ส่งไม่สำเร็จ",
          })
        }
      >
        loading
      </Button>
    </div>
  ),
} satisfies Meta<typeof Toaster>

export default meta
type Story = StoryObj<typeof meta>

/** Click a button to show that toast type. */
export const Types: Story = {}
