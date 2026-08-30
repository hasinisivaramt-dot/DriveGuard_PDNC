import { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, CheckCircle2, Wrench } from "lucide-react";
import { maintenanceTasks } from "../../../data/mockTechnician.js";
import StatusBadge from "../../../components/portal/dashboard/StatusBadge.jsx";

const STATUS_CYCLE = {
  Overdue:    "In Progress",
  "Due Today":"In Progress",
  Upcoming:   "In Progress",
  "In Progress": "Completed",
  Completed:  "Completed",
};

const STATUS_STYLES = {
  Overdue:      "bg-red-50 text-red-600 border-red-200",
  "Due Today":  "bg-amber-50 text-amber-700 border-amber-200",
  Upcoming:     "bg-blue-50 text-blue-700 border-blue-200",
  "In Progress":"bg-orange-50 text-orange-700 border-orange-200",
  Completed:    "bg-emerald-50 text-emerald-700 border-emerald-200",
};

function StatusPill({ status }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${STATUS_STYLES[status] || "bg-neutral-100 text-neutral-500 border-neutral-200"}`}>
      {status}
    </span>
  );
}

function Toast({ toast, onDismiss }) {
  if (!toast) return null;
  return (
    <div role="alert" style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999 }}
      className="flex max-w-sm items-start gap-3 rounded-xl border border-emerald-200 bg-white px-4 py-3 shadow-lg text-emerald-700">
      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
      <p className="text-[13px] font-medium">{toast}</p>
      <button onClick={onDismiss} className="ml-auto text-neutral-400 hover:text-neutral-600">×</button>
    </div>
  );
}

export default function MaintenanceTasks() {
  const navigate = useNavigate();
  const [tasks, setTasks]         = useState(() => maintenanceTasks.map((t) => ({ ...t })));
  const [search, setSearch]       = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [updatingId, setUpdatingId] = useState(null);
  const [toast, setToast]         = useState(null);
  const toastRef = useRef(null);

  useEffect(() => {
    if (!toast) return;
    clearTimeout(toastRef.current);
    toastRef.current = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(toastRef.current);
  }, [toast]);

  const stats = useMemo(() => ({
    overdue:    tasks.filter((t) => t.status === "Overdue").length,
    dueToday:   tasks.filter((t) => t.status === "Due Today").length,
    upcoming:   tasks.filter((t) => t.status === "Upcoming").length,
    completed:  tasks.filter((t) => t.status === "Completed").length,
  }), [tasks]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return tasks.filter((t) => {
      const matchSearch = !q || t.id.toLowerCase().includes(q) || t.vehicleId.toLowerCase().includes(q)
        || t.task.toLowerCase().includes(q) || t.assignedTo.toLowerCase().includes(q);
      const matchStatus = statusFilter === "All" || t.status === statusFilter;
      const matchType   = typeFilter === "All"   || t.type === typeFilter;
      return matchSearch && matchStatus && matchType;
    });
  }, [tasks, search, statusFilter, typeFilter]);

  async function handleAdvance(id) {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    const next = STATUS_CYCLE[task.status];
    if (!next || next === task.status) return;
    setUpdatingId(id);
    await new Promise((r) => setTimeout(r, 500));
    setTasks((prev) => prev.map((t) => t.id === id ? { ...t, status: next } : t));
    setUpdatingId(null);
    setToast(`${id}: status updated to "${next}".`);
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Wrench className="h-5 w-5 text-blue-600" />
        <div>
          <h2 className="text-[18px] font-bold text-neutral-900">Maintenance Tasks</h2>
          <p className="text-[13px] text-neutral-400">Scheduled and preventive maintenance task tracker.</p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Overdue",    value: stats.overdue,   cls: "text-red-500"   },
          { label: "Due Today",  value: stats.dueToday,  cls: "text-amber-500" },
          { label: "Upcoming",   value: stats.upcoming,  cls: "text-blue-600"  },
          { label: "Completed",  value: stats.completed, cls: "text-emerald-600"},
        ].map(({ label, value, cls }) => (
          <div key={label} className="rounded-2xl border border-neutral-100 bg-white p-4 shadow-card">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-400">{label}</p>
            <p className={`mt-1 text-[26px] font-extrabold leading-none ${cls}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Overdue banner */}
      {stats.overdue > 0 && (
        <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
          <p className="text-[13px] font-medium text-red-700">
            ⚠ <strong>{stats.overdue} task{stats.overdue !== 1 ? "s are" : " is"} overdue</strong> — immediate action required.
          </p>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400" />
          <input type="text" placeholder="Search tasks…" value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-neutral-200 bg-white py-2 pl-9 pr-3 text-[13px] placeholder-neutral-400 focus:border-blue-400 focus:outline-none" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-[13px] text-neutral-700 focus:border-blue-400 focus:outline-none">
          {["All", "Overdue", "Due Today", "Upcoming", "In Progress", "Completed"].map((s) => <option key={s}>{s}</option>)}
        </select>
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}
          className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-[13px] text-neutral-700 focus:border-blue-400 focus:outline-none">
          {["All", "Corrective", "Preventive", "Inspection"].map((t) => <option key={t}>{t}</option>)}
        </select>
        <span className="ml-auto text-[12px] text-neutral-400">{filtered.length} task{filtered.length !== 1 ? "s" : ""}</span>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] border-collapse text-[12.5px]">
            <thead>
              <tr className="border-b border-neutral-100 text-left text-[11px] uppercase tracking-wide text-neutral-400">
                {["Task ID", "Vehicle", "Task", "Type", "Due Date", "Priority", "Status", "Assigned To", "Action"].map((h) => (
                  <th key={h} className="px-4 py-3 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={9} className="py-16 text-center text-[13px] text-neutral-400">No tasks match the current filters.</td></tr>
              ) : filtered.map((t) => {
                const isTerminal = t.status === "Completed";
                const isUpdating = updatingId === t.id;
                const next       = STATUS_CYCLE[t.status];
                return (
                  <tr key={t.id} className={`border-b border-neutral-50 hover:bg-neutral-50/60 last:border-0 transition ${t.status === "Overdue" ? "bg-red-50/20" : ""}`}>
                    <td className="px-4 py-3 font-bold text-neutral-800">{t.id}</td>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-neutral-800">{t.vehicleId}</p>
                      <p className="text-[11px] text-neutral-400">{t.vehicleName}</p>
                    </td>
                    <td className="px-4 py-3 max-w-[200px]">
                      <p className="truncate text-neutral-700" title={t.task}>{t.task}</p>
                    </td>
                    <td className="px-4 py-3 text-neutral-500">{t.type}</td>
                    <td className="px-4 py-3 text-neutral-500">{t.dueDate}</td>
                    <td className="px-4 py-3"><StatusBadge status={t.priority} /></td>
                    <td className="px-4 py-3"><StatusPill status={t.status} /></td>
                    <td className="px-4 py-3">
                      <span className={t.assignedTo === "Unassigned" ? "italic text-neutral-400" : "text-neutral-600"}>{t.assignedTo}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-1">
                        {!isTerminal && (
                          <button id={`mt-advance-${t.id}`} onClick={() => handleAdvance(t.id)} disabled={isUpdating}
                            className={`rounded-md border px-2.5 py-1 text-[11px] font-semibold transition ${isUpdating ? "cursor-not-allowed border-neutral-200 text-neutral-400" : "border-amber-200 text-amber-600 hover:bg-amber-50"}`}>
                            {isUpdating ? "Updating…" : `Mark ${next}`}
                          </button>
                        )}
                        <button onClick={() => navigate(`/portal/technician/diagnostics?vin=${encodeURIComponent(t.vehicleId)}`)}
                          className="rounded-md border border-blue-200 px-2.5 py-1 text-[11px] font-semibold text-blue-600 hover:bg-blue-50">
                          Diagnostics
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="border-t border-neutral-100 px-4 py-2.5 text-[11.5px] text-neutral-400">
          {filtered.length} of {tasks.length} tasks shown.
        </div>
      </div>

      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </div>
  );
}
