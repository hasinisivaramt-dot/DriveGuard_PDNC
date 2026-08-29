import { useState } from "react";
import { TriangleAlert } from "lucide-react";
import PageHeader from "../../../components/portal/PageHeader.jsx";
import StatusBadge from "../../../components/portal/dashboard/StatusBadge.jsx";
import { allAlerts } from "../../../data/mockUserPortal.js";

const FILTERS = ["All", "High", "Medium", "Low"];
const ICON_COLOR = {
  High: "text-red-500 bg-red-50",
  Medium: "text-amber-500 bg-amber-50",
  Low: "text-blue-500 bg-blue-50",
};

export default function Alerts() {
  const [filter, setFilter] = useState("All");
  const items = allAlerts.filter((a) => filter === "All" || a.severity === filter);

  return (
    <div>
      <PageHeader title="Alerts" subtitle="Every alert raised across your registered vehicles." />

      <div className="mb-4 flex gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold transition ${
              filter === f ? "bg-blue-600 text-white" : "border border-neutral-200 text-neutral-600 hover:border-blue-200"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {items.map((a) => (
          <div key={a.id} className="flex items-start gap-3 rounded-2xl border border-neutral-100 bg-white p-4 shadow-card">
            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${ICON_COLOR[a.severity]}`}>
              <TriangleAlert className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-[14px] font-bold text-neutral-900">{a.title}</p>
                <StatusBadge status={a.severity} />
              </div>
              <p className="text-[12.5px] text-neutral-500">Vehicle: {a.vehicle}</p>
              <p className="text-[11.5px] text-neutral-400">{a.datetime}</p>
            </div>
            <button className="shrink-0 rounded-lg border border-neutral-200 px-3 py-1.5 text-[12px] font-semibold text-neutral-600 hover:bg-neutral-50">
              Dismiss
            </button>
          </div>
        ))}
        {items.length === 0 && (
          <p className="rounded-2xl border border-dashed border-neutral-200 bg-white p-8 text-center text-[13px] text-neutral-400">
            No alerts in this category.
          </p>
        )}
      </div>
    </div>
  );
}
