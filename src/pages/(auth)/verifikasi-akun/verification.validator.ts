import { z } from "zod";

export const sendVerificationValidator = z.object({
    user_id: z.string().min(1, "User ID wajib diisi"),
});

export const verifyAccountValidator = z.object({
    user_id: z.string().min(1, "User ID wajib diisi"),
    code: z
        .string()
        .length(6, "Kode verifikasi harus 6 digit")
        .regex(/^\d+$/, "Kode verifikasi hanya boleh berisi angka"),
});

export type SendVerificationValidatorType = z.infer<typeof sendVerificationValidator>;
export type VerifyAccountValidatorType = z.infer<typeof verifyAccountValidator>;
