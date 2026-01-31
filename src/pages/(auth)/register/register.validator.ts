import { z } from 'zod';

export const registerSchoolValidator = z.object({
    nama_sekolah: z.string().min(3, 'Nama Sekolah wajib diisi'),
    nama_kepala_sekolah: z.string().min(3, 'Nama Kepala Sekolah wajib diisi'),
    email: z.email("Format email tidak valid").optional(),
    sms: z.string().min(10, "Nomor Telepon minimal 9 karakter").optional(),
    password: z
        .string()
        .min(8, "Password minimal 12 karakter")
        .regex(/[a-z]/, "Password harus mengandung huruf kecil")
        .regex(/[A-Z]/, "Password harus mengandung huruf besar")
        .regex(/[0-9]/, "Password harus mengandung angka")
        .regex(/[^A-Za-z0-9]/, "Password harus mengandung simbol")
        .refine((val) => !/\s/.test(val), {
            message: "Password tidak boleh mengandung spasi",
        })
});

export type RegisterSchoolValidatorType = z.infer<typeof registerSchoolValidator>;

export const passwordChecklistRules = {
    minLength: {
        label: "Minimal 12 karakter",
        test: (val: string) => val.length >= 12,
    },
    lowercase: {
        label: "Mengandung huruf kecil (a-z)",
        test: (val: string) => /[a-z]/.test(val),
    },
    uppercase: {
        label: "Mengandung huruf besar (A-Z)",
        test: (val: string) => /[A-Z]/.test(val),
    },
    number: {
        label: "Mengandung angka (0-9)",
        test: (val: string) => /[0-9]/.test(val),
    },
    symbol: {
        label: "Mengandung simbol (!@#$)",
        test: (val: string) => /[^A-Za-z0-9]/.test(val),
    },
};

