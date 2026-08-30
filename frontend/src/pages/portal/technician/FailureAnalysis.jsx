import { useNavigate } from "react-router-dom";
import { AlertTriangle, ChevronRight } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell,
         PieChart, Pie, Legend } from "recharts";
import { allFleetVehicles } from "../../../data/mockTechnician.js";
import StatusBadge from "../../../components/portal/dashboard/StatusBadge.jsx";

function riskColor(v) { return v >= 60 ? "#ef4444" : v >= 40 ? "#f59e0b" : v >= 20 ? "#3b82f6" : "#22c55e"; }

const RISK_DIST = [
  { name: "Critical (≥60%)", value: 0, color: "#ef4444" },
  { name: "High (40–59%)",   value: 0, color: "#f59e0b" },
  { name: "Moderate (20–39%)",value: 0, color: "#3b82f6" },
  { name: "Low (<20%)",      value: 0, color: "#22c55e" },
];
allFleetVehicles.forEach((v) => {
  if (v.failureRisk >= 60) RISK_DIST[0].value++;
  else if (v.failureRisk >= 40) RISK_DIST[1].value++;
  else if (v.failureRisk >= 20) RISK_DIST[2].value++;
  else RISK_DIST[3].value++;
});

const barData = [...allFleetVehicles]
  .sort((a, b) => b.failureRisk - a.failureRisk)
  .slice(0, 10)
  .map((v) => ({ id: v.id.split(" ").pop(), full: v.id, risk: v.failureRisk }));

const CONFIDENCE = { Critical: "89–91%", High: "84–88%", Moderate: "76–82%", Low: "78–87%" };

export default function FailureAnalysis() {
  const navigate = useNavigate();

  const avgRisk   = Math.round(allFleetVehicles.reduce((s, v) => s + v.failureRisk, 0) / allFleetVehicles.length);
  const critical  = allFleetVehicles.filter((v) => v.failureRisk >= 60).length;
  const atRisk    = allFleetVehicles.filter((v) => v.failureRisk >= 40).length;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-5 w-5 text-red-500" />
        <div>
          <h2 className="text-[18px] font-bold text-neutral-900">Failure Analysis</h2>
          <p className="text-[13px] text-neutral-400">AI-powered failure risk predictions across the fleet.</p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Avg Failure Risk",    value: `${avgRisk}%`, cls: avgRisk >= 30 ? "text-amber-500" : "text-emerald-600" },
          { label: "Critical Risk (≥60%)", value: critical,     cls: "text-red-500"   },
          { label: "At Risk (≥40%)",       value: atRisk,       cls: "text-amber-500" },
          { label: "Fleet Size",           value: allFleetVehicles.length, cls: "text-neutral-900" },
        ].map(({ label, value, cls }) => (
          <div key={label} className="rounded-2xl border border-neutral-100 bg-white p-4 shadow-card">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-400">{label}</p>
            <p className={`mt-1 text-[26px] font-extrabold leading-none ${cls}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_300px]">
        {/* Bar chart — top 10 by risk */}
        <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-card">
          <p className="text-[14px] font-bold text-neutral-900">Top 10 Vehicles by Failure Risk</p>
          <p className="mt-0.5 text-[11.5px] text-neutral-400">Sorted highest to lowest failure probability.</p>
          <div className="mt-4 h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ left: -20, right: 8 }}>
                <CartesianGrid vertical={false} stroke="#f1f2f4" />
                <XAxis dataKey="id" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "#9ca3af" }} />
                <YAxis domain={[0, 100]} tickFormatter={(v) => `${v}%`} tickLine={false} axisLine={false}
                  tick={{ fontSize: 10, fill: "#9ca3af" }} />
                <Tooltip formatter={(v, n, p) => [`${v}% — ${p.payload.full}`, "Failure Risk"]}
                  contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid #eee" }} />
                <Bar dataKey="risk" radius={[4, 4, 0, 0]}>
                  {barData.map((d, i) => <Cell key={i} fill={riskColor(d.risk)} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie chart — risk distribution */}
        <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-card">
          <p className="text-[14px] font-bold text-neutral-900">Risk Distribution</p>
          <p className="mt-0.5 text-[11.5px] text-neutral-400">Fleet breakdown by risk band.</p>
          <div className="mt-4 h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={RISK_DIST} cx="50%" cy="50%" outerRadius={80} dataKey="value"
                  label={({ name, value }) => value > 0 ? `${value}` : ""} labelLine={false}>
                  {RISK_DIST.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid #eee" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Full prediction table */}
      <div className="overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-card">
        <div className="border-b border-neutral-100 px-5 py-3">
          <p className="text-[14px] font-bold text-neutral-900">Fleet Failure Prediction Table</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px] border-collapse text-[12.5px]">
            <thead>
              <tr className="border-b border-neutral-100 text-left text-[11px] uppercase tracking-wide text-neutral-400">
                {["Vehicle", "Type", "Health", "Failure Risk", "RUL", "Risk Level", "Model Confidence", "Action"].map((h) => (
                  <th key={h} className="px-4 py-3 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[...allFleetVehicles].sort((a, b) => b.failureRisk - a.failureRisk).map((v) => (
                <tr key={v.id} className={`border-b border-neutral-50 hover:bg-neutral-50/60 last:border-0 transition ${v.risk === "Critical" ? "bg-red-50/20" : ""}`}>
                  <td className="px-4 py-3">
                    <p className="font-bold text-neutral-900">{v.id}</p>
                    <p className="text-[11px] text-neutral-400">{v.manufacturer} {v.model}</p>
                  </td>
                  <td className="px-4 py-3 text-neutral-500">{v.type}</td>
                  <td className="px-4 py-3">
                    <span className={`font-bold ${v.health >= 75 ? "text-emerald-600" : v.health >= 50 ? "text-amber-500" : "text-red-500"}`}>{v.health}%</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-bold tabular-nums" style={{ color: riskColor(v.failureRisk) }}>{v.failureRisk}%</span>
                  </td>
                  <td className="px-4 py-3 tabular-nums text-neutral-500">{v.rul.toLocaleString()} km</td>
                  <td className="px-4 py-3"><StatusBadge status={v.risk} /></td>
                  <td className="px-4 py-3 text-neutral-500">{CONFIDENCE[v.risk]}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => navigate(`/portal/technician/diagnostics?vin=${encodeURIComponent(v.id)}`)}
                      className="inline-flex items-center gap-1 rounded-lg border border-blue-200 bg-blue-50 px-2.5 py-1.5 text-[11.5px] font-semibold text-blue-700 hover:bg-blue-100">
                      View <ChevronRight className="h-3 w-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
