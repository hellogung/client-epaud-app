import { api } from "@/config/api.config";
import type { RegisterSchoolValidatorType } from "./register.validator";

export const registerSchoolRequest = async (payload: RegisterSchoolValidatorType) => {
    const { data } = await api.post("/api/auth/register", payload)
    return data
}