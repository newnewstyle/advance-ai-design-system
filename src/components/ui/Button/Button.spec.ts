import type { ComponentSpec } from "@/lib/component-spec"

/**
 * Button usage and decision rules: the single source of truth.
 * Button.md covers props, tokens and an example and does not repeat these.
 */
export const buttonSpec = {
  name: "Button",
  purpose:
    "ปุ่มที่ผู้ใช้กดเพื่อสั่งให้เกิด action ในหน้านั้น เช่น บันทึก ส่ง ลบ เปิดหน้าต่าง",

  whenToUse: [
    {
      situation: "action หลักของฟอร์มหรือหน้า (มีได้ 1 ปุ่มต่อพื้นที่)",
      use: '`default` เช่น "บันทึก", "เข้าสู่ระบบ"',
    },
    {
      situation: "ปุ่มหลักในฟอร์มแคบ (หน้าเข้าสู่ระบบ, สมัครสมาชิก)",
      use: "`default` ขนาด `lg` กว้างเต็มฟอร์ม",
    },
    {
      situation: "action รองที่วางคู่กับปุ่มหลัก (ยกเลิก, ย้อนกลับ, ส่งออก)",
      use: "`outline`",
    },
    {
      situation: "ปุ่มที่เปิดการลบ (ยังไม่ลบจริง)",
      use: "`destructive` (แดงอ่อน) แล้วเปิด AlertDialog ให้ยืนยัน",
    },
    {
      situation: "ปุ่มยืนยันลบครั้งสุดท้ายใน AlertDialog (ย้อนกลับไม่ได้)",
      use: "`destructive-solid` (แดงทึบ)",
    },
    {
      situation: "ปุ่มเล็กใน toolbar, เมนู, หัวตาราง หรือปุ่มไอคอนในช่องกรอก",
      use: "`ghost` ขนาด `icon-*` พร้อม `aria-label` ภาษาไทย",
    },
    {
      situation: "action สั้นๆ ที่แทรกในประโยค และไม่เปลี่ยนหน้า",
      use: '`link` เช่น "กรอกให้อัตโนมัติ" ในหน้าเข้าสู่ระบบ',
    },
    {
      situation: "เปิด Dialog, Sheet, เมนู หรือ Tooltip",
      use: "ปุ่มเป็นตัวเปิดของ overlay นั้น ส่วนใหญ่ใช้ `outline`",
    },
    {
      situation: "กำลังส่งข้อมูล รอผล",
      use: "ใส่ `loading` ปุ่มจะหมุนและกดซ้ำไม่ได้เอง",
    },
    {
      situation:
        "ปุ่มที่เกี่ยวข้องกันหลายปุ่มติดเป็นแถบ (ช่วงเวลา, เลื่อนหน้า)",
      use: "ห่อด้วย `ButtonGroup`",
    },
  ],

  whenNotToUse: [
    {
      case: "พาไปหน้าอื่น (เปลี่ยน URL)",
      instead:
        "ใช้ลิงก์ (`<Link>`) ถ้าอยากให้หน้าตาเป็นปุ่ม ดู TODO ด้านล่างก่อน",
    },
    {
      case: "เปิด/ปิดค่า",
      instead: "`Switch` หรือ `Checkbox` ปุ่มคือการสั่งงาน ไม่ใช่การเก็บค่า",
    },
    { case: "เลือก 1 จากหลายตัวเลือก", instead: "`Select` หรือ `Tabs`" },
    {
      case: "แสดงสถานะ (ชำระแล้ว, ค้างชำระ)",
      instead: "`Badge` ซึ่งเป็นป้าย ไม่ใช่สิ่งที่กดได้",
    },
    {
      case: "ปุ่ม `default` มากกว่า 1 ปุ่มในพื้นที่เดียวกัน",
      instead: "ปุ่มที่เหลือลดเป็น `outline` หรือ `ghost`",
    },
    {
      case: "`destructive-solid` นอก AlertDialog",
      instead: "`destructive` (ถ้าแดงทึบทุกที่ ปุ่มยืนยันลบจะไม่เด่นอีกต่อไป)",
    },
    {
      case: "`link` ที่อยู่เดี่ยวๆ นอกประโยค โดยไม่มีระยะรอบๆ",
      instead:
        "เว้นพื้นที่กดหรือระยะรอบๆ อย่างน้อย 24px (WCAG 2.5.8) หรือใช้ `ghost`",
    },
  ],

  decisions: [
    {
      rule: "ไม่มี `secondary` ปุ่มรองใช้ `outline` อย่างเดียว",
      why: "ทุกปุ่มในแอปวางบนพื้นขาว และกฎเดียวทำให้ไม่ต้องลังเล ระบบใหญ่อย่าง Primer, Atlassian, Ant Design ก็มีปุ่มระดับกลางแบบเดียว ถ้าวันหน้าต้องวางปุ่มบนพื้นสีแล้ว `outline` ดูจม ให้กลับมาตัดสินใหม่",
    },
    {
      rule: "สีลิงก์ (`--link`) แยกจากสีแบรนด์",
      why: "สีแบรนด์ในโหมดมืดได้ contrast แค่ 2.45:1 ไม่ผ่านเกณฑ์ `--link` สว่างขึ้นในโหมดมืด (5.38:1) ส่วนพื้นปุ่ม `default` ยังใช้สีแบรนด์",
    },
    {
      rule: "`destructive-solid` ใช้เฉพาะปุ่มยืนยันลบใน AlertDialog",
      why: "แดงทึบต้องเด่นที่สุดตอนที่ย้อนกลับไม่ได้ ถ้าใช้บ่อยจะหมดความหมาย",
    },
  ],

  todos: [
    'ปุ่มที่ทำเป็นลิงก์ (`render={<Link />}` + `nativeButton={false}`) ยังได้ `role="button"` จาก Base UI โปรแกรมอ่านหน้าจอจึงอ่านว่า "ปุ่ม" ทั้งที่พาไปหน้าอื่น (ตรวจแล้วใน story `AsLink` และพบใน gallery 2 จุด) ต้องตัดสินว่าจะใส่ `role="link"` ทับ, ทำ component ลิงก์หน้าตาปุ่มแยกต่างหาก หรือยอมรับไว้',
  ],
} satisfies ComponentSpec
