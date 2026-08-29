import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import { fleetRiskOverview } from "../../../../data/mockTechnician.js";
import StatusBadge from "../../dashboard/StatusBadge.jsx";

export default function FleetRiskOverview() {
  return (
    <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-card">
      <div className="flex items-center justify-between">
        <h3 className="text-[14.5px] font-bold text-neutral-900">Fleet Risk Overview</h3>
        <Link to="/portal/technician/fleet-overview" className="text-[12.5px] font-semibold text-blue-600 hover:underline">
          View All
        </Link>
      </div>

      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-[13px]">
          <thead>
            <tr className="border-b border-neutral-100 text-left text-[11.5px] uppercase tracking-wide text-neutral-400">
              <th className="pb-2 font-semibold">Vehicle</th>
              <th className="pb-2 font-semibold">Model</th>
              <th className="pb-2 font-semibold">Health</th>
              <th className="pb-2 font-semibold">Failure Risk</th>
              <th className="pb-2 font-semibold">RUL (km)</th>
              <th className="pb-2 font-semibold">Risk Level</th>
              <th className="pb-2 font-semibold">Status</th>
              <th className="pb-2 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {fleetRiskOverview.map((v) => (
              <tr key={v.id} className="border-b border-neutral-50 last:border-0">
                <td className="py-2.5 font-semibold text-neutral-900">{v.id}</td>
                <td className="py-2.5 text-neutral-600">{v.model}</td>
                <td className="py-2.5 text-neutral-600">{v.health}%</td>
                <td className="py-2.5 text-neutral-600">{v.failureRisk}%</td>
                <td className="py-2.5 text-neutral-600">{v.rul}</td>
                <td className="py-2.5">
                  <StatusBadge status={v.risk} />
                </td>
                <td className="py-2.5 text-emerald-600">{v.status}</td>
                <td className="py-2.5">
                  <button className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-50 hover:text-blue-600">
                    <Eye className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Link
        to="/portal/technician/high-risk"
        className="mt-4 block rounded-lg border border-neutral-100 py-2.5 text-center text-[13px] font-semibold text-blue-600 hover:bg-blue-50"
      >
        View All High Risk Vehicles
      </Link>
    </div>
  );
}
