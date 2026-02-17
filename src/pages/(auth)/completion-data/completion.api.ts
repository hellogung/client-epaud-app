import { api } from "@/config/api.config";
import type { 
    GetSchoolResponse, 
    UpdateSchoolRequest, 
    UpdateSchoolResponse 
} from "./completion.type";

export const getSchoolRequest = async (
    schoolId: string
): Promise<GetSchoolResponse> => {
    const { data } = await api.get<GetSchoolResponse>(
        `/api/school/${schoolId}`,
        {
            withCredentials: true,
        }
    );
    return data;
};

export const updateSchoolRequest = async (
    schoolId: string,
    payload: UpdateSchoolRequest
): Promise<UpdateSchoolResponse> => {
    // Remove empty strings and undefined values
    const sanitizedPayload: UpdateSchoolRequest = {};
    
    if (payload.address && payload.address.trim()) {
        sanitizedPayload.address = payload.address.trim();
    }
    if (payload.school_type) {
        sanitizedPayload.school_type = payload.school_type;
    }
    if (payload.school_category) {
        sanitizedPayload.school_category = payload.school_category;
    }
    if (payload.npsn && payload.npsn.trim()) {
        sanitizedPayload.npsn = payload.npsn.trim();
    }
    if (payload.accreditation) {
        sanitizedPayload.accreditation = payload.accreditation;
    }

    const { data } = await api.patch<UpdateSchoolResponse>(
        `/api/school/${schoolId}`,
        sanitizedPayload,
        {
            withCredentials: true,
        }
    );
    return data;
};
