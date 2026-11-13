/**
 * Mock landlord accounts. This is a frontend-only prototype: passwords are
 * stored in plain text on purpose and must never be real ones.
 *
 * Demo login: demo@baanchao.test / demo1234
 */
export type MockUser = {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  createdAt: string
}

export type PublicUser = Omit<MockUser, "password">

export const seedUsers: MockUser[] = [
  {
    id: "u_demo",
    firstName: "สมศรี",
    lastName: "ใจดี",
    email: "demo@baanchao.test",
    phone: "081-234-5678",
    password: "demo1234",
    createdAt: "2026-01-15T09:00:00.000Z",
  },
]
