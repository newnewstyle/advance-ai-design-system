/** Local form validation. Each rule returns a Thai error message or undefined. */

export type FieldErrors<T extends string> = Partial<Record<T, string>>

export function validateEmail(value: string) {
  if (!value.trim()) return "กรุณากรอกอีเมล"
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()))
    return "รูปแบบอีเมลไม่ถูกต้อง"
}

export function validateRequired(value: string, label: string) {
  if (!value.trim()) return `กรุณากรอก${label}`
}

export function validatePhone(value: string) {
  const digits = value.replace(/\D/g, "")
  if (!digits) return "กรุณากรอกเบอร์โทรศัพท์"
  if (!/^0\d{8,9}$/.test(digits))
    return "เบอร์โทรศัพท์ต้องขึ้นต้นด้วย 0 และมี 9–10 หลัก"
}

export function validateNewPassword(value: string) {
  if (!value) return "กรุณากรอกรหัสผ่าน"
  if (value.length < 8) return "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร"
}

export function validateConfirm(value: string, password: string) {
  if (!value) return "กรุณายืนยันรหัสผ่าน"
  if (value !== password) return "รหัสผ่านไม่ตรงกัน"
}

/** Drops undefined entries; returns null when the form is valid. */
export function collectErrors<T extends string>(
  errors: Record<T, string | undefined>
): FieldErrors<T> | null {
  const entries = Object.entries(errors).filter(([, v]) => v)
  return entries.length ? (Object.fromEntries(entries) as FieldErrors<T>) : null
}
