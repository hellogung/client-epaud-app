import { create } from "zustand"
import { persist } from "zustand/middleware"

export type UserLoginResponse = {
    id: string
    full_name: string
    username: string
    role: string
}

type AuthState = {
    token: string | null
    user: UserLoginResponse | null
    isAuthenticated: boolean
    setAuth: (token: string, user: UserLoginResponse) => void
    logout: () => void
    setUser: (user: UserLoginResponse) => void
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            user: null,
            isAuthenticated: false,
            setAuth: (token, user) => set({ token, user, isAuthenticated: true }),
            logout: () => set({ token: null, user: null, isAuthenticated: false }),
            setUser: (user) => set({ user })
        }),
        { name: "auth-storage" }
    )
)