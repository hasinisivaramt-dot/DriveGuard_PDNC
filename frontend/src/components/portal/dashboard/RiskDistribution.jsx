import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { riskDistribution } from "../../../data/mockDashboard.js";

export default function RiskDistribution() {
  return (
    <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-card">
      <h3 className="text-[14.5px] font-bold text-neutral-900">Risk Distribution</h3>

      <div className="mt-2 flex items-center gap-4">
        <div className="h-[150px] w-[150px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={riskDistribution}
                dataKey="pct"
                nameKey="label"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={2}
                stroke="none"
              >
                {riskDistribution.map((entry) => (
                  <Cell key={entry.label} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex-1 space-y-3">
          {riskDistribution.map((r) => (
            <div key={r.label} className="flex items-center gap-2 text-[12.5px]">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: r.color }} />
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-neutral-800">
                  {r.label} <span className="font-bold">{r.pct}%</span>
                </p>
                <p className="text-[11px] text-neutral-400">({r.count} Vehicles)</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
