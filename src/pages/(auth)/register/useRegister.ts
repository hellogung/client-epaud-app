import {useMutation} from "@tanstack/react-query"
import type { RegisterSchoolValidatorType } from "./register.validator"
import { registerSchoolRequest } from "./register.api"
export const useRegisterSchool = () => {
    return useMutation({
        mutationFn: (payload: RegisterSchoolValidatorType) => registerSchoolRequest(payload)
    })
}