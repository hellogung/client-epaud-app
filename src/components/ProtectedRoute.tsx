import { useAuthStore } from "@/pages/(auth)/login/login.store";
import { Navigate, Outlet, useLocation } from "react-router";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  console.log(useAuthStore.getState());

  // ! PERBAIKI LAGI ALGORITMANYA
  if (!isAuthenticated) {
    return (
      <Navigate to={"/login"} replace state={{ from: location.pathname }} />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
