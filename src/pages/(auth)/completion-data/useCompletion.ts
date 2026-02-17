import { useMutation, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { getSchoolRequest, updateSchoolRequest } from "./completion.api";
import type { 
    GetSchoolResponse, 
    UpdateSchoolRequest, 
    UpdateSchoolResponse 
} from "./completion.type";

type ApiErrorResponse = {
    message: string;
    errors?: Record<string, string[]>;
};

export const useGetSchool = (schoolId: string | null) => {
    return useQuery<GetSchoolResponse, AxiosError<ApiErrorResponse>>({
        queryKey: ["school", schoolId],
        queryFn: () => getSchoolRequest(schoolId!),
        enabled: !!schoolId,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

export const useUpdateSchool = (schoolId: string) => {
    return useMutation<
        UpdateSchoolResponse,
        AxiosError<ApiErrorResponse>,
        UpdateSchoolRequest
    >({
        mutationFn: (payload) => updateSchoolRequest(schoolId, payload),
    });
};
