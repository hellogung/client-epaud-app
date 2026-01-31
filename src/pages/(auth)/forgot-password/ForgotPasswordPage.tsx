import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";

const ForgotPasswordPage = () => {
  return (
    <>
      <form
        className="flex min-w-md flex-col"
        // onSubmit={handleSubmit(onSubmit)}
      >
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="username">Username</FieldLabel>
            <Input
              id="username"
              type="text"
              className="font-medium"
              placeholder="Username/Email/Handphone"
              //   {...register("username")}
            />
            {/* {errors.username && (
              <span className="text-red-500 text-sm">
                {errors.username.message}
              </span>
            )} */}
          </Field>

          <Field>
            <Button
              type="submit"
              // disabled={isPending}>
              //   {isPending ? (
              //     <Loader2 className="w-4 h-4 animate-spin" />
              //   ) : (
              //     "Login"
              //   )}
            >
              Lupa Password
            </Button>

            {/* {Object.keys(errors).length > 0 && (
              <span className="text-red-500 text-sm text-center">
                Mohon isi semua field yang dibutuhkan dengan benar!
              </span>
            )} */}
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

export default ForgotPasswordPage;
