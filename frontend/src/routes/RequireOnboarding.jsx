import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function RequireOnboarding({ children }) {
  const { user } = useAuth();

  if (user && !user.onboardingComplete) {
    return <Navigate to="/portal/user/onboarding" replace />;
  }

  return children;
}
