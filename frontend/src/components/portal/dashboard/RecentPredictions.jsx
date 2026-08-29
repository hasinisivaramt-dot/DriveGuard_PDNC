import { Link } from "react-router-dom";
import { recentPredictions } from "../../../data/mockDashboard.js";
import StatusBadge from "./StatusBadge.jsx";

export default function RecentPredictions() {
  return (
    <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-card">
      <div className="flex items-center justify-between">
        <h3 className="text-[14.5px] font-bold text-neutral-900">Recent Predictions</h3>
        <Link to="/portal/user/predictions" className="text-[12.5px] font-semibold text-blue-600 hover:underline">
          View All
        </Link>
      </div>

      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[480px] border-collapse text-[13px]">
          <thead>
            <tr className="border-b border-neutral-100 text-left text-[11.5px] uppercase tracking-wide text-neutral-400">
              <th className="pb-2 font-semibold">Vehicle</th>
              <th className="pb-2 font-semibold">Health</th>
              <th className="pb-2 font-semibold">Failure Risk</th>
              <th className="pb-2 font-semibold">RUL (km)</th>
              <th className="pb-2 font-semibold">Risk Level</th>
            </tr>
          </thead>
          <tbody>
            {recentPredictions.map((p) => (
              <tr key={p.vehicle} className="border-b border-neutral-50 last:border-0">
                <td className="py-2.5 font-semibold text-neutral-900">{p.vehicle}</td>
                <td className="py-2.5 text-neutral-600">{p.health}%</td>
                <td className="py-2.5 text-neutral-600">{p.failureRisk}%</td>
                <td className="py-2.5 text-neutral-600">{p.rul}</td>
                <td className="py-2.5">
                  <StatusBadge status={p.risk} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
