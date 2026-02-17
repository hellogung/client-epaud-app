export type RegisterSchoolRequest = {
    nama_sekolah: string;
    nama_kepala_sekolah: string;
    email?: string;
    phone?: string;
    password: string;
}

export type RegisterSchoolResponse = {
    success?: boolean;
    message: string;
    data: {
        user_id: string;
        school_id: string;
    };
}
