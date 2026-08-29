import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { fleetRiskDistribution, fleetStats } from "../../../../data/mockTechnician.js";

export default function FleetRiskDistribution() {
  return (
    <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-card">
      <h3 className="text-[14.5px] font-bold text-neutral-900">Risk Distribution</h3>

      <div className="relative mt-2 h-[190px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={fleetRiskDistribution}
              dataKey="pct"
              nameKey="label"
              innerRadius={58}
              outerRadius={88}
              paddingAngle={2}
              stroke="none"
            >
              {fleetRiskDistribution.map((entry) => (
                <Cell key={entry.label} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-[26px] font-extrabold leading-none text-neutral-900">
            {fleetStats.totalVehicles.value}
          </p>
          <p className="text-[11px] font-medium text-neutral-400">Total</p>
        </div>
      </div>

      <div className="mt-2 space-y-2.5">
        {fleetRiskDistribution.map((r) => (
          <div key={r.label} className="flex items-center gap-2 text-[12.5px]">
            <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ backgroundColor: r.color }} />
            <p className="flex-1 font-semibold text-neutral-800">{r.label}</p>
            <p className="text-neutral-500">{r.count} Vehicles ({r.pct}%)</p>
          </div>
        ))}
      </div>
    </div>
  );
}
