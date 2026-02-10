import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const ADMIN_EMAIL = "admin@hoops.com";

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const { token } = useAuth();

  // Get email saved during login
  const email = localStorage.getItem("email");

  if (!token || email !== ADMIN_EMAIL) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;
