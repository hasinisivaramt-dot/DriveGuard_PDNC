import { useState, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import RequireOnboarding from "./routes/RequireOnboarding.jsx";
import { ROLES } from "./lib/mockAuth.js";

import LoadingPage from "./pages/LoadingPage.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/auth/LoginPage.jsx";
import RegisterPage from "./pages/auth/RegisterPage.jsx";

import VehicleRegistrationWizard from "./pages/onboarding/VehicleRegistrationWizard.jsx";

import UserPortalLayout from "./layouts/UserPortalLayout.jsx";
import UserDashboard from "./pages/portal/user/UserDashboard.jsx";
import MyVehicles from "./pages/portal/user/MyVehicles.jsx";
import SensorData from "./pages/portal/user/SensorData.jsx";
import Predictions from "./pages/portal/user/Predictions.jsx";
import Explainability from "./pages/portal/user/Explainability.jsx";
import Maintenance from "./pages/portal/user/Maintenance.jsx";
import History from "./pages/portal/user/History.jsx";
import Alerts from "./pages/portal/user/Alerts.jsx";
import Reports from "./pages/portal/user/Reports.jsx";
import Settings from "./pages/portal/user/Settings.jsx";
import ComingSoon from "./pages/portal/ComingSoon.jsx";

import TechnicianPortalLayout from "./layouts/TechnicianPortalLayout.jsx";
import TechnicianDashboard from "./pages/portal/technician/TechnicianDashboard.jsx";

import AdminHome from "./pages/portal/admin/AdminHome.jsx";

const TECHNICIAN_PLACEHOLDER_ROUTES = [
  { path: "fleet-overview", title: "Fleet Overview" },
  { path: "diagnostics", title: "Vehicle Diagnostics" },
  { path: "high-risk", title: "High Risk Vehicles" },
  { path: "work-orders", title: "Work Orders" },
  { path: "maintenance-history", title: "Maintenance History" },
  { path: "sensor-trends", title: "Sensor Trends" },
  { path: "health-monitoring", title: "Health Monitoring" },
  { path: "failure-analysis", title: "Failure Analysis" },
  { path: "explainability", title: "Explainability (SHAP)" },
  { path: "maintenance-tasks", title: "Maintenance Tasks" },
  { path: "parts-inventory", title: "Parts & Inventory" },
  { path: "service-reports", title: "Service Reports" },
  { path: "profile", title: "Profile Settings" },
];

export default function App() {
  // Show the loading sequence once per visit, then reveal the landing page.
  const [booted, setBooted] = useState(false);
  const handleFinishLoading = useCallback(() => setBooted(true), []);

  return (
    <AuthProvider>
      <Routes>
        <Route
          path="/"
          element={
            booted ? (
              <LandingPage />
            ) : (
              <LoadingPage onFinish={handleFinishLoading} />
            )
          }
        />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* First-time vehicle registration wizard — required before a
            User/Car Owner account can reach the dashboard */}
        <Route
          path="/portal/user/onboarding"
          element={
            <ProtectedRoute allowedRoles={[ROLES.USER]}>
              <VehicleRegistrationWizard />
            </ProtectedRoute>
          }
        />

        {/* User / Car Owner portal — every sidebar section built out */}
        <Route
          path="/portal/user"
          element={
            <ProtectedRoute allowedRoles={[ROLES.USER]}>
              <RequireOnboarding>
                <UserPortalLayout />
              </RequireOnboarding>
            </ProtectedRoute>
          }
        >
          <Route index element={<UserDashboard />} />
          <Route path="vehicles" element={<MyVehicles />} />
          <Route path="sensor-data" element={<SensorData />} />
          <Route path="predictions" element={<Predictions />} />
          <Route path="explainability" element={<Explainability />} />
          <Route path="maintenance" element={<Maintenance />} />
          <Route path="history" element={<History />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Technician / Engineer portal */}
        <Route
          path="/portal/technician"
          element={
            <ProtectedRoute allowedRoles={[ROLES.TECHNICIAN]}>
              <TechnicianPortalLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<TechnicianDashboard />} />
          {TECHNICIAN_PLACEHOLDER_ROUTES.map(({ path, title }) => (
            <Route key={path} path={path} element={<ComingSoon title={title} />} />
          ))}
        </Route>

        {/* Admin portal — shell only, built out in Phase 9 */}
        <Route
          path="/portal/admin"
          element={
            <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>
              <AdminHome />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}
