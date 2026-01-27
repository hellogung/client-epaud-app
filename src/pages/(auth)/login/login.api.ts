import { api } from "@/config/api.config";
import type { LoginValidatorType } from "./login.validator";

export const loginRequest = async (payload: LoginValidatorType) => {
    const { data } = await api.post("/api/auth/login", payload)
    return data
}