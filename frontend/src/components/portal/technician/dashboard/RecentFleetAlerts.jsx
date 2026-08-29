import { Link } from "react-router-dom";
import { TriangleAlert } from "lucide-react";
import { fleetAlerts } from "../../../../data/mockTechnician.js";
import StatusBadge from "../../dashboard/StatusBadge.jsx";

const ICON_COLOR = { High: "text-red-500 bg-red-50", Medium: "text-amber-500 bg-amber-50" };

export default function RecentFleetAlerts() {
  return (
    <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-card">
      <div className="flex items-center justify-between">
        <h3 className="text-[14.5px] font-bold text-neutral-900">Recent Alerts</h3>
        <Link to="/portal/technician/high-risk" className="text-[12.5px] font-semibold text-blue-600 hover:underline">
          View All
        </Link>
      </div>

      <div className="mt-4 space-y-3">
        {fleetAlerts.map((a) => (
          <div key={a.id} className="flex items-start gap-3 rounded-xl border border-neutral-100 p-3">
            <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${ICON_COLOR[a.severity]}`}>
              <TriangleAlert className="h-4.5 w-4.5" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[13px] font-bold text-neutral-900">{a.title}</p>
                <StatusBadge status={a.severity} />
              </div>
              <p className="text-[12px] text-neutral-500">Vehicle: {a.vehicle}</p>
              <p className="text-[11px] text-neutral-400">{a.datetime}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
