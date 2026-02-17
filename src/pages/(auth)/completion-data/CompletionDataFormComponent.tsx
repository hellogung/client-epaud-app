import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useGetSchool, useUpdateSchool } from "./useCompletion";
import { 
  updateSchoolValidator, 
  type UpdateSchoolValidatorType 
} from "./completion.validator";

const CompletionDataFormComponent = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const schoolId = searchParams.get("school_id");

  // Fetch existing school data
  const { 
    data: schoolData, 
    isLoading: isLoadingSchool, 
    isError: isSchoolError 
  } = useGetSchool(schoolId);

  // Update mutation
  const { mutateAsync: updateSchool, isPending } = useUpdateSchool(schoolId || "");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UpdateSchoolValidatorType>({
    resolver: zodResolver(updateSchoolValidator),
    defaultValues: {
      address: "",
      school_type: undefined,
      school_category: undefined,
      npsn: "",
      accreditation: undefined,
    },
  });

  // Populate form with existing data
  useEffect(() => {
    if (schoolData?.data) {
      const school = schoolData.data;
      if (school.address) setValue("address", school.address);
      if (school.school_type) setValue("school_type", school.school_type);
      if (school.school_category) setValue("school_category", school.school_category);
      if (school.npsn) setValue("npsn", school.npsn);
      if (school.accreditation) setValue("accreditation", school.accreditation);
    }
  }, [schoolData, setValue]);

  // Redirect if no school_id
  useEffect(() => {
    if (!schoolId) {
      toast.error("ID Sekolah tidak ditemukan");
      navigate("/login", { replace: true });
    }
  }, [schoolId, navigate]);

  // Handle school fetch error
  useEffect(() => {
    if (isSchoolError) {
      toast.error("Gagal memuat data sekolah");
    }
  }, [isSchoolError]);

  const onSubmit = async (values: UpdateSchoolValidatorType) => {
    try {
      await updateSchool(values);

      toast.success("Data sekolah berhasil diperbarui!", {
        duration: 3000,
      });

      // Redirect to dashboard after completion
      setTimeout(() => {
        navigate("/panel", { replace: true });
      }, 1500);
    } catch (error) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      const message = axiosError.response?.data?.message || "Gagal memperbarui data";

      toast.error(message, {
        duration: 3000,
      });
    }
  };

  if (isLoadingSchool) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FieldGroup>
        {/* School Name (Read-only) */}
        {schoolData?.data?.school_name && (
          <Field>
            <FieldLabel>Nama Sekolah</FieldLabel>
            <Input
              type="text"
              value={schoolData.data.school_name}
              disabled
              className="font-medium bg-muted"
            />
          </Field>
        )}

        {/* Address */}
        <Field>
          <FieldLabel htmlFor="address">Alamat Sekolah</FieldLabel>
          <Input
            id="address"
            type="text"
            className="font-medium"
            placeholder="Jl. Merdeka No. 1, Jakarta"
            autoComplete="street-address"
            aria-invalid={!!errors.address}
            aria-describedby={errors.address ? "address-error" : undefined}
            {...register("address")}
          />
          {errors.address && (
            <span id="address-error" className="text-red-500 text-sm" role="alert">
              {errors.address.message}
            </span>
          )}
        </Field>

        {/* School Type */}
        <Field>
          <FieldLabel htmlFor="school_type">Jenis Sekolah</FieldLabel>
          <Select
            value={watch("school_type")}
            onValueChange={(value) => 
              setValue("school_type", value as "negeri" | "swasta")
            }
          >
            <SelectTrigger 
              id="school_type"
              aria-invalid={!!errors.school_type}
            >
              <SelectValue placeholder="Pilih jenis sekolah" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="negeri">Negeri</SelectItem>
              <SelectItem value="swasta">Swasta</SelectItem>
            </SelectContent>
          </Select>
          {errors.school_type && (
            <span className="text-red-500 text-sm" role="alert">
              {errors.school_type.message}
            </span>
          )}
        </Field>

        {/* School Category */}
        <Field>
          <FieldLabel htmlFor="school_category">Kategori Sekolah</FieldLabel>
          <Select
            value={watch("school_category")}
            onValueChange={(value) => 
              setValue("school_category", value as "sps" | "tk" | "kb")
            }
          >
            <SelectTrigger 
              id="school_category"
              aria-invalid={!!errors.school_category}
            >
              <SelectValue placeholder="Pilih kategori sekolah" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tk">TK (Taman Kanak-Kanak)</SelectItem>
              <SelectItem value="kb">KB (Kelompok Bermain)</SelectItem>
              <SelectItem value="sps">SPS (Satuan PAUD Sejenis)</SelectItem>
            </SelectContent>
          </Select>
          {errors.school_category && (
            <span className="text-red-500 text-sm" role="alert">
              {errors.school_category.message}
            </span>
          )}
        </Field>

        {/* NPSN */}
        <Field>
          <FieldLabel htmlFor="npsn">NPSN</FieldLabel>
          <Input
            id="npsn"
            type="text"
            inputMode="numeric"
            maxLength={8}
            className="font-medium"
            placeholder="12345678"
            aria-invalid={!!errors.npsn}
            aria-describedby={errors.npsn ? "npsn-error" : undefined}
            {...register("npsn")}
          />
          <span className="text-xs text-muted-foreground">
            Nomor Pokok Sekolah Nasional (8 digit)
          </span>
          {errors.npsn && (
            <span id="npsn-error" className="text-red-500 text-sm" role="alert">
              {errors.npsn.message}
            </span>
          )}
        </Field>

        {/* Accreditation */}
        <Field>
          <FieldLabel htmlFor="accreditation">Akreditasi</FieldLabel>
          <Select
            value={watch("accreditation")}
            onValueChange={(value) => 
              setValue("accreditation", value as "A" | "B" | "C")
            }
          >
            <SelectTrigger 
              id="accreditation"
              aria-invalid={!!errors.accreditation}
            >
              <SelectValue placeholder="Pilih akreditasi" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="A">A (Sangat Baik)</SelectItem>
              <SelectItem value="B">B (Baik)</SelectItem>
              <SelectItem value="C">C (Cukup)</SelectItem>
            </SelectContent>
          </Select>
          {errors.accreditation && (
            <span className="text-red-500 text-sm" role="alert">
              {errors.accreditation.message}
            </span>
          )}
        </Field>

        {/* Submit Button */}
        <Field>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Menyimpan...
              </>
            ) : (
              "Simpan Data"
            )}
          </Button>
        </Field>

        {/* Skip for now link */}
        <p className="text-center text-sm text-muted-foreground">
          <button
            type="button"
            onClick={() => navigate("/panel")}
            className="text-primary hover:underline"
          >
            Lewati untuk saat ini
          </button>
        </p>
      </FieldGroup>
    </form>
  );
};

export default CompletionDataFormComponent;
