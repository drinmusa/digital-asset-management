import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

interface PublicRouteProps {
  children: React.ReactElement;
}

export default function PublicRoute({ children }: PublicRouteProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) {
    // If logged in, redirect away from login/register
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
