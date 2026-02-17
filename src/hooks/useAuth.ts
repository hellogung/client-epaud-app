import { verifyToken, getProfile, refreshToken } from "@/api/auth.api";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "react-router";
import { useAuthStore } from "@/pages/(auth)/login/login.store";

// Validate token on protected routes
export const useAuthValidation = (token: string | null) => {
    const location = useLocation();
    
    return useQuery({
        queryKey: ["verify-token", location.pathname],
        queryFn: () => verifyToken(token!),
        enabled: !!token,
        retry: false,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

// Get user profile
export const useProfile = () => {
    const { token } = useAuthStore();
    
    return useQuery({
        queryKey: ["profile"],
        queryFn: () => getProfile(token!),
        enabled: !!token,
        staleTime: 10 * 60 * 1000, // 10 minutes
    });
};

// Refresh access token
export const useRefreshToken = () => {
    const setAuth = useAuthStore((state) => state.setAuth);
    const { user } = useAuthStore();

    return useMutation({
        mutationFn: () => refreshToken(),
        onSuccess: (response) => {
            if (user) {
                setAuth(response.access_token, user);
            }
        },
    });
};
