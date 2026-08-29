import { useState } from "react";
import { ChevronDown, Sparkles } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { vehicleOptions, vehicleDiagnostics } from "../../../../data/mockTechnician.js";
import VehicleThumb from "../VehicleThumb.jsx";
import StatusBadge from "../../dashboard/StatusBadge.jsx";

function MiniStat({ label, value, suffix, sparkline, color, valueClass }) {
  return (
    <div className="rounded-xl border border-neutral-100 p-3">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-400">{label}</p>
      <p className={`mt-1 text-[20px] font-extrabold leading-none ${valueClass}`}>
        {value}
        {suffix && <span className="ml-1 text-[12px] font-semibold text-neutral-400">{suffix}</span>}
      </p>
      {sparkline && (
        <div className="mt-1.5 h-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sparkline.map((v) => ({ v }))}>
              <Line type="monotone" dataKey="v" stroke={color} strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

export default function VehicleDiagnosticDetails() {
  const [selected, setSelected] = useState(vehicleOptions[3] || vehicleOptions[0]);
  const [open, setOpen] = useState(false);
  const data = vehicleDiagnostics[selected] || vehicleDiagnostics[vehicleOptions[3]];

  return (
    <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-[14.5px] font-bold text-neutral-900">Vehicle Diagnostic Details</h3>
        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2 text-[13px] font-medium text-neutral-700"
            >
              {selected} <ChevronDown className="h-3.5 w-3.5" />
            </button>
            {open && (
              <div className="absolute right-0 z-10 mt-1 w-44 rounded-lg border border-neutral-100 bg-white py-1 shadow-card">
                {vehicleOptions.map((v) => (
                  <button
                    key={v}
                    onClick={() => {
                      setSelected(v);
                      setOpen(false);
                    }}
                    className="block w-full px-3 py-1.5 text-left text-[12.5px] text-neutral-600 hover:bg-neutral-50"
                  >
                    {v}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-[13px] font-semibold text-white hover:bg-blue-700">
            <Sparkles className="h-3.5 w-3.5" /> Run New Analysis
          </button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-5 lg:grid-cols-[220px_1fr]">
        <div>
          <div className="flex items-center justify-center rounded-xl bg-neutral-50 p-4">
            <VehicleThumb className="h-24 w-full" />
          </div>
          <dl className="mt-3 space-y-1.5 text-[12.5px]">
            <div className="flex justify-between">
              <dt className="text-neutral-400">Model</dt>
              <dd className="font-semibold text-neutral-800">{data.model}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-neutral-400">Type</dt>
              <dd className="font-semibold text-neutral-800">{data.type}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-neutral-400">Year</dt>
              <dd className="font-semibold text-neutral-800">{data.year}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-neutral-400">Odometer</dt>
              <dd className="font-semibold text-neutral-800">{data.odometer}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-neutral-400">VIN</dt>
              <dd className="truncate font-semibold text-neutral-800">{data.vin}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-neutral-400">Owner</dt>
              <dd className="font-semibold text-neutral-800">{data.owner}</dd>
            </div>
          </dl>
          <button className="mt-3 w-full rounded-lg border border-neutral-200 py-2 text-[12.5px] font-semibold text-neutral-700 hover:bg-neutral-50">
            View Full Profile
          </button>
        </div>

        <div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <MiniStat
              label="Health Score"
              value={`${data.healthScore}%`}
              sparkline={data.healthSparkline}
              color="#ef4444"
              valueClass="text-red-500"
            />
            <MiniStat
              label="Failure Risk"
              value={`${data.failureRisk}%`}
              sparkline={data.healthSparkline.slice().reverse()}
              color="#ef4444"
              valueClass="text-red-500"
            />
            <MiniStat
              label="RUL (Remaining)"
              value={data.rul}
              suffix="km"
              sparkline={data.healthSparkline}
              color="#f59e0b"
              valueClass="text-neutral-900"
            />
            <div className="rounded-xl border border-neutral-100 p-3">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-400">Risk Level</p>
              <div className="mt-1.5">
                <StatusBadge status={data.riskLevel} className="text-[13px]" />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-[13px] font-bold text-neutral-900">Health Degradation Trend</p>
            <div className="mt-2 h-[190px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.degradationTrend} margin={{ left: -20, right: 10 }}>
                  <defs>
                    <linearGradient id="degradationFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity={0.2} />
                      <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="#f1f2f4" />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#9ca3af" }} />
                  <YAxis
                    domain={[0, 100]}
                    ticks={[0, 25, 50, 75, 100]}
                    tickFormatter={(v) => `${v}%`}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 11, fill: "#9ca3af" }}
                  />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #eee" }} />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#ef4444"
                    strokeWidth={2.5}
                    fill="url(#degradationFill)"
                    dot={{ r: 3, fill: "#ef4444", strokeWidth: 0 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
