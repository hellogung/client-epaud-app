import { api } from "@/config/api.config";
import type { 
    SendVerificationRequest, 
    SendVerificationResponse, 
    VerifyAccountRequest, 
    VerifyAccountResponse 
} from "./verification.type";

export const sendVerificationRequest = async (
    payload: SendVerificationRequest
): Promise<SendVerificationResponse> => {
    const { data } = await api.post<SendVerificationResponse>(
        "/api/auth/send-verification", 
        payload
    );
    return data;
};

export const verifyAccountRequest = async (
    payload: VerifyAccountRequest
): Promise<VerifyAccountResponse> => {
    const sanitizedPayload = {
        user_id: payload.user_id.trim(),
        code: payload.code.trim(),
    };
    
    const { data } = await api.post<VerifyAccountResponse>(
        "/api/auth/verify", 
        sanitizedPayload
    );
    return data;
};
