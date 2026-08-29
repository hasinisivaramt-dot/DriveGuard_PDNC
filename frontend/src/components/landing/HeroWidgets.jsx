import {
  LineChart,
  Line,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  Thermometer,
  Activity,
  Gauge,
  BatteryCharging,
  RotateCw,
} from "lucide-react";

// Sample dashboard values for the landing-page preview only — the live
// dashboard (Phase 9) reads these from /predictions in the API instead.
const trend = [
  { day: "May 05", value: 74 },
  { day: "May 12", value: 68 },
  { day: "May 19", value: 79 },
  { day: "May 26", value: 71 },
  { day: "Jun 02", value: 82 },
];

const riskSpark = [
  { v: 8 }, { v: 9 }, { v: 7 }, { v: 10 }, { v: 9 }, { v: 12 },
];

const rulBars = [
  { v: 30 }, { v: 45 }, { v: 38 }, { v: 60 }, { v: 52 }, { v: 70 }, { v: 65 },
];

const params = [
  { icon: Thermometer, label: "Engine Temp", value: "92°C" },
  { icon: Activity, label: "Vibration", value: "2.3 mm/s" },
  { icon: Gauge, label: "Oil Pressure", value: "45 psi" },
  { icon: BatteryCharging, label: "Battery Health", value: "89%" },
  { icon: RotateCw, label: "RPM", value: "2,450 rpm" },
];

function GlassCard({ children, className = "" }) {
  return (
    <div
      className={`rounded-xl border border-white/60 bg-white/85 p-3 shadow-glass backdrop-blur-md ${className}`}
    >
      {children}
    </div>
  );
}

function HealthGauge({ value = 82 }) {
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - value / 100);
  return (
    <svg viewBox="0 0 68 68" className="h-14 w-14 shrink-0">
      <circle cx="34" cy="34" r={radius} fill="none" stroke="#eef0f2" strokeWidth="7" />
      <circle
        cx="34"
        cy="34"
        r={radius}
        fill="none"
        stroke="#1f9d55"
        strokeWidth="7"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform="rotate(-90 34 34)"
      />
      <text x="34" y="32" textAnchor="middle" className="fill-neutral-900 text-[14px] font-bold">
        {value}%
      </text>
      <text x="34" y="43" textAnchor="middle" className="fill-emerald-600 text-[7px] font-semibold">
        Good
      </text>
    </svg>
  );
}

export default function HeroWidgets() {
  return (
    <div className="grid w-full max-w-[440px] grid-cols-3 gap-2.5">
      <GlassCard className="animate-float">
        <p className="text-[9.5px] font-semibold uppercase tracking-wide text-neutral-400">
          Vehicle Health
        </p>
        <div className="mt-1 flex items-center justify-center">
          <HealthGauge value={82} />
        </div>
        <span className="mt-1 flex items-center justify-center gap-1 text-[9.5px] font-semibold text-emerald-600">
          <TrendingUp className="h-3 w-3" /> +6%
        </span>
      </GlassCard>

      <GlassCard className="animate-float [animation-delay:0.4s]">
        <p className="text-[9.5px] font-semibold uppercase tracking-wide text-neutral-400">
          Failure Risk
        </p>
        <p className="mt-1 text-2xl font-bold text-maroon-700">12%</p>
        <p className="text-[10px] font-semibold text-emerald-600">Low Risk</p>
        <div className="mt-1 h-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={riskSpark}>
              <Line
                type="monotone"
                dataKey="v"
                stroke="#1f9d55"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      <GlassCard className="animate-float [animation-delay:0.8s]">
        <p className="text-[9.5px] font-semibold uppercase tracking-wide text-neutral-400">
          Remaining Life
        </p>
        <p className="mt-1 text-xl font-bold text-neutral-900">
          1,240 <span className="text-[10px] font-semibold text-neutral-400">km</span>
        </p>
        <p className="text-[9.5px] font-medium text-neutral-400">Est. RUL</p>
        <div className="mt-1 h-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={rulBars}>
              <Bar dataKey="v" fill="#7a1129" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      <GlassCard className="col-span-3 animate-float [animation-delay:0.2s]">
        <p className="text-[9.5px] font-semibold uppercase tracking-wide text-neutral-400">
          Health Trend
        </p>
        <div className="mt-1 h-12">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trend}>
              <Line
                type="monotone"
                dataKey="value"
                stroke="#7a1129"
                strokeWidth={2.5}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-1 flex justify-between text-[9px] font-medium text-neutral-400">
          {trend.map((t) => (
            <span key={t.day}>{t.day}</span>
          ))}
        </div>
      </GlassCard>

      <GlassCard className="col-span-3 animate-float [animation-delay:0.6s]">
        <p className="mb-1.5 text-[9.5px] font-semibold uppercase tracking-wide text-neutral-400">
          Key Parameters
        </p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
          {params.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center justify-between text-[11px]">
              <span className="flex items-center gap-1.5 text-neutral-500">
                <Icon className="h-3 w-3 text-maroon-500" /> {label}
              </span>
              <span className="font-semibold text-neutral-800">{value}</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
