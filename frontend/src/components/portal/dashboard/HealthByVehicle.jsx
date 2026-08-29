import { Link } from "react-router-dom";
import { vehicles } from "../../../data/mockDashboard.js";
import StatusBadge from "./StatusBadge.jsx";

const BAR_COLOR = {
  Good: "bg-emerald-500",
  Moderate: "bg-amber-500",
  "High Risk": "bg-red-500",
};

export default function HealthByVehicle() {
  return (
    <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-card">
      <div className="flex items-center justify-between">
        <h3 className="text-[14.5px] font-bold text-neutral-900">Health by Vehicle</h3>
        <Link to="/portal/user/vehicles" className="text-[12.5px] font-semibold text-blue-600 hover:underline">
          View All
        </Link>
      </div>

      <div className="mt-4 space-y-4">
        {vehicles.map((v) => (
          <div key={v.id}>
            <div className="flex items-center justify-between text-[13px]">
              <div>
                <p className="font-bold text-neutral-900">{v.id}</p>
                <p className="text-[11.5px] text-neutral-400">{v.type}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[13px] font-bold text-neutral-800">{v.health}%</span>
                <StatusBadge status={v.status} />
              </div>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
              <div
                className={`h-full rounded-full ${BAR_COLOR[v.status] || "bg-neutral-400"}`}
                style={{ width: `${v.health}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
