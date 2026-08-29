import { TriangleAlert } from "lucide-react";
import { recommendedActions } from "../../../../data/mockTechnician.js";
import StatusBadge from "../../dashboard/StatusBadge.jsx";

export default function RecommendedActions() {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-neutral-100 bg-white p-5 shadow-card">
      <h3 className="text-[14.5px] font-bold text-neutral-900">Recommended Actions</h3>

      <p className="mt-3 flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2.5 text-[12.5px] font-medium text-red-600">
        <TriangleAlert className="h-4 w-4 shrink-0" /> {recommendedActions.banner}
      </p>

      <div className="mt-4 flex-1 overflow-x-auto">
        <table className="w-full min-w-[420px] border-collapse text-[12.5px]">
          <thead>
            <tr className="border-b border-neutral-100 text-left text-[11px] uppercase tracking-wide text-neutral-400">
              <th className="pb-2 font-semibold">Task</th>
              <th className="pb-2 font-semibold">Priority</th>
              <th className="pb-2 font-semibold">Est. Time</th>
              <th className="pb-2 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {recommendedActions.tasks.map((t) => (
              <tr key={t.id} className="border-b border-neutral-50 last:border-0">
                <td className="py-2.5 font-medium text-neutral-800">{t.task}</td>
                <td className="py-2.5">
                  <StatusBadge status={t.priority} />
                </td>
                <td className="py-2.5 text-neutral-500">{t.eta}</td>
                <td className="py-2.5">
                  <button className="rounded-md border border-blue-200 px-2.5 py-1 text-[11.5px] font-semibold text-blue-600 hover:bg-blue-50">
                    Create Order
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="mt-4 w-full rounded-lg bg-maroon-700 py-2.5 text-[13.5px] font-semibold text-white hover:bg-maroon-800">
        Create Work Order
      </button>
    </div>
  );
}
