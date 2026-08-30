import { useState, useMemo } from "react";
import { Search, ClipboardCheck } from "lucide-react";
import { maintenanceHistory } from "../../../data/mockTechnician.js";
import StatusBadge from "../../../components/portal/dashboard/StatusBadge.jsx";

const SERVICE_TYPES = ["All", "Oil Change", "Cooling System", "Battery Check", "Battery Replacement",
  "Inspection", "General Service", "Sensor Repair", "Full Inspection"];

const STATUS_STYLES = {
  Completed:   "bg-emerald-50 text-emerald-700",
  "In Progress": "bg-amber-50 text-amber-700",
};

function StatusPill({ status }) {
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${STATUS_STYLES[status] || "bg-neutral-100 text-neutral-500"}`}>
      {status}
    </span>
  );
}

export default function MaintenanceHistory() {
  const [search, setSearch]         = useState("");
  const [vehicleFilter, setVehicleFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");

  const vehicles = useMemo(() => ["All", ...new Set(maintenanceHistory.map((r) => r.vehicleId))], []);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return maintenanceHistory.filter((r) => {
      const matchSearch = !q || r.id.toLowerCase().includes(q) || r.vehicleId.toLowerCase().includes(q)
        || r.vehicleName.toLowerCase().includes(q) || r.serviceType.toLowerCase().includes(q)
        || r.technician.toLowerCase().includes(q);
      const matchVehicle = vehicleFilter === "All" || r.vehicleId === vehicleFilter;
      const matchType    = typeFilter === "All"    || r.serviceType === typeFilter;
      return matchSearch && matchVehicle && matchType;
    });
  }, [search, vehicleFilter, typeFilter]);

  const completed   = maintenanceHistory.filter((r) => r.status === "Completed").length;
  const inProgress  = maintenanceHistory.filter((r) => r.status === "In Progress").length;
  const totalCostRaw = maintenanceHistory.filter((r) => r.cost !== "—" && r.status === "Completed")
    .reduce((s, r) => s + parseInt(r.cost.replace(/[^0-9]/g, ""), 10), 0);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <ClipboardCheck className="h-5 w-5 text-blue-600" />
        <div>
          <h2 className="text-[18px] font-bold text-neutral-900">Maintenance History</h2>
          <p className="text-[13px] text-neutral-400">Full service history across the fleet.</p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Total Records",  value: maintenanceHistory.length, cls: "text-neutral-900" },
          { label: "Completed",      value: completed,                  cls: "text-emerald-600" },
          { label: "In Progress",    value: inProgress,                 cls: "text-amber-500"   },
          { label: "Total Cost",     value: `₹${totalCostRaw.toLocaleString("en-IN")}`, cls: "text-blue-600" },
        ].map(({ label, value, cls }) => (
          <div key={label} className="rounded-2xl border border-neutral-100 bg-white p-4 shadow-card">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-400">{label}</p>
            <p className={`mt-1 text-[22px] font-extrabold leading-none ${cls}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400" />
          <input type="text" placeholder="Search records…" value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-neutral-200 bg-white py-2 pl-9 pr-3 text-[13px] placeholder-neutral-400 focus:border-blue-400 focus:outline-none" />
        </div>
        <select value={vehicleFilter} onChange={(e) => setVehicleFilter(e.target.value)}
          className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-[13px] text-neutral-700 focus:border-blue-400 focus:outline-none">
          {vehicles.map((v) => <option key={v}>{v}</option>)}
        </select>
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}
          className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-[13px] text-neutral-700 focus:border-blue-400 focus:outline-none">
          {SERVICE_TYPES.map((t) => <option key={t}>{t}</option>)}
        </select>
        <span className="ml-auto text-[12px] text-neutral-400">{filtered.length} record{filtered.length !== 1 ? "s" : ""}</span>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] border-collapse text-[12.5px]">
            <thead>
              <tr className="border-b border-neutral-100 text-left text-[11px] uppercase tracking-wide text-neutral-400">
                {["Record ID", "Date", "Vehicle", "Service Type", "Technician", "Duration", "Cost", "Odometer", "Status"].map((h) => (
                  <th key={h} className="px-4 py-3 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={9} className="py-16 text-center text-[13px] text-neutral-400">No records match the current filters.</td></tr>
              ) : filtered.map((r) => (
                <tr key={r.id} className="border-b border-neutral-50 transition hover:bg-neutral-50/60 last:border-0">
                  <td className="px-4 py-3 font-bold text-neutral-800">{r.id}</td>
                  <td className="px-4 py-3 text-neutral-500">{r.date}</td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-neutral-800">{r.vehicleId}</p>
                    <p className="text-[11px] text-neutral-400">{r.vehicleName}</p>
                  </td>
                  <td className="px-4 py-3 text-neutral-700">{r.serviceType}</td>
                  <td className="px-4 py-3 text-neutral-600">{r.technician}</td>
                  <td className="px-4 py-3 tabular-nums text-neutral-500">{r.duration}</td>
                  <td className="px-4 py-3 tabular-nums font-semibold text-neutral-700">{r.cost}</td>
                  <td className="px-4 py-3 tabular-nums text-neutral-500">{r.odometer}</td>
                  <td className="px-4 py-3"><StatusPill status={r.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="border-t border-neutral-100 px-4 py-2.5 text-[11.5px] text-neutral-400">
          {filtered.length} of {maintenanceHistory.length} service records shown.
        </div>
      </div>
    </div>
  );
}
