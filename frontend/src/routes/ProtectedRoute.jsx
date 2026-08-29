import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function ProtectedRoute({ allowedRoles, children }) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Signed in, but with a role that doesn't belong on this portal —
    // send them back to their own portal instead of a dead end.
    return <Navigate to={`/portal/${user.role}`} replace />;
  }

  return children;
}
