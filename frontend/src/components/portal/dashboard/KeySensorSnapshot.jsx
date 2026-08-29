import { Thermometer, Activity, Gauge, BatteryCharging, RotateCw } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { sensorSnapshot } from "../../../data/mockDashboard.js";

const ICONS = {
  engineTemp: Thermometer,
  vibration: Activity,
  oilPressure: Gauge,
  batteryHealth: BatteryCharging,
  rpm: RotateCw,
};

export default function KeySensorSnapshot() {
  return (
    <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-card">
      <h3 className="text-[14.5px] font-bold text-neutral-900">Key Sensor Snapshot</h3>

      <div className="mt-4 space-y-3.5">
        {sensorSnapshot.map((s) => {
          const Icon = ICONS[s.key];
          return (
            <div key={s.key} className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-2.5 text-[13px] text-neutral-600">
                <Icon className="h-4 w-4 text-neutral-400" strokeWidth={1.8} />
                {s.label}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-[13px] font-bold text-neutral-900">{s.value}</span>
                <div className="h-6 w-16">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={s.trend.map((v) => ({ v }))}>
                      <Line type="monotone" dataKey="v" stroke={s.color} strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-4 border-t border-neutral-100 pt-3 text-[11px] text-neutral-400">
        Last updated: 10:45 AM
      </p>
    </div>
  );
}
