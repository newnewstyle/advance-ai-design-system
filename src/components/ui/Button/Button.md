`src/components/ui/Button/Button.md` · ส่วน 1–3 AI ร่างจากการใช้งานจริงในโค้ด รอทีมตัดสิน · ส่วน 4–6 มาจากโค้ดและ stories ตรวจแล้ว

# Button

```tsx
import { Button } from "@/components/ui/Button"
```

Storybook: `Components/Button` · ดูรวมกับ component อื่นที่หน้า gallery `/` หมวด "ปุ่มและป้าย"

---

## 1. Purpose (ทำหน้าที่อะไร)

ปุ่มที่ผู้ใช้กดเพื่อ**สั่งให้เกิด action** ในหน้านั้น เช่น บันทึก ส่ง ลบ เปิดหน้าต่าง สร้างบน `Button` ของ Base UI จึงได้ keyboard, focus และ disabled แบบปุ่มจริงมาครบ

## 2. ควรใช้ตอนไหน (When to use)

| สถานการณ์ | ใช้แบบนี้ | ตัวอย่างในโค้ด |
| --- | --- | --- |
| action หลักของฟอร์มหรือหน้า (มีได้ **1 ปุ่ม**ต่อพื้นที่) | `variant="default"` + `type="submit"` | ปุ่ม "บันทึก" หน้าบัญชี, "เข้าสู่ระบบ" |
| ปุ่มหลักในฟอร์มแคบ เช่นหน้าเข้าสู่ระบบ/สมัครสมาชิก | `size="lg"` + `className="w-full"` | `login-form.tsx`, `register-form.tsx` |
| action รองที่วางคู่กับปุ่มหลัก (ยกเลิก, ย้อนกลับ, ดูรายละเอียด) | `variant="outline"` | ปุ่ม "ยกเลิก" หน้าบัญชี |
| ลบหรือยกเลิกสิ่งที่ย้อนกลับไม่ได้ | `variant="destructive"` และควรมี `AlertDialog` ยืนยันก่อน | "ลบบ้าน" ใน gallery |
| ปุ่มเล็กใน toolbar, เมนู, หัวตาราง หรือปุ่มไอคอนในช่องกรอก | `variant="ghost"` + `size="icon-*"` + `aria-label` ภาษาไทย | ปุ่มแสดง/ซ่อนรหัสผ่าน (`form-field.tsx`), `SidebarTrigger` |
| action สั้นๆ ที่แทรกอยู่ในข้อความ | `variant="link"` | "กรอกให้อัตโนมัติ" ในหน้าเข้าสู่ระบบ |
| เป็น trigger ของ Dialog, Sheet, DropdownMenu, Tooltip | ส่งเข้า `render`: `<DialogTrigger render={<Button variant="outline" />}>` | ทุก overlay ใน gallery |
| กำลังส่งข้อมูล (รอผล) | `disabled` + `<LoaderCircleIcon className="animate-spin" />` นำหน้าข้อความ | ทุกฟอร์มในเฟส 1 |

## 3. ไม่ควรใช้ตอนไหน (When not to use)

- **พาไปหน้าอื่น** (เปลี่ยน URL) ใช้ลิงก์ (`<Link>`) แทน ถ้าต้องการให้ลิงก์หน้าตาเหมือนปุ่ม ให้ใช้ `render={<Link href="…" />}` คู่กับ `nativeButton={false}` เช่นลิงก์ "สมัครสมาชิก" ในหน้าเข้าสู่ระบบเป็น `<Link>` ธรรมดา ไม่ใช่ Button
- **เลือกเปิด/ปิดค่า** ใช้ `Switch` หรือ `Checkbox` แทน ปุ่มคือการสั่งงาน ไม่ใช่การเก็บค่า
- **เลือก 1 จากหลายตัวเลือก** ใช้ `Select` หรือ `Tabs` แทนการวางปุ่มเรียงกัน
- **แสดงสถานะ** (ชำระแล้ว, ค้างชำระ) ใช้ `Badge` เพราะ Badge หน้าตาเป็นป้าย ไม่ใช่สิ่งที่กดได้
- **มีปุ่ม `default` มากกว่า 1 ปุ่มในพื้นที่เดียวกัน** ปุ่มที่เหลือให้ลดเป็น `outline` หรือ `ghost`
- TODO: ยังไม่มี prop `loading` ตอนนี้ทุกฟอร์มเขียน spinner + `disabled` เอง (4 ที่: `login-form`, `register-form`, `account-settings` × 2) ต้องตัดสินว่าจะเพิ่ม `loading` เข้า Button หรือใช้วิธีเดิมต่อ
- TODO: `variant="secondary"` ยังไม่ถูกใช้ในแอปเลย (มีแค่ใน gallery และ Storybook) ต้องตัดสินว่า `secondary` ต่างจาก `outline` อย่างไร หรือควรเลิกใช้
- TODO: `variant="link"` ยังได้ความสูงและ padding จาก `size` ทำให้หน้าเข้าสู่ระบบต้องเขียน `className="h-auto px-0"` เอง ต้องตัดสินว่าจะให้ link ไม่มีความสูงและ padding เป็นค่าเริ่มต้นหรือไม่
- TODO: `Button.module.css` มีกฎสำหรับ `[data-slot="button-group"]` แต่ยังไม่มี component ButtonGroup ต้องตัดสินว่าจะสร้าง ButtonGroup หรือลบกฎนี้ออก
- TODO: `destructive` เป็นพื้นสีแดงอ่อน (10%) ไม่ใช่แดงทึบ ต้องยืนยันว่าเพียงพอสำหรับปุ่มยืนยันการลบใน `AlertDialog` หรือควรมีแบบทึบเพิ่ม

---

## 4. Props และ variants

```ts
type ButtonProps = ButtonPrimitive.Props & {
  variant?: ButtonVariant // ค่าเริ่มต้น "default"
  size?: ButtonSize       // ค่าเริ่มต้น "default"
}
```

รับ props ทั้งหมดของ Base UI Button ด้วย (`disabled`, `type`, `render`, `nativeButton`, `onClick`, `aria-*` …) และ `className` สำหรับ override (utility ชนะสไตล์ของ module เสมอ) type ที่ export: `Button`, `ButtonProps`, `ButtonVariant`, `ButtonSize`

Element ที่ render ออกมามี `data-slot="button"`, `data-variant` และ `data-size` ซึ่ง CSS ใช้เลือกสไตล์ (`.button[data-variant="outline"]`)

### Variant (หน้าตา)

| `variant` | พื้นหลัง | ตัวอักษร | ตอน hover |
| --- | --- | --- | --- |
| `default` | `--primary` | `--primary-foreground` | `--primary` 80% |
| `outline` | `--background` + เส้น `--border` (dark: `--input`) | ตามเดิม | `--muted` + `--foreground` |
| `secondary` | `--secondary` | `--secondary-foreground` | `--secondary` ผสม `--foreground` 5% |
| `ghost` | โปร่งใส | ตามเดิม | `--muted` + `--foreground` |
| `destructive` | `--destructive` 10% (dark 20%) | `--destructive` | `--destructive` 20% (dark 30%) |
| `link` | โปร่งใส | `--primary` | ขีดเส้นใต้ |

`outline`, `secondary` และ `ghost` คงสี hover ไว้ตอน `aria-expanded="true"` (เช่นเป็น trigger ของเมนูที่เปิดอยู่)

### Size

| `size` | ขนาด | padding แนวนอน | ตัวอักษร | ไอคอน | มุมโค้ง |
| --- | --- | --- | --- | --- | --- |
| `xs` | สูง 24px | 8px | `text-xs` | 12px | `min(--radius-md, 10px)` |
| `sm` | สูง 28px | 10px | 0.8rem | 14px | `min(--radius-md, 12px)` |
| `default` | สูง 32px | 10px | `text-sm` | 16px | `--radius-lg` |
| `lg` | สูง 36px | 10px | `text-sm` | 16px | `--radius-lg` |
| `icon-xs` | 24×24 | – | – | 12px | `min(--radius-md, 10px)` |
| `icon-sm` | 28×28 | – | – | 16px | `min(--radius-md, 12px)` |
| `icon` | 32×32 | – | – | 16px | `--radius-lg` |
| `icon-lg` | 36×36 | – | – | 16px | `--radius-lg` |

### สถานะ

| สถานะ | สไตล์ | วิธีเปิด |
| --- | --- | --- |
| Focus (คีย์บอร์ด) | เส้นขอบ `--ring` + วง 3px สี `--ring` 50% (`destructive` ใช้สี `--destructive`) | อัตโนมัติ |
| Active (กด) | เลื่อนลง 1px (ยกเว้นปุ่มที่มี `aria-haspopup`) | อัตโนมัติ |
| Disabled | ความทึบ 50%, กดไม่ได้ | `disabled` |
| Invalid | เส้นขอบและวงสี `--destructive` | `aria-invalid` |

### ไอคอน

- SVG ในปุ่มได้ขนาดตาม `size` อัตโนมัติ (ถ้าไม่ได้ใส่ class `size-*` เอง)
- ใส่ `data-icon="inline-start"` หรือ `"inline-end"` บนไอคอน ปุ่มจะลด padding ฝั่งนั้นให้ดูสมดุล

---

## 5. Tokens ที่ใช้

ค่าจริงอยู่ใน `src/app/globals.css` ปุ่มเรียกผ่าน utility (`bg-primary`, `ring-ring/50` …) ที่ map ไว้ใน `@theme inline`

| Token | Light (`:root`) | Dark (`[data-theme="dark"]`) | ใช้ใน |
| --- | --- | --- | --- |
| `--primary` | `oklch(0.555 0.163 48.998)` | `oklch(0.473 0.137 46.201)` | พื้น `default`, ตัวอักษร `link` |
| `--primary-foreground` | `oklch(0.987 0.022 95.277)` | `oklch(0.987 0.022 95.277)` | ตัวอักษร `default` |
| `--secondary` | `oklch(0.967 0.001 286.375)` | `oklch(0.274 0.006 286.033)` | พื้น `secondary` |
| `--secondary-foreground` | `oklch(0.21 0.006 285.885)` | `oklch(0.985 0 0)` | ตัวอักษร `secondary` |
| `--muted` | `oklch(0.97 0.001 106.424)` | `oklch(0.268 0.007 34.298)` | hover ของ `outline` / `ghost` |
| `--foreground` | `oklch(0.147 0.004 49.25)` | `oklch(0.985 0.001 106.423)` | ตัวอักษรตอน hover |
| `--background` | `oklch(1 0 0)` | `oklch(0.147 0.004 49.25)` | พื้น `outline` |
| `--border` | `oklch(0.923 0.003 48.717)` | `oklch(1 0 0 / 10%)` | เส้นขอบ `outline` (light) |
| `--input` | `oklch(0.923 0.003 48.717)` | `oklch(1 0 0 / 15%)` | เส้นขอบและพื้น `outline` (dark) |
| `--destructive` | `oklch(0.577 0.245 27.325)` | `oklch(0.704 0.191 22.216)` | `destructive`, สถานะ invalid |
| `--ring` | `oklch(0.709 0.01 56.259)` | `oklch(0.553 0.013 58.071)` | วง focus |
| `--radius` | `0.625rem` (10px) | – | `--radius-lg` = 10px, `--radius-md` = 8px |

---

## 6. ตัวอย่าง

ตัวอย่างที่กดลองได้อยู่ใน Storybook `Components/Button` (Playground, Variants, Sizes, IconOnly, WithIcon, Disabled, ClassNameOverride)

```tsx
import Link from "next/link"
import { LoaderCircleIcon, PencilIcon, PlusIcon } from "lucide-react"

// ปุ่มหลัก + ปุ่มรอง ท้ายฟอร์ม
<Button variant="outline">ยกเลิก</Button>
<Button type="submit">บันทึก</Button>

// กำลังส่ง
<Button type="submit" disabled={pending}>
  {pending ? <LoaderCircleIcon className="animate-spin" /> : null}
  บันทึก
</Button>

// มีไอคอนนำหน้า
<Button>
  <PlusIcon data-icon="inline-start" />
  เพิ่มบ้านเช่า
</Button>

// ปุ่มไอคอนอย่างเดียว ต้องมี aria-label
<Button variant="ghost" size="icon" aria-label="แก้ไข">
  <PencilIcon />
</Button>

// ลิงก์ที่หน้าตาเป็นปุ่ม
<Button nativeButton={false} render={<Link href="/dashboard" />}>
  เข้าสู่ระบบจัดการ
</Button>

// trigger ของ overlay
<DialogTrigger render={<Button variant="outline" />}>เพิ่มผู้เช่า</DialogTrigger>
```
