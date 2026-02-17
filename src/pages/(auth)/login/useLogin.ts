import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import type { LoginValidatorType } from "./login.validator";
import type { LoginResponse } from "./login.type";
import { loginRequest } from "./login.api";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useAuthStore } from "./login.store";

type ApiErrorResponse = {
    message: string;
    errors?: Record<string, string[]>;
};

export const useLogin = () => {
    const navigate = useNavigate();
    const setAuth = useAuthStore((state) => state.setAuth);

    return useMutation<
        LoginResponse,
        AxiosError<ApiErrorResponse>,
        LoginValidatorType
    >({
        mutationFn: (payload) => loginRequest(payload),
        onSuccess: (response) => {
            setAuth(response.data.access_token, response.data.user);
            
            toast.success("Login berhasil", {
                duration: 2000,
            });

            navigate("/panel", { replace: true });
        },
        onError: (error) => {
            const message = error.response?.data?.message || "Login gagal";
            
            // Check for specific error cases
            if (error.response?.status === 403) {
                toast.error("Akun belum diverifikasi. Silakan verifikasi akun Anda.", {
                    duration: 4000,
                });
            } else {
                toast.error(message, {
                    duration: 3000,
                });
            }
        },
    });
};
