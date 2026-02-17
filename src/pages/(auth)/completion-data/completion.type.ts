// School types
export type SchoolType = "negeri" | "swasta";
export type SchoolCategory = "sps" | "tk" | "kb";
export type Accreditation = "A" | "B" | "C";

// School Data
export type SchoolData = {
    id: string;
    school_name: string;
    address?: string;
    school_type?: SchoolType;
    school_category?: SchoolCategory;
    npsn?: string;
    accreditation?: Accreditation;
    createdAt: string;
    updatedAt: string;
};

// Get School Response
export type GetSchoolResponse = {
    success: boolean;
    data: SchoolData;
};

// Update School Request
export type UpdateSchoolRequest = {
    address?: string;
    school_type?: SchoolType;
    school_category?: SchoolCategory;
    npsn?: string;
    accreditation?: Accreditation;
};

// Update School Response
export type UpdateSchoolResponse = {
    success: boolean;
    message: string;
    data: SchoolData;
};
