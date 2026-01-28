import { api } from "@/config/api.config";
import type { LoginValidatorType, LogoutValidatorType } from "./login.validator";

export const loginRequest = async (payload: LoginValidatorType) => {
    const { data } = await api.post("/api/auth/login", payload)
    return data
}

export const logoutRequest = async (payload: LogoutValidatorType) => {
    const { data } = await api.delete("api/auth/logout", {
        data: payload
    })
    return data
}