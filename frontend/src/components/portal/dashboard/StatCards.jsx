import { HeartPulse, ShieldAlert, Hourglass, TriangleAlert, ArrowUp, ArrowDown } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, BarChart, Bar } from "recharts";
import { stats, healthTrend } from "../../../data/mockDashboard.js";

function Card({ children, className = "" }) {
  return (
    <div className={`rounded-2xl border border-neutral-100 bg-white p-5 shadow-card ${className}`}>
      {children}
    </div>
  );
}

function CardHeader({ icon: Icon, label, iconClass }) {
  return (
    <div className="flex items-center gap-2 text-[13.5px] font-semibold text-neutral-700">
      <Icon className={`h-4 w-4 ${iconClass}`} />
      {label}
    </div>
  );
}

function GaugeRing({ value, size = 64, stroke = 8, color = "#22c55e" }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - value / 100);
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#eef0f2" strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <HeartPulse
        x={size / 2 - 9}
        y={size / 2 - 9}
        width={18}
        height={18}
        color={color}
      />
    </svg>
  );
}

const rulBars = [40, 55, 48, 62, 58, 66, 60].map((v) => ({ v }));

export default function StatCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {/* Overall Vehicle Health */}
      <Card>
        <CardHeader icon={HeartPulse} label="Overall Vehicle Health" iconClass="text-emerald-500" />
        <div className="mt-3 flex items-center justify-between">
          <div>
            <p className="text-[32px] font-extrabold leading-none text-neutral-900">
              {stats.overallHealth.value}%
            </p>
            <span className="mt-2 inline-flex items-center gap-1 text-[12px] font-semibold text-emerald-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> {stats.overallHealth.label}
            </span>
          </div>
          <GaugeRing value={stats.overallHealth.value} color="#22c55e" />
        </div>
        <p className="mt-3 flex items-center gap-1 text-[11.5px] font-medium text-emerald-600">
          <ArrowUp className="h-3.5 w-3.5" /> {stats.overallHealth.change}
        </p>
      </Card>

      {/* Failure Risk */}
      <Card>
        <CardHeader icon={ShieldAlert} label="Failure Risk" iconClass="text-amber-500" />
        <div className="mt-3 flex items-center justify-between gap-2">
          <div>
            <p className="text-[32px] font-extrabold leading-none text-amber-500">
              {stats.failureRisk.value}%
            </p>
            <span className="mt-2 inline-flex items-center gap-1 text-[12px] font-semibold text-amber-600">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" /> {stats.failureRisk.label}
            </span>
          </div>
          <div className="h-12 w-24">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={healthTrend}>
                <Line type="monotone" dataKey="value" stroke="#f59e0b" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <p className="mt-3 flex items-center gap-1 text-[11.5px] font-medium text-emerald-600">
          <ArrowDown className="h-3.5 w-3.5" /> {stats.failureRisk.change}
        </p>
      </Card>

      {/* Remaining Useful Life */}
      <Card>
        <CardHeader icon={Hourglass} label="Remaining Useful Life" iconClass="text-blue-500" />
        <div className="mt-3 flex items-center justify-between gap-2">
          <div>
            <p className="text-[28px] font-extrabold leading-none text-blue-600">
              {stats.remainingLife.value} <span className="text-[15px] font-semibold text-neutral-400">{stats.remainingLife.unit}</span>
            </p>
            <span className="mt-2 block text-[12px] font-medium text-neutral-400">
              {stats.remainingLife.label}
            </span>
          </div>
          <div className="h-12 w-24">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={rulBars}>
                <Bar dataKey="v" fill="#bfdbfe" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>

      {/* Active Alerts */}
      <Card>
        <CardHeader icon={TriangleAlert} label="Active Alerts" iconClass="text-red-500" />
        <div className="mt-3 flex items-center justify-between">
          <div>
            <p className="text-[32px] font-extrabold leading-none text-red-500">
              {stats.activeAlerts.value}
            </p>
            <span className="mt-2 block text-[12px] font-medium text-neutral-400">
              {stats.activeAlerts.label}
            </span>
          </div>
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
            <TriangleAlert className="h-6 w-6 text-red-500" />
          </span>
        </div>
      </Card>
    </div>
  );
}
