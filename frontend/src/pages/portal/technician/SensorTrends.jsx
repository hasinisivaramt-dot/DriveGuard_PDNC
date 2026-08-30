import { useState } from "react";
import { Activity, Car, ChevronDown } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { allFleetVehicles, allVehicleDiagnostics } from "../../../data/mockTechnician.js";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function buildChartData(trend) {
  return trend.map((v, i) => ({ day: DAYS[i % 7], value: typeof v === "number" ? v : v?.value ?? v }));
}

const SENSOR_META = {
  engineTemp: { label: "Engine Temperature", unit: "°C",   color: "#ef4444" },
  vibration:  { label: "Vibration Level",    unit: "mm/s", color: "#f59e0b" },
  oilPressure:{ label: "Oil Pressure",        unit: "psi",  color: "#3b82f6" },
  rpm:        { label: "RPM",                unit: "rpm",  color: "#8b5cf6" },
  battery:    { label: "Battery Health",      unit: "%",    color: "#22c55e" },
};

function SensorChart({ sensorKey, sensor }) {
  const meta  = SENSOR_META[sensorKey] || { label: sensorKey, unit: "", color: "#6b7280" };
  const data  = buildChartData(sensor.trend || []);
  const bad   = !sensor.statusOk;

  return (
    <div className={`rounded-2xl border p-4 ${bad ? "border-red-100 bg-red-50/30" : "border-neutral-100 bg-white"}`}>
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-[12px] font-bold text-neutral-700">{sensor.label || meta.label}</p>
        <span className={`text-[10.5px] font-semibold ${bad ? "text-red-500" : "text-emerald-600"}`}>
          {bad ? "⚠ Alert" : "✓ Normal"}
        </span>
      </div>
      <p className={`mt-1 text-[20px] font-extrabold ${bad ? "text-red-500" : "text-neutral-900"}`}>
        {typeof sensor.current === "number" && !Number.isInteger(sensor.current)
          ? sensor.current.toFixed(1) : typeof sensor.current === "number"
          ? sensor.current.toLocaleString() : sensor.current}
        <span className="ml-1 text-[12px] font-normal text-neutral-400">{sensor.unit || meta.unit}</span>
      </p>
      <p className="mt-0.5 text-[10.5px] text-neutral-400">Normal: {sensor.normalRange}</p>
      <div className="mt-3 h-[80px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ left: -20, right: 4 }}>
            <CartesianGrid vertical={false} stroke="#f1f2f4" />
            <XAxis dataKey="day" tickLine={false} axisLine={false} tick={{ fontSize: 9, fill: "#9ca3af" }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 9, fill: "#9ca3af" }} width={32} />
            <Tooltip contentStyle={{ fontSize: 11, borderRadius: 8, border: "1px solid #eee" }} />
            <Line type="monotone" dataKey="value" stroke={bad ? "#ef4444" : meta.color}
              strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function SensorTrends() {
  const [selectedId, setSelectedId] = useState(allFleetVehicles[0]?.id);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const vehicle = allFleetVehicles.find((v) => v.id === selectedId) ?? allFleetVehicles[0];
  const diag    = allVehicleDiagnostics[selectedId] ?? allVehicleDiagnostics[allFleetVehicles[0].id];
  const sensors = diag?.sensors ? Object.entries(diag.sensors) : [];
  const alertCount = sensors.filter(([, s]) => !s.statusOk).length;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-blue-600" />
          <div>
            <h2 className="text-[18px] font-bold text-neutral-900">Sensor Trends</h2>
            <p className="text-[13px] text-neutral-400">7-day live sensor readings for the selected vehicle.</p>
          </div>
        </div>

        {/* Vehicle selector */}
        <div className="relative">
          <button id="sensor-vehicle-selector" onClick={() => setDropdownOpen((v) => !v)}
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

      {/* Vehicle summary */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Vehicle",      value: vehicle.id,                cls: "text-[14px] text-neutral-900 truncate" },
          { label: "Health Score", value: `${vehicle.health}%`,      cls: `text-[22px] font-extrabold ${vehicle.health >= 75 ? "text-emerald-600" : vehicle.health >= 50 ? "text-amber-500" : "text-red-500"}` },
          { label: "Failure Risk", value: `${vehicle.failureRisk}%`, cls: `text-[22px] font-extrabold ${vehicle.failureRisk >= 50 ? "text-red-500" : vehicle.failureRisk >= 30 ? "text-amber-500" : "text-emerald-600"}` },
          { label: "Sensors Alert",value: `${alertCount} / ${sensors.length}`, cls: `text-[22px] font-extrabold ${alertCount > 0 ? "text-red-500" : "text-emerald-600"}` },
        ].map(({ label, value, cls }) => (
          <div key={label} className="rounded-2xl border border-neutral-100 bg-white p-4 shadow-card">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-400">{label}</p>
            <p className={`mt-1 leading-tight ${cls}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Sensor charts grid */}
      {sensors.length === 0 ? (
        <div className="py-16 text-center text-[13px] text-neutral-400">No sensor data for this vehicle.</div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {sensors.map(([key, sensor]) => (
            <SensorChart key={key} sensorKey={key} sensor={sensor} />
          ))}
        </div>
      )}
    </div>
  );
}
