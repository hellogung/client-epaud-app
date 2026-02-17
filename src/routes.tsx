import { createBrowserRouter } from "react-router";

import App from "./App";
import DashboardPage from "./pages/(panel)/dashboard/DashboardPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterSchool from "./pages/(auth)/register/RegisterSchoolPage";
import LoginSchool from "./pages/(auth)/login/LoginSchoolPage";
import LogoutPage from "./pages/(auth)/logout/LogoutPage";

import DemoPanelPage from "./layouts/PanelLayout";
import PanelLayout from "./layouts/PanelLayout";
import SekolahPage from "./pages/(panel)/(master-data)/sekolah/SekolahPage";
import ForgotPasswordPage from "./pages/(auth)/forgot-password/ForgotPasswordPage";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./NotFound";
import VerificationAccountPage from "./pages/(auth)/verifikasi-akun/VerificationAccountPage";
import LandingPage from "./pages/landing/LandingPage";
import CompletionDataPage from "./pages/(auth)/completion-data/CompletionDataPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/old",
    element: <App />,
  },
  {
    path: "/register",
    element: <RegisterSchool />,
  },
  {
    path: "/login",
    element: <LoginSchool />,
  },
  {
    path: "/verify-account",
    element: <VerificationAccountPage />,
  },
  {
    path: "/completion-school-data",
    element: <CompletionDataPage />,
  },
  {
    path: "forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/demo",
    element: <DemoPanelPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/panel",
        element: <PanelLayout />,
        children: [
          { index: true, Component: DashboardPage },
          // {
          //   path: "profile/:id",
          //   loader: async ({ params }) => {
          //     let id = params.id;
          //     return { id };
          //   },
          //   Component: ProfilePage,
          // },
          {
            path: "/panel/data/sekolah",
            element: <SekolahPage />,
            children: [{ index: true, Component: SekolahPage }],
          },
          {
            path: "profile",
            Component: ProfilePage,
          },
        ],
      },
    ],
  },
  {
    path: "/logout",
    element: <LogoutPage />,
  },
  // 404 Not Found
  {
    path: "*",
    element: <NotFound />
  }
]);
