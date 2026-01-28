import { useAuthValidation } from "@/hooks/useAuth";
import { useAuthStore } from "@/pages/(auth)/login/login.store";
import { Navigate, Outlet, useLocation } from "react-router";

const ProtectedRoute = () => {
  const location = useLocation();
  const token = useAuthStore((s) => s.token);
  console.log(useAuthStore.getState());

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  const { isError } = useAuthValidation(token);

  if (isError || !token) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
