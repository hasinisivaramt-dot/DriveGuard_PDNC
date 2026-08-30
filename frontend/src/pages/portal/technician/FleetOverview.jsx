import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Car,
  HeartPulse,
  TriangleAlert,
  Wrench,
  WifiOff,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
  Eye,
  X,
} from "lucide-react";
import { allFleetVehicles, fleetSummaryStats } from "../../../data/mockTechnician.js";
import StatusBadge from "../../../components/portal/dashboard/StatusBadge.jsx";

// ---------------------------------------------------------------------------
// Health bar — colour-coded fill
// ---------------------------------------------------------------------------
function HealthBar({ value }) {
  const color =
    value >= 75 ? "#22c55e" : value >= 50 ? "#f59e0b" : "#ef4444";
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-neutral-100">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${value}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-[13px] font-bold tabular-nums" style={{ color }}>
        {value}%
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Summary stat card
// ---------------------------------------------------------------------------
function SummaryCard({ icon: Icon, bg, iconColor, label, value, sub }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-neutral-100 bg-white p-4 shadow-card">
      <span
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${bg}`}
      >
        <Icon className={`h-5 w-5 ${iconColor}`} />
      </span>
      <div className="min-w-0">
        <p className="truncate text-[12.5px] text-neutral-500">{label}</p>
        <p className="text-[24px] font-extrabold leading-none text-neutral-900">
          {value}
        </p>
        {sub && (
          <p className="mt-0.5 truncate text-[11px] text-neutral-400">{sub}</p>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sort helpers
// ---------------------------------------------------------------------------
const SORT_FNS = {
  id:          (a, b) => a.id.localeCompare(b.id),
  model:       (a, b) => `${a.manufacturer} ${a.model}`.localeCompare(`${b.manufacturer} ${b.model}`),
  health:      (a, b) => a.health - b.health,
  failureRisk: (a, b) => a.failureRisk - b.failureRisk,
  rul:         (a, b) => a.rul - b.rul,
  risk: (a, b) => {
    const ord = { Critical: 0, High: 1, Moderate: 2, Low: 3 };
    return (ord[a.risk] ?? 4) - (ord[b.risk] ?? 4);
  },
};

function SortIcon({ field, sortKey, sortDir }) {
  if (sortKey !== field)
    return <ChevronsUpDown className="ml-1 inline h-3.5 w-3.5 text-neutral-300" />;
  return sortDir === "asc"
    ? <ChevronUp   className="ml-1 inline h-3.5 w-3.5 text-blue-600" />
    : <ChevronDown className="ml-1 inline h-3.5 w-3.5 text-blue-600" />;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const RISK_OPTIONS   = ["All", "Low", "Moderate", "High", "Critical"];
const STATUS_OPTIONS = ["All", "Active", "In Service", "Offline"];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function FleetOverview() {
  const navigate = useNavigate();

  const [query,        setQuery]        = useState("");
  const [riskFilter,   setRiskFilter]   = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortKey,      setSortKey]      = useState("risk");
  const [sortDir,      setSortDir]      = useState("asc");

  // ---- filter + sort -------------------------------------------------------
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allFleetVehicles
      .filter((v) => {
        if (riskFilter !== "All" && v.risk !== riskFilter) return false;
        if (statusFilter !== "All" && v.status !== statusFilter) return false;
        if (q) {
          return (
            v.id.toLowerCase().includes(q) ||
            v.model.toLowerCase().includes(q) ||
            v.manufacturer.toLowerCase().includes(q) ||
            v.owner.toLowerCase().includes(q) ||
            v.type.toLowerCase().includes(q)
          );
        }
        return true;
      })
      .sort((a, b) => {
        const cmp = (SORT_FNS[sortKey]?.(a, b)) ?? 0;
        return sortDir === "asc" ? cmp : -cmp;
      });
  }, [query, riskFilter, statusFilter, sortKey, sortDir]);

  function toggleSort(key) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  function clearFilters() {
    setQuery("");
    setRiskFilter("All");
    setStatusFilter("All");
  }

  const hasActiveFilters =
    query.trim() !== "" || riskFilter !== "All" || statusFilter !== "All";

  // ---- navigate to diagnostics page (exists as ComingSoon for now) ---------
  function handleView(vehicleId) {
    navigate(`/portal/technician/diagnostics?vin=${encodeURIComponent(vehicleId)}`);
  }

  // ---- sortable column header ---------------------------------------------
  function Th({ field, children, className = "" }) {
    return (
      <th className={`pb-2 ${className}`}>
        <button
          onClick={() => toggleSort(field)}
          className="flex cursor-pointer select-none items-center whitespace-nowrap text-left text-[11.5px] font-semibold uppercase tracking-wide text-neutral-400 hover:text-neutral-700"
        >
          {children}
          <SortIcon field={field} sortKey={sortKey} sortDir={sortDir} />
        </button>
      </th>
    );
  }

  // --------------------------------------------------------------------------
  return (
    <div className="space-y-4 sm:space-y-6">

      {/* Page heading */}
      <div>
        <h2 className="text-[18px] font-bold text-neutral-900">Fleet Overview</h2>
        <p className="mt-0.5 text-[13px] text-neutral-400">
          Monitor health, risk and status for every vehicle in the fleet.
        </p>
      </div>

      {/* ---- Summary stat cards ------------------------------------------ */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-6">
        <SummaryCard
          icon={Car}          bg="bg-blue-50"     iconColor="text-blue-600"
          label="Total Vehicles" value={fleetSummaryStats.total}
        />
        <SummaryCard
          icon={HeartPulse}   bg="bg-emerald-50"  iconColor="text-emerald-500"
          label="Active"        value={fleetSummaryStats.active}
          sub="Currently running"
        />
        <SummaryCard
          icon={Wrench}       bg="bg-violet-50"   iconColor="text-violet-600"
          label="In Service"    value={fleetSummaryStats.inService}
          sub="Under maintenance"
        />
        <SummaryCard
          icon={WifiOff}      bg="bg-neutral-100" iconColor="text-neutral-500"
          label="Offline"       value={fleetSummaryStats.offline}
          sub="No recent signal"
        />
        <SummaryCard
          icon={TriangleAlert} bg="bg-red-50"    iconColor="text-red-500"
          label="Critical Risk"  value={fleetSummaryStats.critical}
          sub="Immediate action"
        />
        <SummaryCard
          icon={TriangleAlert} bg="bg-orange-50" iconColor="text-orange-500"
          label="High Risk"      value={fleetSummaryStats.high}
          sub="Attention required"
        />
      </div>

      {/* ---- Search & filters -------------------------------------------- */}
      <div className="rounded-2xl border border-neutral-100 bg-white p-4 shadow-card sm:p-5">
        <div className="flex flex-wrap items-center gap-3">

          {/* Search input */}
          <div className="flex min-w-[220px] flex-1 items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2 transition focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-50">
            <Search className="h-4 w-4 shrink-0 text-neutral-400" />
            <input
              id="fleet-search"
              type="text"
              placeholder="Search vehicle no., model, owner…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full text-[13px] text-neutral-700 outline-none placeholder:text-neutral-400"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="shrink-0 text-neutral-400 hover:text-neutral-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Risk filter */}
          <div className="flex items-center gap-2">
            <label htmlFor="fleet-risk-filter" className="text-[12px] font-semibold text-neutral-500">
              Risk
            </label>
            <select
              id="fleet-risk-filter"
              value={riskFilter}
              onChange={(e) => setRiskFilter(e.target.value)}
              className="rounded-lg border border-neutral-200 px-3 py-2 text-[13px] text-neutral-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
            >
              {RISK_OPTIONS.map((o) => (
                <option key={o} value={o}>{o === "All" ? "All Risks" : o}</option>
              ))}
            </select>
          </div>

          {/* Status filter */}
          <div className="flex items-center gap-2">
            <label htmlFor="fleet-status-filter" className="text-[12px] font-semibold text-neutral-500">
              Status
            </label>
            <select
              id="fleet-status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-neutral-200 px-3 py-2 text-[13px] text-neutral-700 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50"
            >
              {STATUS_OPTIONS.map((o) => (
                <option key={o} value={o}>{o === "All" ? "All Statuses" : o}</option>
              ))}
            </select>
          </div>

          {/* Clear filters */}
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-2 text-[13px] font-medium text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700"
            >
              <X className="h-3.5 w-3.5" /> Clear
            </button>
          )}

          {/* Results counter */}
          <p className="ml-auto text-[12.5px] text-neutral-400">
            {filtered.length === allFleetVehicles.length
              ? `${allFleetVehicles.length} vehicles`
              : `${filtered.length} of ${allFleetVehicles.length} vehicles`}
          </p>
        </div>
      </div>

      {/* ---- Vehicle table ----------------------------------------------- */}
      <div className="rounded-2xl border border-neutral-100 bg-white shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] border-collapse text-[13px]">
            <thead>
              <tr className="border-b border-neutral-100 text-left">
                <Th field="id"          className="pl-5">Vehicle No.</Th>
                <Th field="model">      Manufacturer / Model</Th>
                <th className="pb-2 text-[11.5px] font-semibold uppercase tracking-wide text-neutral-400">
                  Type
                </th>
                <Th field="health">     Health Score</Th>
                <Th field="failureRisk">Failure Risk</Th>
                <Th field="rul">        RUL (km)</Th>
                <Th field="risk">       Risk Level</Th>
                <th className="pb-2 text-[11.5px] font-semibold uppercase tracking-wide text-neutral-400">
                  Status
                </th>
                <th className="pb-2 pr-5 text-right text-[11.5px] font-semibold uppercase tracking-wide text-neutral-400">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {filtered.length === 0 ? (
                /* ---- empty state ---- */
                <tr>
                  <td colSpan={9} className="py-16 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <Search className="h-8 w-8 text-neutral-200" />
                      <p className="text-[14px] font-semibold text-neutral-400">
                        No vehicles match your search or filters
                      </p>
                      <button
                        onClick={clearFilters}
                        className="mt-1 text-[13px] font-medium text-blue-600 hover:underline"
                      >
                        Clear filters
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((v, idx) => (
                  <tr
                    key={v.id}
                    className={`group border-b border-neutral-50 transition-colors last:border-0 hover:bg-blue-50/40 ${
                      idx % 2 === 1 ? "bg-neutral-50/30" : ""
                    }`}
                  >
                    {/* Vehicle number + owner */}
                    <td className="py-3 pl-5">
                      <span className="font-semibold text-neutral-900">{v.id}</span>
                      <p className="text-[11px] text-neutral-400">{v.owner}</p>
                    </td>

                    {/* Manufacturer + model + year */}
                    <td className="py-3">
                      <p className="font-medium text-neutral-800">{v.model}</p>
                      <p className="text-[11px] text-neutral-400">
                        {v.manufacturer} · {v.year}
                      </p>
                    </td>

                    {/* Type */}
                    <td className="py-3 text-neutral-500">{v.type}</td>

                    {/* Health score with bar */}
                    <td className="py-3">
                      <HealthBar value={v.health} />
                    </td>

                    {/* Failure risk */}
                    <td className="py-3">
                      <span
                        className={`font-bold tabular-nums ${
                          v.failureRisk >= 50
                            ? "text-red-500"
                            : v.failureRisk >= 25
                            ? "text-amber-500"
                            : "text-emerald-600"
                        }`}
                      >
                        {v.failureRisk}%
                      </span>
                    </td>

                    {/* RUL */}
                    <td className="py-3 tabular-nums text-neutral-700">
                      {v.rul.toLocaleString()}
                    </td>

                    {/* Risk level badge */}
                    <td className="py-3">
                      <StatusBadge status={v.risk} />
                    </td>

                    {/* Status badge */}
                    <td className="py-3">
                      <StatusBadge status={v.status} />
                    </td>

                    {/* View button */}
                    <td className="py-3 pr-5 text-right">
                      <button
                        id={`fleet-view-${v.id.replace(/\s/g, "-")}`}
                        onClick={() => handleView(v.id)}
                        title={`View diagnostics — ${v.id}`}
                        className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 px-2.5 py-1.5 text-[12px] font-medium text-neutral-600 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table footer */}
        {filtered.length > 0 && (
          <div className="border-t border-neutral-100 px-5 py-3">
            <p className="text-[12px] text-neutral-400">
              Showing{" "}
              <span className="font-semibold text-neutral-700">{filtered.length}</span>
              {" "}of{" "}
              <span className="font-semibold text-neutral-700">{allFleetVehicles.length}</span>
              {" "}vehicles · sorted by{" "}
              <span className="font-semibold text-neutral-700">{sortKey}</span>
              {" "}({sortDir === "asc" ? "ascending" : "descending"})
            </p>
          </div>
        )}
      </div>

    </div>
  );
}
