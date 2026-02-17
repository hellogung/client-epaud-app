import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useAuthStore } from "../login/login.store";
import { logoutRequest } from "../login/login.api";
import type { LogoutResponse } from "../login/login.type";

type ApiErrorResponse = {
    message: string;
};

export const useLogout = () => {
    const navigate = useNavigate();
    const logout = useAuthStore((state) => state.logout);
    const queryClient = useQueryClient();

    return useMutation<
        LogoutResponse,
        AxiosError<ApiErrorResponse>,
        void
    >({
        mutationFn: () => logoutRequest(),
        onSuccess: () => {
            // Clear auth state
            logout();
            
            // Clear all cached queries to prevent stale auth data
            queryClient.clear();

            toast.success("Logout berhasil", {
                duration: 2000,
            });

            navigate("/login", { replace: true });
        },
        onError: (error) => {
            // Even if API fails, clear local state
            logout();
            
            // Clear all cached queries
            queryClient.clear();

            const message = error.response?.data?.message || "Logout gagal";
            toast.error(message, {
                duration: 3000,
            });

            navigate("/login", { replace: true });
        },
    });
};
