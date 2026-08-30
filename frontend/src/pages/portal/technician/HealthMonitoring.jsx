import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { HeartPulse, ChevronRight } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from "recharts";
import { allFleetVehicles } from "../../../data/mockTechnician.js";
import StatusBadge from "../../../components/portal/dashboard/StatusBadge.jsx";

function healthColor(v) { return v >= 75 ? "#22c55e" : v >= 50 ? "#f59e0b" : "#ef4444"; }
function healthTextClass(v) { return v >= 75 ? "text-emerald-600" : v >= 50 ? "text-amber-500" : "text-red-500"; }

const TREND_MAP = {
  Critical: { label: "↓ Declining", cls: "text-red-500" },
  High:     { label: "↓ Declining", cls: "text-red-500" },
  Moderate: { label: "→ Stable",    cls: "text-amber-500" },
  Low:      { label: "↑ Healthy",   cls: "text-emerald-600" },
};

function HealthBar({ value }) {
  const color = healthColor(value);
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-20 overflow-hidden rounded-full bg-neutral-100">
        <div className="h-full rounded-full" style={{ width: `${value}%`, background: color }} />
      </div>
      <span className={`text-[12px] font-bold tabular-nums ${healthTextClass(value)}`}>{value}%</span>
    </div>
  );
}

export default function HealthMonitoring() {
  const navigate = useNavigate();
  const [riskFilter, setRiskFilter] = useState("All");

  const avgHealth  = Math.round(allFleetVehicles.reduce((s, v) => s + v.health, 0) / allFleetVehicles.length);
  const critical   = allFleetVehicles.filter((v) => v.risk === "Critical").length;
  const highRisk   = allFleetVehicles.filter((v) => v.risk === "High").length;
  const healthy    = allFleetVehicles.filter((v) => v.risk === "Low").length;

  const chartData = useMemo(() =>
    [...allFleetVehicles]
      .sort((a, b) => a.health - b.health)
      .map((v) => ({ id: v.id.split(" ").pop(), full: v.id, health: v.health, risk: v.risk })),
  []);

  const filtered = useMemo(() =>
    riskFilter === "All" ? allFleetVehicles : allFleetVehicles.filter((v) => v.risk === riskFilter),
  [riskFilter]);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <HeartPulse className="h-5 w-5 text-blue-600" />
        <div>
          <h2 className="text-[18px] font-bold text-neutral-900">Health Monitoring</h2>
          <p className="text-[13px] text-neutral-400">Real-time fleet-wide health scores and risk tracking.</p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Avg Fleet Health", value: `${avgHealth}%`, cls: healthTextClass(avgHealth) },
          { label: "Critical",         value: critical,         cls: "text-red-500"            },
          { label: "High Risk",        value: highRisk,         cls: "text-amber-500"          },
          { label: "Healthy (Low)",    value: healthy,          cls: "text-emerald-600"        },
        ].map(({ label, value, cls }) => (
          <div key={label} className="rounded-2xl border border-neutral-100 bg-white p-4 shadow-card">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-400">{label}</p>
            <p className={`mt-1 text-[26px] font-extrabold leading-none ${cls}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Fleet Health BarChart */}
      <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-card">
        <p className="text-[14px] font-bold text-neutral-900">Fleet Health Score Overview</p>
        <p className="mt-0.5 text-[11.5px] text-neutral-400">All 15 vehicles sorted by health score (lowest first).</p>
        <div className="mt-4 h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ left: -20, right: 8, bottom: 0 }}>
              <CartesianGrid vertical={false} stroke="#f1f2f4" />
              <XAxis dataKey="id" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "#9ca3af" }} />
              <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} tickLine={false} axisLine={false}
                tick={{ fontSize: 10, fill: "#9ca3af" }} />
              <Tooltip formatter={(v, n, p) => [`${v}% — ${p.payload.full}`, "Health"]}
                contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid #eee" }} />
              <Bar dataKey="health" radius={[4, 4, 0, 0]}>
                {chartData.map((d, i) => <Cell key={i} fill={healthColor(d.health)} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Filter + vehicle list */}
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-[13px] font-semibold text-neutral-700">Filter by Risk:</p>
        {["All", "Critical", "High", "Moderate", "Low"].map((r) => (
          <button key={r} onClick={() => setRiskFilter(r)}
            className={`rounded-lg border px-3 py-1.5 text-[12px] font-semibold transition ${
              riskFilter === r ? "border-blue-300 bg-blue-50 text-blue-700" : "border-neutral-200 text-neutral-500 hover:bg-neutral-50"
            }`}>
            {r}
          </button>
        ))}
        <span className="ml-auto text-[12px] text-neutral-400">{filtered.length} vehicle{filtered.length !== 1 ? "s" : ""}</span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] border-collapse text-[12.5px]">
            <thead>
              <tr className="border-b border-neutral-100 text-left text-[11px] uppercase tracking-wide text-neutral-400">
                {["Vehicle", "Owner", "Type", "Health Score", "Failure Risk", "RUL", "Risk Level", "Trend", "Action"].map((h) => (
                  <th key={h} className="px-4 py-3 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((v) => {
                const t = TREND_MAP[v.risk] || { label: "—", cls: "" };
                return (
                  <tr key={v.id} className={`border-b border-neutral-50 transition hover:bg-neutral-50/60 last:border-0 ${v.risk === "Critical" ? "bg-red-50/20" : ""}`}>
                    <td className="px-4 py-3">
                      <p className="font-bold text-neutral-900">{v.id}</p>
                      <p className="text-[11px] text-neutral-400">{v.manufacturer} {v.model}</p>
                    </td>
                    <td className="px-4 py-3 text-neutral-600">{v.owner}</td>
                    <td className="px-4 py-3 text-neutral-500">{v.type}</td>
                    <td className="px-4 py-3"><HealthBar value={v.health} /></td>
                    <td className="px-4 py-3">
                      <span className={`font-bold tabular-nums ${v.failureRisk >= 50 ? "text-red-500" : v.failureRisk >= 25 ? "text-amber-500" : "text-emerald-600"}`}>
                        {v.failureRisk}%
                      </span>
                    </td>
                    <td className="px-4 py-3 tabular-nums text-neutral-500">{v.rul.toLocaleString()} km</td>
                    <td className="px-4 py-3"><StatusBadge status={v.risk} /></td>
                    <td className={`px-4 py-3 text-[12px] font-semibold ${t.cls}`}>{t.label}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => navigate(`/portal/technician/diagnostics?vin=${encodeURIComponent(v.id)}`)}
                        className="inline-flex items-center gap-1 rounded-lg border border-blue-200 bg-blue-50 px-2.5 py-1.5 text-[11.5px] font-semibold text-blue-700 hover:bg-blue-100">
                        Diagnostics <ChevronRight className="h-3 w-3" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
