import z from "zod";

export const loginValidator = z.object({
    username: z.string().min(3, "Masukan username/email/handphone"),
    password: z.string().min(3, "Password wajib diisi")
})

export type LoginValidatorType = z.infer<typeof loginValidator>