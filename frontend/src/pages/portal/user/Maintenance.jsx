import { Wrench, TriangleAlert } from "lucide-react";
import PageHeader from "../../../components/portal/PageHeader.jsx";
import StatusBadge from "../../../components/portal/dashboard/StatusBadge.jsx";
import { maintenanceRecommendations, maintenanceHistory } from "../../../data/mockUserPortal.js";

export default function Maintenance() {
  return (
    <div>
      <PageHeader
        title="Maintenance"
        subtitle="AI-recommended actions and your vehicles' service history."
      />

      <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-card">
        <h3 className="text-[14.5px] font-bold text-neutral-900">Recommended Actions</h3>
        <div className="mt-3 space-y-3">
          {maintenanceRecommendations.map((r) => (
            <div key={r.id} className="flex items-start gap-3 rounded-xl border border-neutral-100 p-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600">
                <TriangleAlert className="h-4.5 w-4.5" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[13.5px] font-bold text-neutral-900">{r.title}</p>
                  <StatusBadge status={r.priority} />
                </div>
                <p className="text-[12.5px] text-neutral-500">{r.reason}</p>
                <p className="mt-0.5 text-[11.5px] text-neutral-400">Vehicle: {r.vehicle}</p>
              </div>
              <button className="shrink-0 rounded-lg border border-blue-200 px-3 py-1.5 text-[12px] font-semibold text-blue-600 hover:bg-blue-50">
                Schedule
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-neutral-100 bg-white p-5 shadow-card">
        <div className="flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-[14.5px] font-bold text-neutral-900">
            <Wrench className="h-4 w-4 text-blue-500" /> Service History
          </h3>
          <button className="rounded-lg bg-blue-600 px-3.5 py-2 text-[12.5px] font-semibold text-white hover:bg-blue-700">
            Log a Service
          </button>
        </div>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse text-[13px]">
            <thead>
              <tr className="border-b border-neutral-100 text-left text-[11.5px] uppercase tracking-wide text-neutral-400">
                <th className="pb-2 font-semibold">Date</th>
                <th className="pb-2 font-semibold">Vehicle</th>
                <th className="pb-2 font-semibold">Service</th>
                <th className="pb-2 font-semibold">Service Center</th>
                <th className="pb-2 font-semibold">Cost</th>
              </tr>
            </thead>
            <tbody>
              {maintenanceHistory.map((m, i) => (
                <tr key={i} className="border-b border-neutral-50 last:border-0">
                  <td className="py-2.5 font-medium text-neutral-800">{m.date}</td>
                  <td className="py-2.5 text-neutral-600">{m.vehicle}</td>
                  <td className="py-2.5 text-neutral-600">{m.service}</td>
                  <td className="py-2.5 text-neutral-600">{m.center}</td>
                  <td className="py-2.5 font-semibold text-neutral-800">{m.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
