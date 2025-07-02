import { useRoutes } from "react-router-dom";
import { lazy } from "react";
import ProtectRoute from "@/shared/components/router/ProtectRoute";
import GuestRoute from "@/shared/components/router/GuestRoute";
import { Role } from "@/shared/const";
import { useSelector } from "react-redux";
import type { RootState } from "./store";
// import MainLayout from "@/layout/MainLayout";

const MainLayout = lazy(() => import("@/layout/MainLayout"));
const Partner = lazy(() => import("@/features/parter/pages/Partner"));
const Login = lazy(() => import("@/features/auth/pages/Login"));

const AppRouter = () => {
  const isAuth = !!useSelector((state:RootState) => state.auth.token);
  return useRoutes([
    {
      path: "/",
      element: (
        <ProtectRoute isAuth={isAuth}>
          <MainLayout />
        </ProtectRoute>
      ),
      children: [
        {
          path: "",
          element: <Partner role={Role.customer} />,
        },
        {
          path: "seller",
          element: <Partner role={Role.seller} />,
        },
      ],
    },
    {
      path: "/login",
      element: (
        <GuestRoute isAuth={isAuth}>
          <Login />
        </GuestRoute>
      ),
    },
  ]);
};
export default AppRouter;
