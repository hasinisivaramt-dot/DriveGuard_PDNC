import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  TriangleAlert,
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ChevronRight,
  ShieldAlert,
} from "lucide-react";
import { allFleetVehicles, allVehicleDiagnostics } from "../../../data/mockTechnician.js";
import StatusBadge from "../../../components/portal/dashboard/StatusBadge.jsx";

// ---------------------------------------------------------------------------
// Only High / Critical risk vehicles are surfaced on this page
// ---------------------------------------------------------------------------
const HIGH_RISK_LEVELS = ["High", "Critical"];

function healthBarColor(v) {
  return v >= 75 ? "#22c55e" : v >= 50 ? "#f59e0b" : "#ef4444";
}
function healthTextClass(v) {
  return v >= 75 ? "text-emerald-600" : v >= 50 ? "text-amber-500" : "text-red-500";
}
function riskTextClass(v) {
  return v <= 15 ? "text-emerald-600" : v <= 30 ? "text-amber-500" : "text-red-500";
}

// Derive recommended action label from allVehicleDiagnostics
function getTopAction(vehicleId) {
  const diag = allVehicleDiagnostics[vehicleId];
  if (!diag || !diag.actions?.tasks?.length) return "—";
  return diag.actions.tasks[0].task;
}

// Derive action priority label
function getActionPriority(vehicle) {
  if (vehicle.failureRisk >= 60) return "Immediate";
  if (vehicle.failureRisk >= 40) return "Urgent";
  return "Monitor";
}

// Small health bar
function HealthBar({ value }) {
  const color = healthBarColor(value);
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-neutral-100">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${value}%`, background: color }}
        />
      </div>
      <span className={`text-[12px] font-bold tabular-nums ${healthTextClass(value)}`}>
        {value}%
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sort helpers
// ---------------------------------------------------------------------------
const SORT_FIELDS = {
  id:          (a, b) => a.id.localeCompare(b.id),
  health:      (a, b) => a.health - b.health,
  failureRisk: (a, b) => b.failureRisk - a.failureRisk, // highest first by default
  rul:         (a, b) => a.rul - b.rul,
  risk:        (a, b) => {
    const order = { Critical: 0, High: 1, Moderate: 2, Low: 3 };
    return (order[a.risk] ?? 4) - (order[b.risk] ?? 4);
  },
};

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function HighRiskVehicles() {
  const navigate = useNavigate();

  const [search, setSearch]               = useState("");
  const [riskFilter, setRiskFilter]       = useState("All");   // All | High | Critical
  const [statusFilter, setStatusFilter]   = useState("All");   // All | Active | In Service | Offline
  const [sortKey, setSortKey]             = useState("failureRisk");
  const [sortDir, setSortDir]             = useState("desc");  // asc | desc

  // Base data — only High/Critical vehicles
  const atRisk = useMemo(
    () => allFleetVehicles.filter((v) => HIGH_RISK_LEVELS.includes(v.risk)),
    []
  );

  // Derived summary stats
  const criticalCount  = atRisk.filter((v) => v.risk === "Critical").length;
  const highCount      = atRisk.filter((v) => v.risk === "High").length;
  const immediateCount = atRisk.filter((v) => v.failureRisk >= 60).length;
  const avgHealth      = Math.round(atRisk.reduce((s, v) => s + v.health, 0) / (atRisk.length || 1));

  // Filtered + sorted list
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return atRisk
      .filter((v) => {
        const matchSearch =
          !q ||
          v.id.toLowerCase().includes(q) ||
          v.manufacturer.toLowerCase().includes(q) ||
          v.model.toLowerCase().includes(q) ||
          v.owner.toLowerCase().includes(q);
        const matchRisk   = riskFilter === "All"   || v.risk === riskFilter;
        const matchStatus = statusFilter === "All" || v.status === statusFilter;
        return matchSearch && matchRisk && matchStatus;
      })
      .sort((a, b) => {
        const fn = SORT_FIELDS[sortKey];
        if (!fn) return 0;
        return sortDir === "asc" ? fn(a, b) : -fn(a, b);
      });
  }, [atRisk, search, riskFilter, statusFilter, sortKey, sortDir]);

  function toggleSort(key) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("desc");
    }
  }

  function SortIcon({ field }) {
    if (sortKey !== field) return <ArrowUpDown className="h-3 w-3 text-neutral-300" />;
    return sortDir === "asc"
      ? <ArrowUp className="h-3 w-3 text-blue-500" />
      : <ArrowDown className="h-3 w-3 text-blue-500" />;
  }

  function viewDiagnostics(vehicleId) {
    navigate(`/portal/technician/diagnostics?vin=${encodeURIComponent(vehicleId)}`);
  }

  // ---------------------------------------------------------------------------
  return (
    <div className="space-y-4 sm:space-y-6">

      {/* ================================================================== */}
      {/* Header                                                              */}
      {/* ================================================================== */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="h-5 w-5 text-red-500" />
            <h2 className="text-[18px] font-bold text-neutral-900">High Risk Vehicles</h2>
          </div>
          <p className="mt-0.5 text-[13px] text-neutral-400">
            Vehicles with High or Critical risk level requiring immediate attention.
          </p>
        </div>
      </div>

      {/* ================================================================== */}
      {/* Summary stat cards                                                   */}
      {/* ================================================================== */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "At Risk", value: atRisk.length, sub: "High + Critical",       cls: "text-neutral-900"  },
          { label: "Critical", value: criticalCount, sub: "Immediate action",     cls: "text-red-500"      },
          { label: "High Risk", value: highCount,    sub: "Urgent inspection",    cls: "text-amber-500"    },
          { label: "Avg Health", value: `${avgHealth}%`, sub: "Across at-risk fleet", cls: healthTextClass(avgHealth) },
        ].map(({ label, value, sub, cls }) => (
          <div key={label} className="rounded-2xl border border-neutral-100 bg-white p-4 shadow-card">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-400">{label}</p>
            <p className={`mt-1 text-[26px] font-extrabold leading-none ${cls}`}>{value}</p>
            <p className="mt-0.5 text-[11.5px] text-neutral-400">{sub}</p>
          </div>
        ))}
      </div>

      {/* Immediate action alert banner */}
      {immediateCount > 0 && (
        <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
          <TriangleAlert className="h-5 w-5 shrink-0 text-red-500" />
          <p className="text-[13px] font-medium text-red-700">
            <strong>{immediateCount} vehicle{immediateCount !== 1 ? "s" : ""}</strong> have failure risk ≥ 60% and require{immediateCount === 1 ? "s" : ""} <strong>immediate</strong> servicing.
          </p>
        </div>
      )}

      {/* ================================================================== */}
      {/* Filters & Search                                                     */}
      {/* ================================================================== */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400" />
          <input
            id="highrisk-search"
            type="text"
            placeholder="Search vehicles…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-neutral-200 bg-white py-2 pl-9 pr-3 text-[13px] placeholder-neutral-400 focus:border-blue-400 focus:outline-none"
          />
        </div>

        {/* Risk filter */}
        <select
          id="highrisk-risk-filter"
          value={riskFilter}
          onChange={(e) => setRiskFilter(e.target.value)}
          className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-[13px] text-neutral-700 focus:border-blue-400 focus:outline-none"
        >
          <option value="All">All Risk Levels</option>
          <option value="Critical">Critical Only</option>
          <option value="High">High Only</option>
        </select>

        {/* Status filter */}
        <select
          id="highrisk-status-filter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-[13px] text-neutral-700 focus:border-blue-400 focus:outline-none"
        >
          <option value="All">All Statuses</option>
          <option value="Active">Active</option>
          <option value="In Service">In Service</option>
          <option value="Offline">Offline</option>
        </select>

        <span className="ml-auto text-[12px] text-neutral-400">
          {filtered.length} vehicle{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* ================================================================== */}
      {/* Table                                                                */}
      {/* ================================================================== */}
      <div className="overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] border-collapse text-[12.5px]">
            <thead>
              <tr className="border-b border-neutral-100 text-left text-[11px] uppercase tracking-wide text-neutral-400">
                {/* sortable headers */}
                {[
                  { key: "id",          label: "Vehicle"       },
                  { key: null,          label: "Owner"         },
                  { key: "health",      label: "Health Score"  },
                  { key: "failureRisk", label: "Failure Risk"  },
                  { key: "rul",         label: "RUL"           },
                  { key: "risk",        label: "Risk Level"    },
                  { key: null,          label: "Status"        },
                  { key: null,          label: "Recommended Action" },
                  { key: null,          label: "Action"        },
                ].map(({ key, label }) => (
                  <th
                    key={label}
                    onClick={() => key && toggleSort(key)}
                    className={`px-4 py-3 font-semibold ${key ? "cursor-pointer select-none hover:text-neutral-700" : ""}`}
                  >
                    <span className="inline-flex items-center gap-1">
                      {label}
                      {key && <SortIcon field={key} />}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-16 text-center text-[13px] text-neutral-400">
                    No vehicles match the current filters.
                  </td>
                </tr>
              ) : (
                filtered.map((v) => {
                  const topAction = getTopAction(v.id);
                  const actionPriority = getActionPriority(v);
                  return (
                    <tr
                      key={v.id}
                      className={`border-b border-neutral-50 transition hover:bg-neutral-50/60 last:border-0 ${
                        v.risk === "Critical" ? "bg-red-50/20" : ""
                      }`}
                    >
                      {/* Vehicle */}
                      <td className="px-4 py-3">
                        <p className="font-bold text-neutral-900">{v.id}</p>
                        <p className="text-[11px] text-neutral-400">{v.manufacturer} {v.model} · {v.type}</p>
                      </td>

                      {/* Owner */}
                      <td className="px-4 py-3 text-neutral-600">{v.owner}</td>

                      {/* Health Score */}
                      <td className="px-4 py-3">
                        <HealthBar value={v.health} />
                      </td>

                      {/* Failure Risk */}
                      <td className="px-4 py-3">
                        <span className={`text-[13px] font-bold tabular-nums ${riskTextClass(v.failureRisk)}`}>
                          {v.failureRisk}%
                        </span>
                      </td>

                      {/* RUL */}
                      <td className="px-4 py-3 tabular-nums text-neutral-600">
                        {v.rul.toLocaleString()} km
                      </td>

                      {/* Risk Level */}
                      <td className="px-4 py-3">
                        <StatusBadge status={v.risk} />
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3">
                        <StatusBadge status={v.status} />
                      </td>

                      {/* Recommended Action */}
                      <td className="px-4 py-3 max-w-[200px]">
                        <p className="truncate text-[12px] text-neutral-700">{topAction}</p>
                        <span
                          className={`inline-block mt-0.5 text-[10.5px] font-semibold ${
                            actionPriority === "Immediate"
                              ? "text-red-500"
                              : actionPriority === "Urgent"
                              ? "text-amber-500"
                              : "text-neutral-400"
                          }`}
                        >
                          {actionPriority}
                        </span>
                      </td>

                      {/* Action */}
                      <td className="px-4 py-3">
                        <button
                          id={`highrisk-view-${v.id.replace(/\s/g, "-")}`}
                          onClick={() => viewDiagnostics(v.id)}
                          className="inline-flex items-center gap-1 rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-[12px] font-semibold text-blue-700 hover:bg-blue-100"
                        >
                          View Diagnostics
                          <ChevronRight className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table footer */}
        <div className="border-t border-neutral-100 px-4 py-2.5 text-[11.5px] text-neutral-400">
          Showing {filtered.length} of {atRisk.length} at-risk vehicles. Click column headers to sort.
        </div>
      </div>
    </div>
  );
}
