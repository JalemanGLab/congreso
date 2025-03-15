import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthUser } from "@/types/auth";
import { Session } from "@supabase/supabase-js";

export type AuthSession = Session;
export type UserRole = "authenticated" | "admin" | "user" | "superadmin";

interface AuthState {
  session: AuthSession | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  accessToken: string | null;
  userRole: UserRole | null;

  // Acciones
  setAuth: (session: AuthSession) => void;
  clearAuth: () => void;
  updateUser: (user: Partial<AuthUser>) => void;
  setUserRole: (role: UserRole) => void;

  // Getters
  getRole: () => UserRole | null;
  isAdmin: () => boolean;
  isSuperAdmin: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      session: null,
      user: null,
      isAuthenticated: false,
      accessToken: null,
      userRole: null,

      setAuth: (session) =>
        set({
          session,
          user: session.user,
          isAuthenticated: true,
          accessToken: session.access_token,
          userRole: session.user.user_metadata?.role || "user",
        }),

      clearAuth: () =>
        set({
          session: null,
          user: null,
          isAuthenticated: false,
          accessToken: null,
          userRole: null,
        }),

      updateUser: (userData) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...userData } : null,
        })),

      setUserRole: (role) =>
        set((state) => ({
          userRole: role,
          user: state.user
            ? {
                ...state.user,
                user_metadata: {
                  ...state.user.user_metadata,
                  role,
                },
              }
            : null,
        })),

      getRole: () => get().userRole,

      isAdmin: () => get().userRole === "admin",

      isSuperAdmin: () => get().userRole === "superadmin",
    }),
    {
      name: "auth-storage",
      // Solo persistimos lo necesario
      partialize: (state) => ({
        session: state.session,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        accessToken: state.accessToken,
        userRole: state.userRole,
      }),
    }
  )
);
