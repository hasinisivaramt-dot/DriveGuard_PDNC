import { useState } from "react";
import { LineChart, TriangleAlert, Wrench } from "lucide-react";
import PageHeader from "../../../components/portal/PageHeader.jsx";
import { activityHistory } from "../../../data/mockUserPortal.js";

const TYPE_META = {
  Prediction: { icon: LineChart, color: "text-blue-600 bg-blue-50" },
  Alert: { icon: TriangleAlert, color: "text-red-500 bg-red-50" },
  Maintenance: { icon: Wrench, color: "text-emerald-600 bg-emerald-50" },
};

const FILTERS = ["All", "Prediction", "Alert", "Maintenance"];

export default function History() {
  const [filter, setFilter] = useState("All");
  const items = activityHistory.filter((a) => filter === "All" || a.type === filter);

  return (
    <div>
      <PageHeader title="History" subtitle="A timeline of predictions, alerts, and maintenance across your vehicles." />

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

      <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-card">
        <ol className="space-y-0">
          {items.map((item, i) => {
            const meta = TYPE_META[item.type];
            const Icon = meta.icon;
            return (
              <li key={i} className="relative flex gap-3 pb-6 last:pb-0">
                {i < items.length - 1 && (
                  <span className="absolute left-[15px] top-8 h-[calc(100%-1rem)] w-px bg-neutral-200" />
                )}
                <span className={`z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${meta.color}`}>
                  <Icon className="h-4 w-4" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <p className="text-[13px] font-semibold text-neutral-900">{item.detail}</p>
                    <span className="text-[11.5px] text-neutral-400">{item.date}</span>
                  </div>
                  <p className="text-[11.5px] text-neutral-400">Vehicle: {item.vehicle}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
