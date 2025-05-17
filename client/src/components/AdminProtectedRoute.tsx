import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

interface Props {
  children: React.ReactNode;
}

export default function AdminProtectedRoute({ children }: Props) {
  const { isAuthenticated, role, checkAuth, isAuthChecked } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]); // Dependency on checkAuth to prevent unnecessary re-renders

  useEffect(() => {
    if (isAuthChecked) {
      // Only check when auth check is complete
      if (!isAuthenticated) {
        navigate("/login");
      } else if (role !== "ADMIN") {
        navigate("/dashboard");
      }
    }
  }, [isAuthenticated, isAuthChecked, role, navigate]);

  if (!isAuthChecked) {
    return <div>Loading...</div>; // or spinner
  }

  return isAuthenticated && role === "ADMIN" ? <>{children}</> : null;
}
