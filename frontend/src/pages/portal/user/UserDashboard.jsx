import StatCards from "../../../components/portal/dashboard/StatCards.jsx";
import HealthTrendChart from "../../../components/portal/dashboard/HealthTrendChart.jsx";
import HealthByVehicle from "../../../components/portal/dashboard/HealthByVehicle.jsx";
import KeySensorSnapshot from "../../../components/portal/dashboard/KeySensorSnapshot.jsx";
import RecentAlerts from "../../../components/portal/dashboard/RecentAlerts.jsx";
import RiskDistribution from "../../../components/portal/dashboard/RiskDistribution.jsx";
import RecentPredictions from "../../../components/portal/dashboard/RecentPredictions.jsx";
import MaintenanceRecommendation from "../../../components/portal/dashboard/MaintenanceRecommendation.jsx";

export default function UserDashboard() {
  return (
    <div className="space-y-4 sm:space-y-6">
      <StatCards />

      <div className="grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-[1.6fr_1.1fr_1fr]">
        <HealthTrendChart />
        <HealthByVehicle />
        <KeySensorSnapshot />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 xl:grid-cols-3">
        <RecentAlerts />
        <RiskDistribution />
        <RecentPredictions />
      </div>

      <MaintenanceRecommendation />
    </div>
  );
}
