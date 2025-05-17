import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
export default function AppLayout() {
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
        <div>
          <Link to="/" className="font-bold text-lg">
            MyApp
          </Link>
        </div>
        <div className="space-x-4">
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="hover:underline">
                Login
              </Link>
              <Link to="/register" className="hover:underline">
                Register
              </Link>
            </>
          ) : (
            <>
              <Link to="/assets" className="hover:underline">
                Assets
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>

      <main className="flex-grow container mx-auto px-4 py-6">
        <Outlet />
      </main>

      <footer className="bg-gray-100 text-center py-4 mt-auto text-sm text-gray-600">
        © {new Date().getFullYear()} MyApp
      </footer>
    </div>
  );
}
