import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Car, ChevronDown, ChevronRight, Info } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from "recharts";
import { allFleetVehicles, shapData } from "../../../data/mockTechnician.js";
import StatusBadge from "../../../components/portal/dashboard/StatusBadge.jsx";

const MAX_ABS = 0.42; // for consistent bar scaling

function barColor(c) { return c > 0 ? "#ef4444" : "#22c55e"; }

// Custom label at end of bar
function CustomBarLabel(props) {
  const { x, y, width, height, value } = props;
  const positive = value >= 0;
  const displayX = positive ? x + width + 4 : x + width - 4;
  return (
    <text x={displayX} y={y + height / 2 + 4} fill={barColor(value)} fontSize={10} fontWeight={600}
      textAnchor={positive ? "start" : "end"}>
      {positive ? `+${(value * 100).toFixed(0)}` : `${(value * 100).toFixed(0)}`}
    </text>
  );
}

export default function Explainability() {
  const navigate = useNavigate();
  const [selectedId, setSelectedId]   = useState(allFleetVehicles[0]?.id);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const vehicle = allFleetVehicles.find((v) => v.id === selectedId) ?? allFleetVehicles[0];
  const shap    = shapData[selectedId] ?? shapData[allFleetVehicles[0]?.id];

  const chartData = shap
    ? [...shap.features].sort((a, b) => Math.abs(b.contribution) - Math.abs(a.contribution))
    : [];

  const positiveFeatures = chartData.filter((f) => f.contribution > 0);
  const negativeFeatures = chartData.filter((f) => f.contribution < 0);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-blue-600" />
          <div>
            <h2 className="text-[18px] font-bold text-neutral-900">Explainability (SHAP)</h2>
            <p className="text-[13px] text-neutral-400">
              Feature-level explanation of the AI failure risk prediction for the selected vehicle.
            </p>
          </div>
        </div>

        {/* Vehicle selector */}
        <div className="relative">
          <button id="shap-vehicle-selector" onClick={() => setDropdownOpen((v) => !v)}
            className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-[13px] font-medium text-neutral-700 shadow-sm hover:border-blue-300">
            <Car className="h-4 w-4 text-neutral-400" />
            <span className="max-w-[160px] truncate">{selectedId}</span>
            <ChevronDown className="h-3.5 w-3.5 text-neutral-400" />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 z-20 mt-1 max-h-72 w-56 overflow-y-auto rounded-xl border border-neutral-100 bg-white py-1.5 shadow-lg">
              {allFleetVehicles.map((v) => (
                <button key={v.id} onClick={() => { setSelectedId(v.id); setDropdownOpen(false); }}
                  className={`block w-full px-4 py-2 text-left text-[12.5px] hover:bg-blue-50 ${v.id === selectedId ? "font-semibold text-blue-700" : "text-neutral-600"}`}>
                  <span className="block font-medium">{v.id}</span>
                  <span className="block text-[11px] text-neutral-400">{v.manufacturer} {v.model}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Prediction summary */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Failure Risk",      value: `${vehicle.failureRisk}%`, cls: vehicle.failureRisk >= 50 ? "text-red-500" : vehicle.failureRisk >= 25 ? "text-amber-500" : "text-emerald-600" },
          { label: "Health Score",      value: `${vehicle.health}%`,      cls: vehicle.health >= 75 ? "text-emerald-600" : vehicle.health >= 50 ? "text-amber-500" : "text-red-500" },
          { label: "Model Confidence",  value: shap ? `${Math.round(shap.confidence * 100)}%` : "—", cls: "text-blue-600" },
          { label: "Risk Level",        value: <StatusBadge status={vehicle.risk} className="text-[13px]" />, cls: "" },
        ].map(({ label, value, cls }) => (
          <div key={label} className="rounded-2xl border border-neutral-100 bg-white p-4 shadow-card">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-400">{label}</p>
            <div className={`mt-1 text-[22px] font-extrabold leading-tight ${cls}`}>{value}</div>
          </div>
        ))}
      </div>

      {/* Info banner */}
      <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
        <p className="text-[12.5px] text-blue-700">
          <strong>How to read this chart:</strong> Each bar shows how much a feature shifts the model&apos;s failure risk prediction.
          <span className="ml-1 font-semibold text-red-600">Red bars (positive)</span> increase failure risk.
          <span className="ml-1 font-semibold text-emerald-600">Green bars (negative)</span> decrease it.
          Longer bars = stronger influence.
        </p>
      </div>

      {/* SHAP horizontal bar chart */}
      {!shap ? (
        <div className="py-12 text-center text-[13px] text-neutral-400">No SHAP data available for this vehicle.</div>
      ) : (
        <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-card">
          <p className="text-[14px] font-bold text-neutral-900">SHAP Feature Contributions</p>
          <p className="mt-0.5 text-[11.5px] text-neutral-400">
            Sorted by absolute importance. Vehicle: <strong>{selectedId}</strong> — {vehicle.manufacturer} {vehicle.model}
          </p>
          <div className="mt-4" style={{ height: Math.max(200, chartData.length * 42) }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ left: 12, right: 48, top: 4, bottom: 4 }}>
                <CartesianGrid horizontal={false} stroke="#f1f2f4" />
                <XAxis type="number" domain={[-MAX_ABS, MAX_ABS]}
                  tickFormatter={(v) => v > 0 ? `+${(v * 100).toFixed(0)}` : `${(v * 100).toFixed(0)}`}
                  tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "#9ca3af" }} />
                <YAxis type="category" dataKey="name" width={130}
                  tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#374151" }} />
                <Tooltip
                  formatter={(v) => [`${v >= 0 ? "+" : ""}${(v * 100).toFixed(1)} pts`, "Contribution"]}
                  contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid #eee" }} />
                <Bar dataKey="contribution" radius={[0, 4, 4, 0]} label={<CustomBarLabel />}>
                  {chartData.map((d, i) => <Cell key={i} fill={barColor(d.contribution)} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Reference line at 0 */}
          <div className="mt-2 text-center text-[10.5px] text-neutral-400">
            ← Decreases failure risk &nbsp;&nbsp;|&nbsp;&nbsp; Increases failure risk →
          </div>
        </div>
      )}

      {/* Feature breakdown table */}
      {shap && (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          {/* Risk-increasing features */}
          <div className="rounded-2xl border border-red-100 bg-white p-5 shadow-card">
            <p className="text-[13px] font-bold text-red-600">Risk-Increasing Features ({positiveFeatures.length})</p>
            <p className="mt-0.5 text-[11.5px] text-neutral-400">These features are pushing failure probability higher.</p>
            <div className="mt-3 space-y-2">
              {positiveFeatures.length === 0
                ? <p className="text-[12.5px] text-neutral-400">None — all features are neutral or beneficial.</p>
                : positiveFeatures.map((f) => (
                  <div key={f.name} className="flex items-center justify-between rounded-lg bg-red-50 px-3 py-2">
                    <span className="text-[12.5px] font-medium text-neutral-800">{f.name}</span>
                    <span className="text-[12px] font-bold text-red-600">+{(f.contribution * 100).toFixed(1)} pts</span>
                  </div>
                ))
              }
            </div>
          </div>
          {/* Risk-decreasing features */}
          <div className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-card">
            <p className="text-[13px] font-bold text-emerald-700">Risk-Decreasing Features ({negativeFeatures.length})</p>
            <p className="mt-0.5 text-[11.5px] text-neutral-400">These features are helping keep failure risk lower.</p>
            <div className="mt-3 space-y-2">
              {negativeFeatures.length === 0
                ? <p className="text-[12.5px] text-neutral-400">None — all features contribute to increased risk.</p>
                : negativeFeatures.map((f) => (
                  <div key={f.name} className="flex items-center justify-between rounded-lg bg-emerald-50 px-3 py-2">
                    <span className="text-[12.5px] font-medium text-neutral-800">{f.name}</span>
                    <span className="text-[12px] font-bold text-emerald-600">{(f.contribution * 100).toFixed(1)} pts</span>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      )}

      {/* Navigate to diagnostics */}
      <div className="flex justify-end">
        <button onClick={() => navigate(`/portal/technician/diagnostics?vin=${encodeURIComponent(selectedId)}`)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-[13px] font-semibold text-white hover:bg-blue-700">
          Full Diagnostics for {selectedId} <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
