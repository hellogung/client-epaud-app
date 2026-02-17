import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { Loader2 } from "lucide-react";
import { useAuthStore } from "../login/login.store";
import { useLogout } from "./useLogout";

const LogoutPage = () => {
  const navigate = useNavigate();
  const { mutate: logout, isPending } = useLogout();
  const token = useAuthStore((state) => state.token);
  
  // Use ref to ensure logout is only called once
  const hasLoggedOut = useRef(false);

  useEffect(() => {
    // If no token, redirect immediately
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }

    // Perform logout only once
    if (!hasLoggedOut.current) {
      hasLoggedOut.current = true;
      logout();
    }
  }, [token, navigate, logout]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
        <p className="text-lg text-muted-foreground">
          {isPending ? "Logging out..." : "Redirecting..."}
        </p>
      </div>
    </div>
  );
};

export default LogoutPage;
