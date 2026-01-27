import { useMutation } from "@tanstack/react-query"
import type { LoginValidatorType } from "./login.validator"
import { loginRequest } from "./login.api"

export const useLogin = () => {
    return useMutation({
        mutationFn: (payload: LoginValidatorType) => loginRequest(payload)
    })
}