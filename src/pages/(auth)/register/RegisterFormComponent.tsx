import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { CheckCircle2, Loader2, XCircle, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  passwordChecklistRules,
  registerSchoolValidator,
  type RegisterSchoolValidatorType,
} from "./register.validator";
import { useRegisterSchool } from "./useRegister";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";
import clsx from "clsx";

const RegisterFormComponent = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [verificationMethod, setVerificationMethod] = useState(false); // FALSE=EMAIL, TRUE=PHONE
  const { mutateAsync, isPending } = useRegisterSchool();

  const navigate = useNavigate();

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<RegisterSchoolValidatorType>({
    resolver: zodResolver(registerSchoolValidator),
    defaultValues: {
      nama_sekolah: "",
      nama_kepala_sekolah: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  const passwordValue = watch("password") ?? "";

  const onSubmit = async (values: RegisterSchoolValidatorType) => {
    try {
      const response = await mutateAsync(values);

      toast.success("Pendaftaran sekolah berhasil! Silakan verifikasi akun Anda.", {
        duration: 3000,
      });

      // Determine verification method and target from form values
      const verificationTarget = values.email || values.phone || "";
      const userId = response.data?.user_id;

      // Redirect untuk verifikasi nomor hp atau email
      if (userId) {
        navigate(
          `/verify-account?code=${userId}&method=${encodeURIComponent(verificationTarget)}`,
        );
      } else {
        // Fallback - redirect with just the target
        navigate(`/verify-account?method=${encodeURIComponent(verificationTarget)}`);
      }
    } catch (error) {
      // Handle API errors with proper typing
      if (error && typeof error === 'object' && 'response' in error) {
        const axiosError = error as { response?: { data?: { message?: string; errors?: Record<string, string[]> } } };
        const apiMessage = axiosError.response?.data?.message;
        const fieldErrors = axiosError.response?.data?.errors;

        // Set field-specific errors from API response
        if (fieldErrors) {
          Object.entries(fieldErrors).forEach(([field, messages]) => {
            if (field in registerSchoolValidator.shape || field === 'email' || field === 'phone') {
              setError(field as keyof RegisterSchoolValidatorType, {
                type: "server",
                message: messages[0],
              });
            }
          });
        }

        toast.error(apiMessage || "Pendaftaran gagal. Silakan coba lagi.", {
          duration: 4000,
        });
      } else {
        toast.error("Terjadi kesalahan. Silakan coba lagi.", {
          duration: 4000,
        });
      }
      console.error("Registration error:", error);
    }
  };

  // Clear the inactive field when switching verification methods
  useEffect(() => {
    if (verificationMethod) {
      // SMS/WA Mode aktif
      setValue("email", "");
      clearErrors("email");
    } else {
      // Email Mode aktif
      setValue("phone", "");
      clearErrors("phone");
    }
  }, [verificationMethod, setValue, clearErrors]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="nama_sekolah">Nama Sekolah</FieldLabel>
          <Input
            id="nama_sekolah"
            type="text"
            className="font-medium"
            {...register("nama_sekolah")}
            autoFocus
            autoComplete="organization"
            aria-invalid={!!errors.nama_sekolah}
            aria-describedby={errors.nama_sekolah ? "nama_sekolah-error" : undefined}
          />
          {errors.nama_sekolah && (
            <span id="nama_sekolah-error" className="text-red-500 text-sm" role="alert">
              {errors.nama_sekolah.message}
            </span>
          )}
        </Field>

        <Field>
          <FieldLabel htmlFor="nama_kepala_sekolah">Nama Kepala Sekolah</FieldLabel>
          <Input
            id="nama_kepala_sekolah"
            type="text"
            className="font-medium"
            {...register("nama_kepala_sekolah")}
            autoComplete="name"
            aria-invalid={!!errors.nama_kepala_sekolah}
            aria-describedby={errors.nama_kepala_sekolah ? "nama_kepala_sekolah-error" : undefined}
          />
          {errors.nama_kepala_sekolah && (
            <span id="nama_kepala_sekolah-error" className="text-red-500 text-sm" role="alert">
              {errors.nama_kepala_sekolah.message}
            </span>
          )}
        </Field>

        <Field>
          <div className="flex justify-between items-center">
            <FieldLabel htmlFor={verificationMethod ? "phone" : "email"}>
              {verificationMethod ? "Nomor Telepon" : "Alamat Email"}
            </FieldLabel>

            <div className="flex items-center space-x-2">
              <Label className="bg-transparent p-0 text-sm cursor-pointer">Email</Label>
              <Switch
                checked={verificationMethod}
                onCheckedChange={setVerificationMethod}
                aria-label="Pilih metode verifikasi"
              />
              <Label className="bg-transparent p-0 text-sm cursor-pointer">SMS/WA</Label>
            </div>
          </div>

          {verificationMethod ? (
            <InputGroup>
              <InputGroupAddon>
                <InputGroupText>+62</InputGroupText>
              </InputGroupAddon>
              <InputGroupInput
                id="phone"
                type="tel"
                inputMode="numeric"
                {...register("phone")}
                placeholder="81xxxxxxxxx"
                autoComplete="tel-national"
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? "phone-error" : undefined}
              />
            </InputGroup>
          ) : (
            <Input
              id="email"
              type="email"
              className="font-medium"
              {...register("email")}
              placeholder="contoh@email.com"
              autoComplete="email"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
          )}

          {errors.email && (
            <span id="email-error" className="text-red-500 text-sm" role="alert">
              {errors.email.message}
            </span>
          )}

          {errors.phone && (
            <span id="phone-error" className="text-red-500 text-sm" role="alert">
              {errors.phone.message}
            </span>
          )}
        </Field>

        <Field>
          <div className="flex justify-between items-center">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-sm flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
            >
              {showPassword ? (
                <>
                  <EyeOff className="w-4 h-4" />
                  <span>Sembunyikan</span>
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4" />
                  <span>Lihat</span>
                </>
              )}
            </button>
          </div>
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            className="font-medium"
            {...register("password")}
            autoComplete="new-password"
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? "password-error" : "password-requirements"}
          />

          {errors.password && (
            <span id="password-error" className="text-red-500 text-sm" role="alert">
              {errors.password.message}
            </span>
          )}
        </Field>

        {/* Password strength indicator */}
        <PasswordChecklist password={passwordValue} />

        <Field>
          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Mendaftar...
              </>
            ) : (
              "Daftar"
            )}
          </Button>

          {Object.keys(errors).length > 0 && (
            <span className="text-red-500 text-sm text-center block mt-2" role="alert">
              Mohon periksa kembali data yang dimasukkan
            </span>
          )}
        </Field>

        <p className="text-center text-sm text-muted-foreground">
          Sudah punya akun?{" "}
          <Link to="/login" className="text-primary hover:underline font-medium">
            Login Sekarang
          </Link>
        </p>
      </FieldGroup>
    </form>
  );
};

const PasswordChecklist = ({ password }: { password: string }) => {
  return (
    <ul id="password-requirements" className="space-y-1 text-sm" aria-label="Persyaratan password">
      {Object.values(passwordChecklistRules).map((rule) => {
        const valid = rule.test(password);

        return (
          <li
            key={rule.label}
            className={clsx(
              "flex items-center gap-2 transition-colors",
              valid ? "text-green-600" : "text-muted-foreground",
            )}
          >
            {valid ? (
              <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
            ) : (
              <XCircle className="w-4 h-4" aria-hidden="true" />
            )}
            <span>{rule.label}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default RegisterFormComponent;
