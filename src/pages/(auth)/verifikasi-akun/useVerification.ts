import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { sendVerificationRequest, verifyAccountRequest } from "./verification.api";
import type { 
    SendVerificationRequest, 
    SendVerificationResponse, 
    VerifyAccountRequest, 
    VerifyAccountResponse 
} from "./verification.type";

type ApiErrorResponse = {
    message: string;
    errors?: Record<string, string[]>;
};

export const useSendVerification = () => {
    return useMutation<
        SendVerificationResponse,
        AxiosError<ApiErrorResponse>,
        SendVerificationRequest
    >({
        mutationFn: (payload) => sendVerificationRequest(payload),
    });
};

export const useVerifyAccount = () => {
    return useMutation<
        VerifyAccountResponse,
        AxiosError<ApiErrorResponse>,
        VerifyAccountRequest
    >({
        mutationFn: (payload) => verifyAccountRequest(payload),
    });
};
