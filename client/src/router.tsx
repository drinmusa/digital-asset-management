import { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import DashboardLayout from "./components/DashboardLayout";
import DashboardHome from "./pages/dashboard/home";
import AssetsPage from "./pages/dashboard/assets";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import NewAssetPage from "./pages/dashboard/new-asset";
import AssetDetailsPage from "./pages/dashboard/asset-details";
// import AdminProtectedRoute from "./components/AdminProtectedRoute";
import WarrantyPage from "./pages/dashboard/warranty";
export default function AppRouter() {
  const checkAuth = useAuthStore((state) => state.checkAuth);
  // const isAuthChecked = useAuthStore((state) => state.isAuthenticated !== null); // optional
  // const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  useEffect(() => {
    checkAuth(); // call this only once at startup
  }, [checkAuth]);

  const router = createBrowserRouter([
    {
      path: "/dashboard",
      element: (
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <DashboardHome /> },
        { path: "assets", element: <AssetsPage /> },
        { path: "assets/new", element: <NewAssetPage /> }, // ✅ Correctly routes to NewAssetPage
        { path: "assets/:id", element: <AssetDetailsPage /> }, // ✅ Correctly routes to NewAssetPage
        {
          path: "warranty",
          element: <WarrantyPage />,
        },
      ],
    },
    {
      path: "/login",
      element: (
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      ),
    },
    {
      path: "/register",
      element: (
        <PublicRoute>
          <RegisterPage />
        </PublicRoute>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}
