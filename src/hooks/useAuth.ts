import { verifyToken } from "@/api/auth.api"
import { useQuery } from "@tanstack/react-query"
import { useLocation } from "react-router"

export const useAuthValidation = (token: string) => {
    const location = useLocation()
    return useQuery({
        queryKey: ["verify-token", location.pathname],
        queryFn: () => verifyToken(token),
        enabled: !!token,
    })
}