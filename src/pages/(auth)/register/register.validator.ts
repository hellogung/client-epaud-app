import { z } from 'zod';

export const registerSchoolValidator = z.object({
    nama_sekolah: z.string().min(1, "Nama sekolah wajib diisi"),
    nama_kepala_sekolah: z.string().min(1, "Nama kepala sekolah wajib diisi"),
    email: z.string().email("Format email tidak valid").optional().or(z.literal('')),
    phone: z.string()
        .min(10, "Nomor telepon minimal 10 digit")
        .max(15, "Nomor telepon maksimal 15 digit")
        .regex(/^[0-9]+$/, "Nomor telepon hanya boleh berisi angka")
        .optional()
        .or(z.literal('')),
        password: z
        .string()
        .min(8, "Password minimal 12 karakter")
        .regex(/[a-z]/, "Password harus mengandung huruf kecil")
        .regex(/[A-Z]/, "Password harus mengandung huruf besar")
        .regex(/[0-9]/, "Password harus mengandung angka")
        .regex(/[^A-Za-z0-9]/, "Password harus mengandung simbol")
        .refine((val) => !/\s/.test(val), {
            message: "Password tidak boleh mengandung spasi",
        }),
}).refine(
    (data) => {
        const hasEmail = data.email && data.email.length > 0;
        const hasPhone = data.phone && data.phone.length > 0;
        return hasEmail || hasPhone;
    },
    { message: "Email atau nomor telepon wajib diisi", path: ["email"] }
);

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
