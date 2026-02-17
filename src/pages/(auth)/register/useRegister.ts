import { useMutation } from "@tanstack/react-query";
import type { RegisterSchoolValidatorType } from "./register.validator";
import type { RegisterSchoolResponse } from "./register.type";
import { registerSchoolRequest } from "./register.api";
import { AxiosError } from "axios";

type ApiErrorResponse = {
    message: string;
    errors?: Record<string, string[]>;
};

export const useRegisterSchool = () => {
    return useMutation<
        RegisterSchoolResponse,
        AxiosError<ApiErrorResponse>,
        RegisterSchoolValidatorType
    >({
        mutationFn: (payload: RegisterSchoolValidatorType) => registerSchoolRequest(payload),
    });
};
