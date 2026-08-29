import { useState } from "react";
import { HeartPulse, ShieldAlert, Hourglass, Sparkles } from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import PageHeader from "../../../components/portal/PageHeader.jsx";
import VehicleSelect from "../../../components/portal/VehicleSelect.jsx";
import StatusBadge from "../../../components/portal/dashboard/StatusBadge.jsx";
import { myVehicles, vehicleIds } from "../../../data/mockVehicles.js";
import { predictionHistory } from "../../../data/mockUserPortal.js";

export default function Predictions() {
  const [vehicleId, setVehicleId] = useState(vehicleIds[0]);
  const vehicle = myVehicles.find((v) => v.id === vehicleId);

  const chartData = predictionHistory.slice().reverse().map((p) => ({ date: p.date, health: p.health }));

  return (
    <div>
      <PageHeader
        title="Predictions"
        subtitle="Latest AI-predicted health, failure risk, and remaining useful life."
        action={<VehicleSelect value={vehicleId} onChange={setVehicleId} options={vehicleIds} />}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-card">
          <p className="flex items-center gap-2 text-[13px] font-semibold text-neutral-700">
            <HeartPulse className="h-4 w-4 text-emerald-500" /> Health Score
          </p>
          <p className="mt-2 text-[30px] font-extrabold text-neutral-900">{vehicle.health}%</p>
          <StatusBadge status={vehicle.status} className="mt-1" />
        </div>
        <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-card">
          <p className="flex items-center gap-2 text-[13px] font-semibold text-neutral-700">
            <ShieldAlert className="h-4 w-4 text-amber-500" /> Failure Risk
          </p>
          <p className="mt-2 text-[30px] font-extrabold text-amber-500">{vehicle.failureRisk}%</p>
          <StatusBadge status={vehicle.riskLevel} className="mt-1" />
        </div>
        <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-card">
          <p className="flex items-center gap-2 text-[13px] font-semibold text-neutral-700">
            <Hourglass className="h-4 w-4 text-blue-500" /> Remaining Useful Life
          </p>
          <p className="mt-2 text-[30px] font-extrabold text-blue-600">
            {vehicle.rul} <span className="text-[14px] font-semibold text-neutral-400">km</span>
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-neutral-100 bg-white p-5 shadow-card">
        <div className="flex items-center justify-between">
          <h3 className="text-[14.5px] font-bold text-neutral-900">Health Score History</h3>
          <button className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-[12.5px] font-semibold text-white hover:bg-blue-700">
            <Sparkles className="h-3.5 w-3.5" /> Run New Prediction
          </button>
        </div>
        <div className="mt-3 h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ left: -20, right: 10 }}>
              <defs>
                <linearGradient id="predFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563eb" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#2563eb" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#f1f2f4" />
              <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#9ca3af" }} />
              <YAxis domain={[0, 100]} tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: "#9ca3af" }} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #eee" }} />
              <Area type="monotone" dataKey="health" stroke="#2563eb" strokeWidth={2.5} fill="url(#predFill)" dot={{ r: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-neutral-100 bg-white p-5 shadow-card">
        <h3 className="text-[14.5px] font-bold text-neutral-900">Prediction History</h3>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-[13px]">
            <thead>
              <tr className="border-b border-neutral-100 text-left text-[11.5px] uppercase tracking-wide text-neutral-400">
                <th className="pb-2 font-semibold">Date</th>
                <th className="pb-2 font-semibold">Health</th>
                <th className="pb-2 font-semibold">Failure Risk</th>
                <th className="pb-2 font-semibold">RUL (km)</th>
                <th className="pb-2 font-semibold">Risk Level</th>
              </tr>
            </thead>
            <tbody>
              {predictionHistory.map((p) => (
                <tr key={p.date} className="border-b border-neutral-50 last:border-0">
                  <td className="py-2.5 font-semibold text-neutral-900">{p.date}</td>
                  <td className="py-2.5 text-neutral-600">{p.health}%</td>
                  <td className="py-2.5 text-neutral-600">{p.failureRisk}%</td>
                  <td className="py-2.5 text-neutral-600">{p.rul}</td>
                  <td className="py-2.5">
                    <StatusBadge status={p.risk} />
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
