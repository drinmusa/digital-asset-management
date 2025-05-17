import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

interface Props {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: Props) {
  const { isAuthenticated, checkAuth, isAuthChecked } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (isAuthChecked && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, isAuthChecked, navigate]);

  if (!isAuthChecked) {
    return <div>Loading...</div>; // or spinner
  }

  return isAuthenticated ? <>{children}</> : null;
}
