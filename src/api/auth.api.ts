import { api } from "@/config/api.config"

export const verifyToken = async (token: string) => {
    const { data } = await api.get("/api/auth/verify-token", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    return data
}