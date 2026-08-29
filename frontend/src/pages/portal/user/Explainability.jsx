import { useState } from "react";
import { Sparkles, TrendingUp, TrendingDown } from "lucide-react";
import PageHeader from "../../../components/portal/PageHeader.jsx";
import VehicleSelect from "../../../components/portal/VehicleSelect.jsx";
import { vehicleIds } from "../../../data/mockVehicles.js";
import { shapFactors } from "../../../data/mockUserPortal.js";

export default function Explainability() {
  const [vehicleId, setVehicleId] = useState(vehicleIds[0]);
  const maxAbs = Math.max(...shapFactors.map((f) => Math.abs(f.impact)));

  return (
    <div>
      <PageHeader
        title="Explainability (SHAP)"
        subtitle="Which factors are driving this vehicle's current prediction."
        action={<VehicleSelect value={vehicleId} onChange={setVehicleId} options={vehicleIds} />}
      />

      <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-card">
        <p className="flex items-center gap-2 text-[14.5px] font-bold text-neutral-900">
          <Sparkles className="h-4 w-4 text-blue-500" /> Feature Contribution to Failure Risk
        </p>
        <p className="mt-1 text-[12.5px] text-neutral-500">
          Bars pointing right increase predicted risk; bars pointing left reduce it. Magnitude reflects
          relative influence on {vehicleId}'s current prediction.
        </p>

        <div className="mt-5 space-y-4">
          {shapFactors.map((f) => {
            const pct = (Math.abs(f.impact) / maxAbs) * 100;
            const positive = f.impact > 0;
            return (
              <div key={f.feature}>
                <div className="flex items-center justify-between text-[13px]">
                  <span className="font-semibold text-neutral-800">{f.feature}</span>
                  <span
                    className={`flex items-center gap-1 text-[12px] font-semibold ${
                      positive ? "text-red-500" : "text-emerald-600"
                    }`}
                  >
                    {positive ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                    {f.impact > 0 ? "+" : ""}
                    {f.impact.toFixed(2)}
                  </span>
                </div>
                <div className="relative mt-1.5 h-2.5 w-full rounded-full bg-neutral-100">
                  <div
                    className={`absolute top-0 h-2.5 rounded-full ${positive ? "bg-red-500" : "bg-emerald-500"}`}
                    style={{
                      width: `${pct / 2}%`,
                      left: positive ? "50%" : `${50 - pct / 2}%`,
                    }}
                  />
                  <div className="absolute left-1/2 top-0 h-2.5 w-px bg-neutral-300" />
                </div>
                <p className="mt-1 text-[11.5px] text-neutral-400">{f.direction}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
        <p className="text-[13.5px] font-bold text-neutral-900">Plain-language summary</p>
        <p className="mt-1.5 text-[12.5px] leading-relaxed text-neutral-600">
          Engine temperature and vibration are the largest contributors pushing this vehicle's failure
          risk up, while healthy oil pressure and battery readings are partially offsetting that risk.
          The cooling system and engine mounts are the most useful places to start investigating.
        </p>
      </div>
    </div>
  );
}
