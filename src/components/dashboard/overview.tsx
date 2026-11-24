"use client"

import { CheckCircle2Icon, CircleDashedIcon } from "lucide-react"

import { CURRENT_PHASE } from "@/components/app-shell/nav-items"
import { useAuth } from "@/components/auth/auth-provider"
import { Badge } from "@/components/ui/Badge"
import { site } from "@/lib/site"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card"

const phases = [
  {
    n: 1,
    title: "พื้นฐาน",
    detail: "เข้าสู่ระบบ สมัครสมาชิก ข้อมูลบัญชี และเมนูหลัก",
  },
  {
    n: 2,
    title: "ข้อมูลหลัก",
    detail: "บ้านเช่า ผู้เช่า สัญญา และการชำระเงิน",
  },
  { n: 3, title: "ทวงค่าเช่า", detail: "ส่งข้อความเตือนและเก็บประวัติการทวง" },
  {
    n: 4,
    title: "สถิติ",
    detail: "ยอดค้างชำระ อัตราจ่ายตรงเวลา และกราฟรายเดือน",
  },
  { n: 5, title: "แจ้งซ่อม", detail: "รับเรื่อง ติดตามสถานะ และบันทึกค่าซ่อม" },
]

export function Overview() {
  const { user } = useAuth()

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6">
      <section>
        <h2 className="text-lg font-semibold">
          สวัสดี คุณ{user?.firstName} 👋
        </h2>
        <p className="text-muted-foreground">
          ยินดีต้อนรับสู่{site.name} ตอนนี้ระบบยังอยู่ระหว่างพัฒนา
        </p>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>แผนการพัฒนา</CardTitle>
          <CardDescription>
            เมนูที่ยังไม่พร้อมจะแสดงว่า &ldquo;เร็วๆ นี้&rdquo; ในแถบด้านข้าง
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="flex flex-col gap-3">
            {phases.map((phase) => {
              const done = phase.n <= CURRENT_PHASE
              return (
                <li key={phase.n} className="flex items-start gap-3">
                  {done ? (
                    <CheckCircle2Icon
                      className="mt-0.5 size-5 shrink-0 text-primary"
                      aria-hidden
                    />
                  ) : (
                    <CircleDashedIcon
                      className="mt-0.5 size-5 shrink-0 text-muted-foreground"
                      aria-hidden
                    />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">
                      เฟส {phase.n}: {phase.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {phase.detail}
                    </p>
                  </div>
                  <Badge variant={done ? "success" : "outline"}>
                    {done ? "เสร็จแล้ว" : "ยังไม่เริ่ม"}
                  </Badge>
                </li>
              )
            })}
          </ol>
        </CardContent>
      </Card>
    </div>
  )
}
