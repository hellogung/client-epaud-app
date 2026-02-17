import { z } from "zod";

export const updateSchoolValidator = z.object({
    address: z
        .string()
        .min(5, "Alamat minimal 5 karakter")
        .max(255, "Alamat maksimal 255 karakter")
        .optional()
        .or(z.literal("")),
    school_type: z
        .enum(["negeri", "swasta"], {
            errorMap: () => ({ message: "Pilih jenis sekolah" }),
        })
        .optional(),
    school_category: z
        .enum(["sps", "tk", "kb"], {
            errorMap: () => ({ message: "Pilih kategori sekolah" }),
        })
        .optional(),
    npsn: z
        .string()
        .length(8, "NPSN harus 8 digit")
        .regex(/^\d+$/, "NPSN hanya boleh berisi angka")
        .optional()
        .or(z.literal("")),
    accreditation: z
        .enum(["A", "B", "C"], {
            errorMap: () => ({ message: "Pilih akreditasi" }),
        })
        .optional(),
});

export type UpdateSchoolValidatorType = z.infer<typeof updateSchoolValidator>;
