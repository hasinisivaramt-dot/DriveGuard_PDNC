import { useState } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import PageHeader from "../../../components/portal/PageHeader.jsx";
import VehicleSelect from "../../../components/portal/VehicleSelect.jsx";
import FileDropzone from "../../../components/onboarding/fields/FileDropzone.jsx";
import { vehicleIds } from "../../../data/mockVehicles.js";
import { sensorSeries, days7, recentSensorReadings } from "../../../data/mockUserPortal.js";

const CHARTS = [
  { key: "engineTemp", label: "Engine Temperature (°C)", color: "#ef4444" },
  { key: "vibration", label: "Vibration (mm/s)", color: "#f59e0b" },
  { key: "oilPressure", label: "Oil Pressure (psi)", color: "#22c55e" },
  { key: "rpm", label: "RPM", color: "#3b82f6" },
  { key: "battery", label: "Battery Health (%)", color: "#8b5cf6" },
];

export default function SensorData() {
  const [vehicle, setVehicle] = useState(vehicleIds[0]);
  const [file, setFile] = useState(null);
  const series = sensorSeries[vehicle] || sensorSeries[vehicleIds[0]];

  return (
    <div>
      <PageHeader
        title="Sensor Data"
        subtitle="Upload new readings or review recent sensor trends for a vehicle."
        action={<VehicleSelect value={vehicle} onChange={setVehicle} options={vehicleIds} />}
      />

      <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-card">
        <h3 className="text-[14.5px] font-bold text-neutral-900">Upload Sensor CSV</h3>
        <p className="mt-0.5 text-[12.5px] text-neutral-500">
          Adds new readings for {vehicle}. Expected columns: timestamp, engine_temp, vibration,
          oil_pressure, rpm, battery_health.
        </p>
        <div className="mt-4">
          <FileDropzone file={file} onChange={setFile} accept=".csv" hint="CSV up to 20MB" />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {CHARTS.map((c) => (
          <div key={c.key} className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-card">
            <h3 className="text-[13.5px] font-bold text-neutral-900">{c.label}</h3>
            <div className="mt-2 h-[150px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={days7.map((d, i) => ({ day: d, value: series[c.key][i] }))}
                  margin={{ left: -20, right: 10 }}
                >
                  <CartesianGrid vertical={false} stroke="#f1f2f4" />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "#9ca3af" }} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 10, fill: "#9ca3af" }} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #eee" }} />
                  <Line type="monotone" dataKey="value" stroke={c.color} strokeWidth={2.3} dot={{ r: 2.5 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-2xl border border-neutral-100 bg-white p-5 shadow-card">
        <h3 className="text-[14.5px] font-bold text-neutral-900">Recent Readings</h3>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse text-[13px]">
            <thead>
              <tr className="border-b border-neutral-100 text-left text-[11.5px] uppercase tracking-wide text-neutral-400">
                <th className="pb-2 font-semibold">Time</th>
                <th className="pb-2 font-semibold">Engine Temp</th>
                <th className="pb-2 font-semibold">Vibration</th>
                <th className="pb-2 font-semibold">Oil Pressure</th>
                <th className="pb-2 font-semibold">RPM</th>
                <th className="pb-2 font-semibold">Battery</th>
              </tr>
            </thead>
            <tbody>
              {recentSensorReadings.map((r) => (
                <tr key={r.time} className="border-b border-neutral-50 last:border-0">
                  <td className="py-2.5 font-medium text-neutral-800">{r.time}</td>
                  <td className="py-2.5 text-neutral-600">{r.engineTemp}</td>
                  <td className="py-2.5 text-neutral-600">{r.vibration}</td>
                  <td className="py-2.5 text-neutral-600">{r.oilPressure}</td>
                  <td className="py-2.5 text-neutral-600">{r.rpm}</td>
                  <td className="py-2.5 text-neutral-600">{r.battery}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
