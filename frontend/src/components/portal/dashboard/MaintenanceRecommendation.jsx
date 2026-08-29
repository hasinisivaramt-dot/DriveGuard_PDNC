import { Link } from "react-router-dom";
import { Wrench } from "lucide-react";
import { maintenanceRecommendation } from "../../../data/mockDashboard.js";

export default function MaintenanceRecommendation() {
  return (
    <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-card">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <Wrench className="h-4.5 w-4.5" />
          </span>
          <div>
            <h3 className="text-[14.5px] font-bold text-neutral-900">Maintenance Recommendation</h3>
            <p className="text-[12.5px] text-neutral-500">
              Based on AI analysis, we recommend the following actions.
            </p>
          </div>
        </div>
        <Link
          to="/portal/user/maintenance"
          className="whitespace-nowrap rounded-lg border border-blue-200 px-4 py-2 text-center text-[13px] font-semibold text-blue-600 transition hover:bg-blue-50"
        >
          View Maintenance
        </Link>
      </div>
      <p className="mt-4 rounded-xl bg-blue-50/60 px-4 py-3 text-[13px] text-neutral-700">
        {maintenanceRecommendation}
      </p>
    </div>
  );
}
