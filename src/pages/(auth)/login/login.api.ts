import { api } from "@/config/api.config";
import type { LoginValidatorType } from "./login.validator";
import type { LoginResponse, LogoutResponse } from "./login.type";

export const loginRequest = async (
    payload: LoginValidatorType
): Promise<LoginResponse> => {
    const sanitizedPayload = {
        identifier: payload.identifier.trim().toLowerCase(),
        password: payload.password,
    };

    const { data } = await api.post<LoginResponse>(
        "/api/auth/login", 
        sanitizedPayload,
        {
            withCredentials: true, // For refresh token cookie
        }
    );
    return data;
};

export const logoutRequest = async (): Promise<LogoutResponse> => {
    const { data } = await api.delete<LogoutResponse>(
        "/api/auth/logout",
        {
            withCredentials: true,
        }
    );
    return data;
};
