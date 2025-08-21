
import { Navigate } from "react-router-dom";
import { fakeAuth } from "../auth";

function ProtectedRoute({ children }) {
  if (!fakeAuth.isAuthenticated) {
    // redirect to home if not authenticated
    return <Navigate to="/" replace />;
  }
  return children;
}

export default ProtectedRoute;
