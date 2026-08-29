import { FileText, Download, Plus } from "lucide-react";
import PageHeader from "../../../components/portal/PageHeader.jsx";
import { reports } from "../../../data/mockUserPortal.js";

export default function Reports() {
  return (
    <div>
      <PageHeader
        title="Reports"
        subtitle="Download health, risk, and maintenance-cost reports for your vehicles."
        action={
          <button className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2.5 text-[13.5px] font-semibold text-white hover:bg-blue-700">
            <Plus className="h-4 w-4" /> Generate Report
          </button>
        }
      />

      <div className="space-y-3">
        {reports.map((r) => (
          <div
            key={r.id}
            className="flex items-center justify-between gap-3 rounded-2xl border border-neutral-100 bg-white p-4 shadow-card"
          >
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                <FileText className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-[13.5px] font-bold text-neutral-900">{r.title}</p>
                <p className="text-[12px] text-neutral-500">
                  {r.type} · {r.vehicle} · {r.date}
                </p>
              </div>
            </div>
            <button className="flex shrink-0 items-center gap-1.5 rounded-lg border border-neutral-200 px-3.5 py-2 text-[12.5px] font-semibold text-neutral-700 hover:bg-neutral-50">
              <Download className="h-4 w-4" /> Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
