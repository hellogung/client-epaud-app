import { useEffect, useState } from "react";
import type { LogoutValidatorType } from "../login/login.validator";
import { useAuthStore } from "../login/login.store";
import { Navigate, useNavigate } from "react-router";
import { useLogout } from "./useLogout";

const LogoutPage = () => {
  const navigate = useNavigate();
  const { isPending, mutateAsync } = useLogout();
  const { token, user, logout } = useAuthStore();
  const [error, setError] = useState(false);

  useEffect(() => {
    const handleLogout = async () => {
      // Redirect jika tidak ada token/user
      if (!token || !user) {
        navigate("/login", { replace: true });
        return;
      }

      try {
        const values: LogoutValidatorType = {
          id: user.id, // Hapus optional chaining
          token,
        };

        await mutateAsync(values);

        // Clear state
        logout();

        // Redirect ke login
        navigate("/login", { replace: true });
      } catch (error) {
        console.error("Logout error:", error);
        setError(true);

        // Tetap clear state dan redirect setelah 2 detik
        logout();
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 2000);
      }
    };

    handleLogout();
  }, [token, user, mutateAsync, logout, navigate]);

  // Tampilkan error jika ada
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-lg text-red-500">Logout gagal...</p>
          <p className="text-sm text-gray-600 mt-2">Mengalihkan ke login...</p>
        </div>
      </div>
    );
  }

  // Tampilkan loading
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-lg">
          {isPending ? "Logging out..." : "Redirecting..."}
        </p>
      </div>
    </div>
  );
};

export default LogoutPage;
