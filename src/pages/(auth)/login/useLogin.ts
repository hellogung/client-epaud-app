import { useMutation } from "@tanstack/react-query"
import type { LoginValidatorType } from "./login.validator"
import { loginRequest } from "./login.api"
import { toast } from "sonner"
import { useNavigate } from "react-router"
import { useAuthStore, type UserLoginResponse } from "./login.store"

export const useLogin = () => {
    const navigate = useNavigate();
    const setAuth = useAuthStore((state) => state.setAuth)


    return useMutation({
        mutationFn: (payload: LoginValidatorType) => loginRequest(payload),
        onSuccess: async (response) => {
            setAuth(response.data.access_token, response.data.user)
            toast.success("Login berhasil", {
                duration: 1000,
            });

            await new Promise((resolve) => setTimeout(resolve, 1000));

            navigate("/panel", { replace: true });
        }
    })
}