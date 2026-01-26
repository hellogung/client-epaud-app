import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { registerSchoolValidator, type RegisterSchoolValidatorType } from "./register.validator"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRegisterSchool } from "./useRegister"
import { toast } from "sonner"
import { useNavigate } from "react-router"
import { Loader2 } from "lucide-react"

const RegisterFormComponent = () => {

    const { mutateAsync, isPending } = useRegisterSchool()

    let navigate = useNavigate()


    const { register, handleSubmit, formState: { errors } } = useForm<RegisterSchoolValidatorType>({
        resolver: zodResolver(registerSchoolValidator)
    })

    const onSubmit = async (values: RegisterSchoolValidatorType) => {
        try {
            await mutateAsync(values)
            toast.success("Register sekolah berhasil, anda akan diarahkan ke halaman login!", {
                duration: 3000,

            })
            // wait 2 seconds
            await new Promise(resolve => setTimeout(resolve, 3000))

            navigate("/login", { replace: true })
        } catch (error) {
            toast.error("Register sekolah gagal, silahkan coba lagi!", {
                duration: 3000,
            })
            console.error(error)
        }
    }
    return (
        <>
            <form className="flex min-w-md flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <Input type="text" className="font-medium" placeholder="Masukkan Nama Kepala Sekolah" {...register("full_name")} />
                    {errors.full_name && <span className="text-red-500 text-sm">{errors.full_name.message}</span>}
                </div>

                <div>
                    <Input type="text" className="font-medium" placeholder="Masukkan Nama Sekolah" />
                </div>

                <div>
                    <Input type="text" className="font-medium" placeholder="Masukkan Username" {...register("username")} />
                    {errors.username && <span className="text-red-500 text-sm">{errors.username.message}</span>}
                </div>
                <div>
                    <Input type="password" className="font-medium" placeholder="Masukkan Password" {...register("password")} />
                    {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                </div>

                {Object.keys(errors).length > 0 && <span className="text-red-500 text-sm">Mohon isi semua field yang dibutuhkan dengan benar!</span>}

                <Button type="submit" disabled={isPending}>
                    {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : "Register"}
                </Button>
            </form>
        </>
    )
}

export default RegisterFormComponent