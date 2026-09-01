import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { ROLES } from "../lib/mockAuth.js";

/**
 * Guards all Technician Portal routes.
 * If the technician has NOT completed their profile registration,
 * they are redirected to the registration wizard.
 * Once completed, all portal routes are accessible normally.
 */
export default function RequireTechnicianRegistration({ children }) {
  const { user } = useAuth();

  if (user && user.role === ROLES.TECHNICIAN && !user.technicianProfileCompleted) {
    return <Navigate to="/portal/technician/registration" replace />;
  }

  return children;
}
