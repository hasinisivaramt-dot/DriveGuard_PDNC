import FleetStatCards from "../../../components/portal/technician/dashboard/FleetStatCards.jsx";
import FleetRiskOverview from "../../../components/portal/technician/dashboard/FleetRiskOverview.jsx";
import FleetRiskDistribution from "../../../components/portal/technician/dashboard/FleetRiskDistribution.jsx";
import RecentFleetAlerts from "../../../components/portal/technician/dashboard/RecentFleetAlerts.jsx";
import VehicleDiagnosticDetails from "../../../components/portal/technician/dashboard/VehicleDiagnosticDetails.jsx";
import RecommendedActions from "../../../components/portal/technician/dashboard/RecommendedActions.jsx";
import ActiveWorkOrders from "../../../components/portal/technician/dashboard/ActiveWorkOrders.jsx";

export default function TechnicianDashboard() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <FleetStatCards />

      <div className="grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-[1.7fr_1fr_1fr]">
        <FleetRiskOverview />
        <FleetRiskDistribution />
        <RecentFleetAlerts />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-[1.8fr_1fr]">
        <VehicleDiagnosticDetails />
        <RecommendedActions />
      </div>

      <ActiveWorkOrders />
    </div>
  );
}
