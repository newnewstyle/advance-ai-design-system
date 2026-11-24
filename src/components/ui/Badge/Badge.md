`src/components/ui/Badge/Badge.md` · ส่วน 1–3 AI ร่างจากการใช้งานจริงในโค้ด ตัดสินร่วมกับทีมแล้ว (grilling 2026-11-24) · ส่วน 4–6 มาจากโค้ดและ stories ตรวจแล้ว

# Badge

```tsx
import { Badge } from "@/components/ui/Badge"
```

Storybook: `Components/Badge` · ดูรวมกับ component อื่นที่หน้า gallery `/` หมวด "ปุ่มและป้าย"

---

## 1. Purpose (ทำหน้าที่อะไร)

ป้ายเล็กๆ ที่**บอกสถานะหรือหมวดหมู่**ของข้อมูล เช่น ชำระแล้ว ค้างชำระ มีผู้เช่า ทาวน์เฮาส์ ผู้ใช้อ่านแล้วรู้ทันที โดยไม่ต้องกดอะไร Badge เป็น `<span>` ธรรมดา กดไม่ได้ (เว้นแต่ใช้ `render` ให้เป็นลิงก์)

## 2. ควรใช้ตอนไหน (When to use)

### ชุดสถานะ (4 ระดับ)

| ระดับ     | `variant`     | สถานะ        | ไอคอน               | ตัวอย่างในโค้ด                               |
| --------- | ------------- | ------------ | ------------------- | -------------------------------------------- |
| เรียบร้อย | `success`     | ชำระแล้ว     | `CircleCheckIcon`   | `statusInfo` ใน gallery, `Table.stories.tsx` |
| เรียบร้อย | `success`     | มีผู้เช่า    | `CircleCheckIcon`   | Card ใน gallery, `Card.stories.tsx`          |
| เรียบร้อย | `success`     | เสร็จแล้ว    | ไอคอนอยู่หน้าแถว    | การ์ดแผนงานใน `dashboard/overview.tsx`       |
| ข้อมูล    | `outline`     | ว่าง         | `CircleDashedIcon`  | story `Status`                               |
| ข้อมูล    | `outline`     | ยังไม่เริ่ม  | ไอคอนอยู่หน้าแถว    | การ์ดแผนงานใน `dashboard/overview.tsx`       |
| จับตา     | `warning`     | ใกล้ครบกำหนด | `ClockIcon`         | `statusInfo` ใน gallery, `Table.stories.tsx` |
| จับตา     | `warning`     | สัญญาใกล้หมด | `CalendarClockIcon` | story `Status`                               |
| รีบจัดการ | `destructive` | ค้างชำระ     | `CircleAlertIcon`   | `statusInfo` ใน gallery, `Table.stories.tsx` |

สถานะใหม่ (เช่นสถานะงานซ่อมในเฟส 5) ให้เลือกระดับก่อน แล้วใช้ variant ของระดับนั้น

### ป้ายอื่น

| สถานการณ์                       | ใช้แบบนี้                                                | ตัวอย่างในโค้ด                             |
| ------------------------------- | -------------------------------------------------------- | ------------------------------------------ |
| หมวดหมู่ (ไม่ใช่สถานะ)          | `variant="secondary"` ไม่ต้องมีไอคอน                     | story `Category` (ทาวน์เฮาส์, ประปา, แอร์) |
| ป้ายเน้น เช่น "ใหม่" หรือตัวเลข | `variant="default"` (สีแบรนด์)                           | story `Playground` ("ใหม่")                |
| ป้ายที่กดไปดูรายละเอียดได้      | `render={<a href="…" />}` (hover ทำงานเฉพาะตอนเป็นลิงก์) | story `AsLink` ("ดูสัญญา")                 |

**กฎสถานะ:** ห้ามบอกสถานะด้วยสีอย่างเดียว Badge สถานะต้องมี**ข้อความ**เสมอ และต้องมี**ไอคอน**ด้วย เว้นแต่แถวนั้นมีไอคอนสถานะเดียวกันอยู่แล้ว (เช่น `overview.tsx`) ไอคอนใส่ `aria-hidden` เพราะข้อความบอกความหมายครบแล้ว

## 3. ไม่ควรใช้ตอนไหน (When not to use)

- **ต้องกดเพื่อสั่งงาน** (ส่ง, ลบ, บันทึก) ใช้ `Button` แทน Badge เป็นป้าย ไม่ใช่ปุ่ม
- **ข้อความยาวหรือหลายบรรทัด** Badge สูง 20px และไม่ตัดบรรทัด (`whitespace-nowrap`) ให้ใช้ข้อความธรรมดาหรือ Card แทน
- **แจ้งเตือนชั่วคราวหลังทำอะไรเสร็จ** (บันทึกแล้ว, ส่งแล้ว) ใช้ toast (`sonner`) แทน Badge ที่ค้างอยู่บนหน้า
- **ตัวเลขหรือจำนวนเงินสำคัญ** (ยอดค้าง, KPI) ให้แสดงเป็นตัวเลขขนาดปกติพร้อม `tabular-nums` อย่าย่อลงไปอยู่ใน Badge
- **`default` กับสถานะ** สีแบรนด์เป็นส้ม ใกล้กับสีเหลืองของ `warning` ถ้าใช้กับสถานะจะสับสนกับ "จับตา" ใช้ `default` กับป้ายเน้นเท่านั้น
- **`secondary` กับสถานะ** `secondary` (เทา) เป็นป้ายหมวดหมู่ ถ้าใช้กับสถานะจะไม่รู้ว่าอยู่ระดับไหน
- **ไม่มี `ghost` และ `link` (ตั้งใจ)** ลบไปแล้วเพราะไม่ถูกใช้ในแอป `ghost` ไม่มีพื้นและขอบจึงไม่ดูเป็นป้าย ป้ายที่เป็นลิงก์ให้ใช้ `render={<a />}` แทน
- **ทำไมสถานะเรียบร้อยเป็นเขียว** ทีมเลือกเขียวเพราะดูสวยและให้ความรู้สึกดีกับเจ้าของบ้าน ข้อแลกคือตารางที่ส่วนใหญ่ชำระแล้วจะเขียวเยอะ ทำให้แถวแดงและเหลืองเด่นน้อยลง ถ้าใช้จริงแล้วรู้สึกว่ารก ทางเลือกสำรองคือป้ายเทา (`secondary`) + ไอคอน ✓ สีเขียว (`text-success`)
- **สีแดงปรับให้ผ่าน WCAG แล้ว** เดิม `destructive` ได้ contrast 3.97 / 4.48 ต่ำกว่าเกณฑ์ 4.5:1 จึงปรับ `--destructive` ทั้งระบบ (สว่าง: เข้มขึ้น, มืด: สว่างขึ้น) ซึ่งช่วยให้ Button และข้อความ error อ่านง่ายขึ้นด้วย

---

## 4. Props และ variants

```ts
type BadgeProps = useRender.ComponentProps<"span"> & {
  variant?: BadgeVariant // ค่าเริ่มต้น "default"
}
```

render เป็น `<span>` รับ props ทั้งหมดของ span และ `render` ของ Base UI (`useRender`) สำหรับเปลี่ยน element เช่น `render={<a href="…" />}` และ `className` สำหรับ override (utility ชนะสไตล์ของ module เสมอ) type ที่ export: `Badge`, `BadgeProps`, `BadgeVariant`

Element ที่ render ออกมามี `data-slot="badge"` และ `data-variant` (มาจาก `state` ของ `useRender`) ซึ่ง CSS ใช้เลือกสไตล์ (`.badge[data-variant="outline"]`)

ไม่มี prop `size` ทุก Badge สูง 20px (`h-5`), padding แนวนอน 8px, ตัวอักษร `text-xs`, มุมโค้งเต็ม (`rounded-4xl`)

### Variant (หน้าตา)

| `variant`     | พื้นหลัง                       | ตัวอักษร                 | ตอน hover (เฉพาะเมื่อเป็นลิงก์ `<a>`) | contrast (light / dark) |
| ------------- | ------------------------------ | ------------------------ | ------------------------------------- | ----------------------- |
| `default`     | `--primary`                    | `--primary-foreground`   | `--primary` 80%                       | 4.85 / 6.84             |
| `secondary`   | `--secondary`                  | `--secondary-foreground` | `--secondary` 80%                     | 16.12 / 14.27           |
| `outline`     | โปร่งใส + เส้น `--border`      | `--foreground`           | `--muted` + `--muted-foreground`      | 19.76 / 16.74           |
| `success`     | `--success` 10% (dark 20%)     | `--success`              | `--success` 20%                       | 5.08 / 5.76             |
| `warning`     | `--warning` 10% (dark 20%)     | `--warning`              | `--warning` 20%                       | 5.33 / 6.10             |
| `destructive` | `--destructive` 10% (dark 20%) | `--destructive`          | `--destructive` 20%                   | 4.83 / 4.90             |

ค่า contrast วัดในหน้า gallery บนพื้น Card (2026-11-24)

### สถานะ

| สถานะ             | สไตล์                                                           | วิธีเปิด                         |
| ----------------- | --------------------------------------------------------------- | -------------------------------- |
| Focus (คีย์บอร์ด) | เส้นขอบ `--ring` + วง 3px สี `--ring` 50% (สถานะใช้สีของตัวเอง) | อัตโนมัติ เมื่อ render เป็นลิงก์ |
| Invalid           | เส้นขอบและวงสี `--destructive`                                  | `aria-invalid`                   |

### ไอคอน

- SVG ที่เป็นลูกตรงของ Badge ถูกบังคับขนาด 12px (`[&>svg]:size-3!`) เปลี่ยนด้วย class `size-*` ไม่ได้
- ใส่ `data-icon="inline-start"` หรือ `"inline-end"` บนไอคอน Badge จะลด padding ฝั่งนั้นเหลือ 6px

---

## 5. Tokens ที่ใช้

ค่าจริงอยู่ใน `src/app/globals.css` Badge เรียกผ่าน utility (`bg-success`, `text-warning` …) ที่ map ไว้ใน `@theme inline`

| Token                    | Light (`:root`)              | Dark (`[data-theme="dark"]`) | ใช้ใน                        |
| ------------------------ | ---------------------------- | ---------------------------- | ---------------------------- |
| `--primary`              | `oklch(0.555 0.163 48.998)`  | `oklch(0.473 0.137 46.201)`  | พื้น `default`               |
| `--primary-foreground`   | `oklch(0.987 0.022 95.277)`  | `oklch(0.987 0.022 95.277)`  | ตัวอักษร `default`           |
| `--secondary`            | `oklch(0.967 0.001 286.375)` | `oklch(0.274 0.006 286.033)` | พื้น `secondary`             |
| `--secondary-foreground` | `oklch(0.21 0.006 285.885)`  | `oklch(0.985 0 0)`           | ตัวอักษร `secondary`         |
| `--success`              | `oklch(0.49 0.13 150)`       | `oklch(0.76 0.15 150)`       | `success`                    |
| `--warning`              | `oklch(0.5 0.11 70)`         | `oklch(0.8 0.14 85)`         | `warning`                    |
| `--destructive`          | `oklch(0.53 0.22 27)`        | `oklch(0.74 0.17 22)`        | `destructive`, สถานะ invalid |
| `--border`               | `oklch(0.923 0.003 48.717)`  | `oklch(1 0 0 / 10%)`         | เส้นขอบ `outline`            |
| `--foreground`           | `oklch(0.147 0.004 49.25)`   | `oklch(0.985 0.001 106.423)` | ตัวอักษร `outline`           |
| `--muted`                | `oklch(0.97 0.001 106.424)`  | `oklch(0.268 0.007 34.298)`  | hover ของ `outline`          |
| `--muted-foreground`     | `oklch(0.553 0.013 58.071)`  | `oklch(0.709 0.01 56.259)`   | ตัวอักษรตอน hover            |
| `--ring`                 | `oklch(0.709 0.01 56.259)`   | `oklch(0.553 0.013 58.071)`  | วง focus                     |

`--success` และ `--warning` เป็น token สถานะของทั้งระบบ ใช้กับ component อื่นได้ (เช่นข้อความ `text-success`) ไม่ได้เป็นของ Badge อย่างเดียว

---

## 6. ตัวอย่าง

ตัวอย่างที่กดลองได้อยู่ใน Storybook `Components/Badge` (Playground, Variants, Status, Category, AsLink)

```tsx
import {
  CalendarClockIcon,
  CircleAlertIcon,
  CircleCheckIcon,
  CircleDashedIcon,
  ClockIcon,
} from "lucide-react"

// สถานะ: ไอคอน + ข้อความเสมอ
<Badge variant="success">
  <CircleCheckIcon aria-hidden />
  ชำระแล้ว
</Badge>
<Badge variant="outline">
  <CircleDashedIcon aria-hidden />
  ว่าง
</Badge>
<Badge variant="warning">
  <CalendarClockIcon aria-hidden />
  สัญญาใกล้หมด
</Badge>
<Badge variant="destructive">
  <CircleAlertIcon aria-hidden />
  ค้างชำระ
</Badge>

// หมวดหมู่
<Badge variant="secondary">ทาวน์เฮาส์</Badge>

// ป้ายที่เป็นลิงก์
<Badge render={<a href="/leases/12" />}>ดูสัญญา</Badge>
```
