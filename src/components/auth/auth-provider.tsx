"use client"

import * as React from "react"

import * as store from "@/lib/auth/store"
import type { PublicUser } from "@/lib/mock/users"

type AuthState =
  | { status: "loading"; user: null } // server render / before hydration
  | { status: "guest"; user: null }
  | { status: "authenticated"; user: PublicUser }

type AuthContextValue = AuthState & {
  login: typeof store.login
  register: typeof store.register
  logout: typeof store.logout
  updateProfile: typeof store.updateProfile
  changePassword: typeof store.changePassword
}

const AuthContext = React.createContext<AuthContextValue | null>(null)

// undefined on the server = "don't know yet"; localStorage is client-only.
const getServerSnapshot = () => undefined

function AuthProvider({ children }: { children: React.ReactNode }) {
  const user = React.useSyncExternalStore<PublicUser | null | undefined>(
    store.subscribe,
    store.getCurrentUser,
    getServerSnapshot
  )

  const value = React.useMemo<AuthContextValue>(() => {
    const state: AuthState =
      user === undefined
        ? { status: "loading", user: null }
        : user
          ? { status: "authenticated", user }
          : { status: "guest", user: null }
    return {
      ...state,
      login: store.login,
      register: store.register,
      logout: store.logout,
      updateProfile: store.updateProfile,
      changePassword: store.changePassword,
    }
  }, [user])

  return <AuthContext value={value}>{children}</AuthContext>
}

function useAuth() {
  const ctx = React.useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>")
  return ctx
}

export { AuthProvider, useAuth }
