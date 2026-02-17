import { api } from "@/config/api.config";
import type { RegisterSchoolValidatorType } from "./register.validator";
import type { RegisterSchoolResponse } from "./register.type";

export const registerSchoolRequest = async (
    payload: RegisterSchoolValidatorType
): Promise<RegisterSchoolResponse> => {
    // Sanitize payload - remove empty strings, trim values
    const sanitizedPayload: Record<string, string> = {
        nama_sekolah: payload.nama_sekolah.trim(),
        nama_kepala_sekolah: payload.nama_kepala_sekolah.trim(),
        password: payload.password,
    };

    // Only include email/phone if they have values
    if (payload.email && payload.email.trim().length > 0) {
        sanitizedPayload.email = payload.email.trim().toLowerCase();
    }
    
    if (payload.phone && payload.phone.trim().length > 0) {
        // Remove any non-numeric characters and add country code if needed
        sanitizedPayload.phone = payload.phone.replace(/\D/g, '');
    }

    const { data } = await api.post<RegisterSchoolResponse>("/api/auth/register", sanitizedPayload);
    return data;
};
