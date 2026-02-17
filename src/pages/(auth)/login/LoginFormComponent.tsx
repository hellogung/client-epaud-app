import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, Navigate } from "react-router";
import { useLogin } from "./useLogin";
import { useForm } from "react-hook-form";
import { loginValidator, type LoginValidatorType } from "./login.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { useState } from "react";
import { useAuthStore } from "./login.store";
import { useAuthValidation } from "@/hooks/useAuth";

const LoginFormComponent = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { isPending, mutateAsync } = useLogin();
  const token = useAuthStore((state) => state.token);

  const { isSuccess, isLoading } = useAuthValidation(token);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValidatorType>({
    resolver: zodResolver(loginValidator),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  // Show loading while checking auth (only if token exists)
  if (token && isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  // Redirect if already authenticated (must have token AND valid auth)
  if (token && isSuccess) {
    return <Navigate to="/panel" replace />;
  }

  const onSubmit = async (values: LoginValidatorType) => {
    await mutateAsync(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="identifier">Username / Email / No. HP</FieldLabel>
          <Input
            id="identifier"
            type="text"
            className="font-medium"
            placeholder="Masukkan username, email, atau no. HP"
            autoComplete="username"
            autoFocus
            aria-invalid={!!errors.identifier}
            aria-describedby={errors.identifier ? "identifier-error" : undefined}
            {...register("identifier")}
          />
          {errors.identifier && (
            <span id="identifier-error" className="text-red-500 text-sm" role="alert">
              {errors.identifier.message}
            </span>
          )}
        </Field>

        <Field>
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Link
              tabIndex={-1}
              to="/forgot-password"
              className="text-sm text-muted-foreground hover:text-primary hover:underline underline-offset-4 transition-colors"
            >
              Lupa Password?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              className="font-medium pr-10"
              placeholder="Masukkan password"
              autoComplete="current-password"
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <span id="password-error" className="text-red-500 text-sm" role="alert">
              {errors.password.message}
            </span>
          )}
        </Field>

        <Field>
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Masuk...
              </>
            ) : (
              "Masuk"
            )}
          </Button>
        </Field>

        <p className="text-center text-sm text-muted-foreground">
          Belum punya akun?{" "}
          <Link to="/register" className="text-primary hover:underline font-medium">
            Daftar Sekolah
          </Link>
        </p>
      </FieldGroup>
    </form>
  );
};

export default LoginFormComponent;
