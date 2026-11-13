/**
 * Fake client-side auth. Users and the current session live in localStorage,
 * so everything resets per browser. No network calls.
 */
import { seedUsers, type MockUser, type PublicUser } from "@/lib/mock/users"

const USERS_KEY = "baanchao:users"
const SESSION_KEY = "baanchao:session"

export type AuthResult = { ok: true } | { ok: false; error: string }

// ---------- storage helpers ----------

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function write(key: string, value: unknown) {
  try {
    if (value === null) localStorage.removeItem(key)
    else localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // storage blocked (private mode etc.) — the prototype just won't persist
  }
}

function getUsers(): MockUser[] {
  const stored = read<MockUser[]>(USERS_KEY, [])
  const storedIds = new Set(stored.map((u) => u.id))
  return [...seedUsers.filter((u) => !storedIds.has(u.id)), ...stored]
}

function saveUser(user: MockUser) {
  const stored = read<MockUser[]>(USERS_KEY, []).filter((u) => u.id !== user.id)
  write(USERS_KEY, [...stored, user])
}

function toPublic(user: MockUser): PublicUser {
  const { id, firstName, lastName, email, phone, createdAt } = user
  return { id, firstName, lastName, email, phone, createdAt }
}

const delay = (ms = 500) => new Promise((r) => setTimeout(r, ms))

// ---------- subscription (for useSyncExternalStore) ----------

const listeners = new Set<() => void>()

function emit() {
  cachedKey = undefined
  listeners.forEach((l) => l())
}

export function subscribe(listener: () => void) {
  listeners.add(listener)
  const onStorage = (e: StorageEvent) => {
    if (e.key === SESSION_KEY || e.key === USERS_KEY) emit()
  }
  window.addEventListener("storage", onStorage) // sync across tabs
  return () => {
    listeners.delete(listener)
    window.removeEventListener("storage", onStorage)
  }
}

// The snapshot must be referentially stable between changes.
let cachedKey: string | undefined
let cachedUser: PublicUser | null = null

export function getCurrentUser(): PublicUser | null {
  const key = `${localStorage.getItem(SESSION_KEY)}|${localStorage.getItem(USERS_KEY)}`
  if (key !== cachedKey) {
    cachedKey = key
    const userId = read<string | null>(SESSION_KEY, null)
    const user = userId ? getUsers().find((u) => u.id === userId) : undefined
    cachedUser = user ? toPublic(user) : null
  }
  return cachedUser
}

// ---------- actions ----------

const normalizeEmail = (email: string) => email.trim().toLowerCase()

export async function login(
  email: string,
  password: string
): Promise<AuthResult> {
  await delay()
  const user = getUsers().find((u) => u.email === normalizeEmail(email))
  if (!user || user.password !== password) {
    return { ok: false, error: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" }
  }
  write(SESSION_KEY, user.id)
  emit()
  return { ok: true }
}

export type RegisterInput = Omit<MockUser, "id" | "createdAt">

export async function register(input: RegisterInput): Promise<AuthResult> {
  await delay()
  const email = normalizeEmail(input.email)
  if (getUsers().some((u) => u.email === email)) {
    return { ok: false, error: "อีเมลนี้ถูกใช้สมัครแล้ว" }
  }
  const user: MockUser = {
    ...input,
    email,
    id: `u_${crypto.randomUUID()}`,
    createdAt: new Date().toISOString(),
  }
  saveUser(user)
  write(SESSION_KEY, user.id)
  emit()
  return { ok: true }
}

export function logout() {
  write(SESSION_KEY, null)
  emit()
}

export type ProfileInput = Pick<
  MockUser,
  "firstName" | "lastName" | "email" | "phone"
>

export async function updateProfile(input: ProfileInput): Promise<AuthResult> {
  await delay()
  const current = getCurrentUser()
  const user = current && getUsers().find((u) => u.id === current.id)
  if (!user)
    return { ok: false, error: "ไม่พบบัญชีผู้ใช้ กรุณาเข้าสู่ระบบใหม่" }
  const email = normalizeEmail(input.email)
  if (getUsers().some((u) => u.email === email && u.id !== user.id)) {
    return { ok: false, error: "อีเมลนี้ถูกใช้โดยบัญชีอื่นแล้ว" }
  }
  saveUser({ ...user, ...input, email })
  emit()
  return { ok: true }
}

export async function changePassword(
  currentPassword: string,
  newPassword: string
): Promise<AuthResult> {
  await delay()
  const current = getCurrentUser()
  const user = current && getUsers().find((u) => u.id === current.id)
  if (!user)
    return { ok: false, error: "ไม่พบบัญชีผู้ใช้ กรุณาเข้าสู่ระบบใหม่" }
  if (user.password !== currentPassword) {
    return { ok: false, error: "รหัสผ่านปัจจุบันไม่ถูกต้อง" }
  }
  saveUser({ ...user, password: newPassword })
  emit()
  return { ok: true }
}
