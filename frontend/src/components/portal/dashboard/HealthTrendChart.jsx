import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { healthTrend } from "../../../data/mockDashboard.js";

const RANGES = ["Last 7 Days", "Last 30 Days", "Last 90 Days"];

export default function HealthTrendChart() {
  const [range, setRange] = useState(RANGES[0]);
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-card">
      <div className="flex items-center justify-between">
        <h3 className="text-[14.5px] font-bold text-neutral-900">Health Trend (Overall)</h3>
        <div className="relative">
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-1.5 rounded-lg border border-neutral-200 px-3 py-1.5 text-[12.5px] font-medium text-neutral-600"
          >
            {range} <ChevronDown className="h-3.5 w-3.5" />
          </button>
          {open && (
            <div className="absolute right-0 z-10 mt-1 w-40 rounded-lg border border-neutral-100 bg-white py-1 shadow-card">
              {RANGES.map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    setRange(r);
                    setOpen(false);
                  }}
                  className="block w-full px-3 py-1.5 text-left text-[12.5px] text-neutral-600 hover:bg-neutral-50"
                >
                  {r}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={healthTrend} margin={{ left: -20, right: 10 }}>
            <defs>
              <linearGradient id="healthFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22c55e" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#f1f2f4" />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: "#9ca3af" }}
            />
            <YAxis
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              tickFormatter={(v) => `${v}%`}
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: "#9ca3af" }}
            />
            <Tooltip
              contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #eee" }}
              formatter={(v) => [`${v}%`, "Health"]}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#16a34a"
              strokeWidth={2.5}
              fill="url(#healthFill)"
              dot={{ r: 3, fill: "#16a34a", strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
