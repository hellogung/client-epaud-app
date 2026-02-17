import { api } from "@/config/api.config";

// Types
export type RefreshTokenResponse = {
    success: boolean;
    access_token: string;
};

export type VerifyTokenResponse = {
    valid: boolean;
};

export type ProfileData = {
    id: string;
    full_name: string;
    username: string;
    role: string;
};

export type ProfileResponse = {
    success: boolean;
    data: ProfileData;
};

// Verify Token
export const verifyToken = async (token: string): Promise<VerifyTokenResponse> => {
    const { data } = await api.get<VerifyTokenResponse>("/api/auth/verify-token", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};

// Refresh Token (uses HTTP-only cookie)
export const refreshToken = async (): Promise<RefreshTokenResponse> => {
    const { data } = await api.post<RefreshTokenResponse>(
        "/api/auth/refresh",
        {},
        {
            withCredentials: true,
        }
    );
    return data;
};

// Get Profile
export const getProfile = async (token: string): Promise<ProfileResponse> => {
    const { data } = await api.get<ProfileResponse>("/api/auth/profile", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return data;
};
