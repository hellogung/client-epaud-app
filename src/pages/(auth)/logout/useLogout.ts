import { useMutation } from "@tanstack/react-query"
import { useAuthStore } from "../login/login.store"
import { logoutRequest } from "../login/login.api"
import { toast } from "sonner"

export const useLogout = () => {
    // const navigate = useNavigate()
    const logout = useAuthStore(state => state.logout)

    return useMutation({
        mutationFn: (payload: { id: string, token: string }) => logoutRequest(payload),
        onSuccess: async () => {
            logout()

            toast.success("Logout berhasil", {
                duration: 2000,
            });
        }
    })
}