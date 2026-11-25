# ตั้งค่าครั้งเดียวในแอป (ใช้ร่วมกันทุกคอมโพเนนต์)

ทำครั้งเดียวต่อแอป แล้วทุก component ใน `src/components/ui/` ใช้ได้ทันที ในโปรเจกต์นี้ตั้งไว้แล้วที่ `src/app/layout.tsx`

1. **แพ็กเกจที่ต้องมี:** `react`, `react-dom`, `next` (แอปเป็น Next.js) และที่ component ใช้: `@base-ui/react`, `cn`, `lucide-react`, `sonner`, `next-themes` TODO: component ยังไม่ได้แยกเป็นแพ็กเกจ npm ใช้ได้เฉพาะในโปรเจกต์นี้ผ่าน path `@/components/ui/<Name>`

2. **import สไตล์ครั้งเดียว** ใน root layout (token สี, ฟอนต์, มุมโค้ง อยู่ในไฟล์นี้)

   ```tsx
   import "./globals.css"
   ```

3. **ฟอนต์ IBM Plex Sans Thai** โหลดด้วย `next/font/google` เป็นตัวแปร `--font-plex-thai` แล้วใส่ตัวแปรกับ class `font-sans` ที่ `<html>`

4. **โหมดมืด** ใช้ attribute `data-theme="dark"` ที่ `<html>` (ไม่ใช่ class `dark`) ห่อแอปด้วย `ThemeProvider` ซึ่งตั้งให้แล้ว กด `d` เพื่อสลับโหมด

5. **ตัวครอบที่บาง component ต้องใช้:** `TooltipProvider` (สำหรับ Tooltip) และวาง `<Toaster />` ครั้งเดียว (สำหรับ toast)

   ```tsx
   <ThemeProvider>
     <TooltipProvider>{children}</TooltipProvider>
     <Toaster />
   </ThemeProvider>
   ```
