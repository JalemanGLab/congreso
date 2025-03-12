import { Session } from "react-router-dom"

export interface AuthUser {
  id: string
  email?: string
  user_metadata?: {
    name?: string
    avatar_url?: string
  }
}

export interface AuthState {
  user: AuthUser | null
  session: Session | null
  isLoading: boolean
  setUser: (user: AuthUser | null) => void
  setSession: (session: Session | null) => void
  setLoading: (isLoading: boolean) => void
  signOut: () => Promise<void>
} 