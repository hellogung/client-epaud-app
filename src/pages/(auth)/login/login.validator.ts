import z from "zod";

export const loginValidator = z.object({
    username: z.string().min(3, "Masukan username/email/handphone"),
    password: z.string().min(3, "Password wajib diisi")
})

export const logoutValidator = z.object({
    id: z.string().min(3, "ID wajib diisi"),
    token: z.string().min(3, "Token wajib diisi")
})

export type LoginValidatorType = z.infer<typeof loginValidator>
export type LogoutValidatorType = z.infer<typeof logoutValidator>