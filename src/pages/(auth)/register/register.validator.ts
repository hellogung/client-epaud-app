import { z } from 'zod';

export const registerSchoolValidator = z.object({
    full_name: z.string().min(3, 'Nama lengkap minimal 3 karakter'),
    username: z.string().min(4, 'Username minimal 4 karakter'),
    password: z.string().min(6, 'Password minimal 6 karakter'),
});

export type RegisterSchoolValidatorType = z.infer<typeof registerSchoolValidator>;
