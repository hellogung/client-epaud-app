import { z } from "zod";

export const loginValidator = z.object({
    identifier: z
        .string()
        .min(1, "Username, email, atau nomor telepon wajib diisi"),
    password: z
        .string()
        .min(1, "Password wajib diisi"),
});

export type LoginValidatorType = z.infer<typeof loginValidator>;
