import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
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
import { Checkbox } from "@/components/ui/checkbox";
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
  const [isChecked, setIsChecked] = useState(false);
  const [verificationMethod, setVerificationMethod] = useState(false); // FALSE=EMAIL, TRUE=PHONE
  const { mutateAsync, isPending } = useRegisterSchool();

  let navigate = useNavigate();

  const {
    register,
    watch,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<RegisterSchoolValidatorType>({
    resolver: zodResolver(registerSchoolValidator),
  });

  const passwordValue = watch("password") ?? "";

  const onSubmit = async (values: RegisterSchoolValidatorType) => {
    try {
      // await mutateAsync(values);

      // Temporary Response
      const response = {
        userId: "123",
        verificationMethod: values.email || values.sms,
      };

      console.log(values);
      toast.success("Horee, Pendaftaran sekolah anda berhasil", {
        duration: 3000,
      });

      // wait 3 seconds
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Redirect untuk verifikasi nomor hp atau email
      navigate(
        `/verify-account?code=${response.userId}&method=${response.verificationMethod}`,
      );
    } catch (error) {
      toast.error("Register sekolah gagal, silahkan coba lagi!", {
        duration: 3000,
      });
      console.error(error);
    }
  };

  useEffect(() => {
    if (verificationMethod) {
      resetField("email"); // SMS Mode = Aktif
      
    } else {
      resetField("sms"); // Email Mode = Aktif
    }
  }, [verificationMethod, resetField]);
  return (
    <>
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="nama_sekolah">Nama Sekolah</FieldLabel>
            <Input
              id="nama_sekolah"
              type="text"
              className="font-medium"
              {...register("nama_sekolah")}
              autoFocus
            />
            {errors.nama_sekolah && (
              <span className="text-red-500 text-sm">
                {errors.nama_sekolah.message}
              </span>
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="nama_kepala_sekolah">
              Nama Kepala Sekolah
            </FieldLabel>
            <Input
              id="nama_kepala_sekolah"
              type="text"
              className="font-medium"
              {...register("nama_kepala_sekolah")}
            />
            {errors.nama_kepala_sekolah && (
              <span className="text-red-500 text-sm">
                {errors.nama_kepala_sekolah.message}
              </span>
            )}
          </Field>
          <Field>
            <div className="flex justify-between items-center">
              <FieldLabel htmlFor="nama_kepala_sekolah">
                {verificationMethod ? "Nomor Telepon" : "Alamat Email"}
              </FieldLabel>

              <div className="flex items-center space-x-2">
                <Label className="bg-transparent p-0">Email</Label>
                <Switch
                  checked={verificationMethod}
                  onCheckedChange={setVerificationMethod}
                />
                <Label className="bg-transparent p-0">SMS/WA</Label>
              </div>
            </div>

            {verificationMethod ? (
              <InputGroup>
                <InputGroupAddon>
                  <InputGroupText>+62</InputGroupText>
                </InputGroupAddon>
                <InputGroupInput
                  id="sms"
                  type="text"
                  {...register("sms")}
                  placeholder="81xxxxxxxxx"
                />
              </InputGroup>
            ) : (
              <Input
                id="email"
                type="email"
                className="font-medium"
                {...register("email")}
              />
            )}

            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}

            {errors.sms && (
              <span className="text-red-500 text-sm">{errors.sms.message}</span>
            )}
          </Field>
          <Field>
            <div className="flex justify-between">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <div>
                <Field orientation="horizontal">
                  <Checkbox
                    checked={isChecked}
                    onCheckedChange={() => setIsChecked(!isChecked)}
                    id="toggle-password"
                    name="toggle-password"
                  />
                  <FieldLabel htmlFor="toggle-password">
                    Lihat Password
                  </FieldLabel>
                </Field>
              </div>
            </div>
            <Input
              id="password"
              type={isChecked ? "text" : "password"}
              className="font-medium"
              {...register("password")}
              autoComplete="true"
            />

            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </Field>

          {/* TODO: BUAT CHECKLIST PASSWORD REQ*/}
          <PasswordChecklist password={passwordValue} />

          <Field>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Daftar"
              )}
            </Button>

            {Object.keys(errors).length > 0 && (
              <span className="text-red-500 text-sm text-center">
                Mohon isi semua field yang dibutuhkan dengan benar!
              </span>
            )}
          </Field>

          <p className="text-center">
            Sudah punya akun ?{" "}
            <Link to={"/login"} className="hover:underline">
              Login Sekarang
            </Link>
          </p>
        </FieldGroup>
      </form>
    </>
  );
};

const PasswordChecklist = ({ password }: { password: string }) => {
  return (
    <>
      <ul className="mt-2 space-y-1 text-sm">
        {Object.values(passwordChecklistRules).map((rule) => {
          const valid = rule.test(password);

          return (
            <li
              key={rule.label}
              className={clsx(
                "flex items-center gap-2",
                valid ? "text-green-600" : "text-gray-400",
              )}
            >
              {valid ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                <XCircle className="w-4 h-4" />
              )}
              {rule.label}
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default RegisterFormComponent;
