import { useState, useCallback } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import RequireOnboarding from "./routes/RequireOnboarding.jsx";
import RequireTechnicianRegistration from "./routes/RequireTechnicianRegistration.jsx";
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
import TechnicianRegistrationWizard from "./pages/portal/technician/TechnicianRegistrationWizard.jsx";
import TechnicianDashboard from "./pages/portal/technician/TechnicianDashboard.jsx";
import FleetOverview from "./pages/portal/technician/FleetOverview.jsx";
import VehicleDiagnostics from "./pages/portal/technician/VehicleDiagnostics.jsx";
import HighRiskVehicles from "./pages/portal/technician/HighRiskVehicles.jsx";
import WorkOrders from "./pages/portal/technician/WorkOrders.jsx";
import MaintenanceHistory from "./pages/portal/technician/MaintenanceHistory.jsx";
import SensorTrends from "./pages/portal/technician/SensorTrends.jsx";
import HealthMonitoring from "./pages/portal/technician/HealthMonitoring.jsx";
import FailureAnalysis from "./pages/portal/technician/FailureAnalysis.jsx";
import TechExplainability from "./pages/portal/technician/Explainability.jsx";
import MaintenanceTasks from "./pages/portal/technician/MaintenanceTasks.jsx";
import PartsInventory from "./pages/portal/technician/PartsInventory.jsx";
import ServiceReports from "./pages/portal/technician/ServiceReports.jsx";
import ProfileSettings from "./pages/portal/technician/ProfileSettings.jsx";

import AdminHome from "./pages/portal/admin/AdminHome.jsx";

// Routes not yet implemented — each renders a ComingSoon placeholder.
// Remove a path from this array and add an explicit <Route> once the
// real page component is built (see fleet-overview below as the pattern).
// All Technician Portal pages are now implemented — placeholder array is empty.
const TECHNICIAN_PLACEHOLDER_ROUTES = [];

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

        {/* ── Technician Registration Wizard ──
            Shown ONLY to authenticated technicians who haven't completed registration.
            Lives outside the TechnicianPortalLayout so there's no sidebar. */}
        <Route
          path="/portal/technician/registration"
          element={
            <ProtectedRoute allowedRoles={[ROLES.TECHNICIAN]}>
              <TechnicianRegistrationWizard />
            </ProtectedRoute>
          }
        />

        {/* Technician / Engineer portal — wrapped with RequireTechnicianRegistration
            so every child route redirects to /registration if profile is incomplete */}
        <Route
          path="/portal/technician"
          element={
            <ProtectedRoute allowedRoles={[ROLES.TECHNICIAN]}>
              <RequireTechnicianRegistration>
                <TechnicianPortalLayout />
              </RequireTechnicianRegistration>
            </ProtectedRoute>
          }
        >
          <Route index element={<TechnicianDashboard />} />
          {/* --- All Technician Portal pages wired --- */}
          <Route path="fleet-overview"       element={<FleetOverview />} />
          <Route path="diagnostics"          element={<VehicleDiagnostics />} />
          <Route path="high-risk"            element={<HighRiskVehicles />} />
          <Route path="work-orders"          element={<WorkOrders />} />
          <Route path="maintenance-history"  element={<MaintenanceHistory />} />
          <Route path="sensor-trends"        element={<SensorTrends />} />
          <Route path="health-monitoring"    element={<HealthMonitoring />} />
          <Route path="failure-analysis"     element={<FailureAnalysis />} />
          <Route path="explainability"       element={<TechExplainability />} />
          <Route path="maintenance-tasks"    element={<MaintenanceTasks />} />
          <Route path="parts-inventory"      element={<PartsInventory />} />
          <Route path="service-reports"      element={<ServiceReports />} />
          <Route path="profile"              element={<ProfileSettings />} />
          {/* Placeholder fallback — empty array, kept for future pages */}
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
