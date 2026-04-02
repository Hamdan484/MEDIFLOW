import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function ProtectedRoutes({ allowedRoles }) {
  const { user, role } = useAuthStore();

  if (!user || !role) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    // Logged in, but trying to access the wrong portal
    if (role === "seller") return <Navigate to="/seller/dashboard" replace />;
    if (role === "admin") return <Navigate to="/admin/dashboard" replace />;
    return <Navigate to="/" replace />; // buyer default
  }

  return <Outlet />;
}
