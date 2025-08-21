// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // redirect to home if not authenticated
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
