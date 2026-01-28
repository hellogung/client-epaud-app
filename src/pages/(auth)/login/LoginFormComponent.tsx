import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, Navigate } from "react-router";
import { useLogin } from "./useLogin";
import { useForm } from "react-hook-form";
import { loginValidator, type LoginValidatorType } from "./login.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useAuthStore } from "./login.store";
import { useAuthValidation } from "@/hooks/useAuth";

const LoginFormComponent = () => {
  const { isPending, mutateAsync } = useLogin();
  const [isChecked, setIsChecked] = useState(false);
  const { token } = useAuthStore();

  const ProtectedLoginRegister = async () => {
    if (!token) {
      toast.error("Token tidak ditemukan");
      return;
    }

    const { isSuccess, isLoading } = useAuthValidation(token);

    if (isLoading) {
      return <Loader2 className="w-4 h-4 animate-spin" />;
    }

    // ! FIX BUG KETIKA SUDAH AUTH, HARUSNYA AKSES /LOGIN TIDAK DIPERBOLEHKAN
    if (isSuccess) {
      return <Navigate to={"/panel"} replace />;
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValidatorType>({
    resolver: zodResolver(loginValidator),
  });

  const onSubmit = async (values: LoginValidatorType) => {
    try {
      await mutateAsync(values);
    } catch (error) {
      toast.error(
        "Login gagal, silahkan masukkan username dan password dengan benar",
        {
          duration: 1000,
        },
      );

      console.error(error);
    }
  };

  ProtectedLoginRegister();
  return (
    <>
      <form
        className="flex min-w-md flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="username">Username</FieldLabel>
            <Input
              id="username"
              type="text"
              className="font-medium"
              placeholder="Username/Email/Handphone"
              {...register("username")}
            />
            {errors.username && (
              <span className="text-red-500 text-sm">
                {errors.username.message}
              </span>
            )}
          </Field>
          <Field>
            <div className="flex items-center">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Link
                tabIndex={-1}
                to="/forgot-password"
                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </Link>
            </div>
            <Input
              id="password"
              type={isChecked ? "text" : "password"}
              className="font-medium"
              placeholder="Password"
              {...register("password")}
            />

            {errors.password && (
              <span className="text-red-500 text-sm">
                {errors.password.message}
              </span>
            )}
          </Field>
          <Field orientation="horizontal">
            <Checkbox
              checked={isChecked}
              onCheckedChange={() => setIsChecked(!isChecked)}
              id="toggle-password"
              name="toggle-password"
            />
            <FieldLabel htmlFor="toggle-password">Lihat Password</FieldLabel>
          </Field>
          <Field>
            <Button type="submit" disabled={isPending}>
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Login"
              )}
            </Button>

            {Object.keys(errors).length > 0 && (
              <span className="text-red-500 text-sm text-center">
                Mohon isi semua field yang dibutuhkan dengan benar!
              </span>
            )}
          </Field>

          <p className="text-center">
            Belum punya akun ?{" "}
            <Link to={"/register"} className="hover:underline">
              Daftar Sekolah
            </Link>
          </p>
        </FieldGroup>
      </form>
    </>
  );
};

export default LoginFormComponent;
