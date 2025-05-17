import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
export default function DashboardLayout() {
  const logout = useAuthStore((state) => state.logout);
  const role = useAuthStore((state) => state.role);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1
          className="text-xl font-bold cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          My Dashboard
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
        >
          Logout
        </button>
      </header>

      {/* Main content with sidebar */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <nav className="w-48 bg-gray-100 p-4 space-y-2">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `block px-3 py-2 rounded ${
                isActive ? "bg-blue-600 text-white" : "hover:bg-gray-200"
              }`
            }
          >
            Dashboard Home
          </NavLink>
          <NavLink
            to="/dashboard/assets"
            className={({ isActive }) =>
              `block px-3 py-2 rounded ${
                isActive ? "bg-blue-600 text-white" : "hover:bg-gray-200"
              }`
            }
          >
            Assets
          </NavLink>
          {/* Render Warranty link only for admin */}
          {role === "ADMIN" && (
            <NavLink
              to="/dashboard/warranty"
              className={({ isActive }) =>
                `block px-3 py-2 rounded ${
                  isActive ? "bg-blue-600 text-white" : "hover:bg-gray-200"
                }`
              }
            >
              Warranty
            </NavLink>
          )}
        </nav>

        {/* Page content */}
        <main className="flex-1 p-6 bg-white">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
