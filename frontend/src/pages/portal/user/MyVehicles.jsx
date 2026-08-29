import { Plus, Gauge, Fuel, Calendar, ArrowRight } from "lucide-react";
import PageHeader from "../../../components/portal/PageHeader.jsx";
import StatusBadge from "../../../components/portal/dashboard/StatusBadge.jsx";
import VehicleThumb from "../../../components/portal/technician/VehicleThumb.jsx";
import { myVehicles } from "../../../data/mockVehicles.js";

const BAR_COLOR = { Good: "bg-emerald-500", Moderate: "bg-amber-500", "High Risk": "bg-red-500" };

export default function MyVehicles() {
  return (
    <div>
      <PageHeader
        title="My Vehicles"
        subtitle={`${myVehicles.length} vehicles registered to your account`}
        action={
          <button className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2.5 text-[13.5px] font-semibold text-white hover:bg-blue-700">
            <Plus className="h-4 w-4" /> Add Vehicle
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {myVehicles.map((v) => (
          <div key={v.id} className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[14.5px] font-bold text-neutral-900">{v.id}</p>
                <p className="text-[12px] text-neutral-400">{v.nickname}</p>
              </div>
              <StatusBadge status={v.status} />
            </div>

            <div className="mt-3 flex items-center justify-center rounded-xl bg-neutral-50 p-4">
              <VehicleThumb className="h-16 w-full" />
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div>
                <p className="text-[11px] font-medium text-neutral-400">Health</p>
                <p className="text-[15px] font-bold text-neutral-900">{v.health}%</p>
              </div>
              <div>
                <p className="text-[11px] font-medium text-neutral-400">Failure Risk</p>
                <p className="text-[15px] font-bold text-neutral-900">{v.failureRisk}%</p>
              </div>
              <div>
                <p className="text-[11px] font-medium text-neutral-400">RUL</p>
                <p className="text-[15px] font-bold text-neutral-900">{v.rul} km</p>
              </div>
            </div>

            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
              <div
                className={`h-full rounded-full ${BAR_COLOR[v.status] || "bg-neutral-400"}`}
                style={{ width: `${v.health}%` }}
              />
            </div>

            <div className="mt-4 space-y-1.5 border-t border-neutral-100 pt-3 text-[12px] text-neutral-500">
              <p className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" /> {v.manufacturer} {v.model} · {v.year}
              </p>
              <p className="flex items-center gap-1.5">
                <Fuel className="h-3.5 w-3.5" /> {v.fuelType} · {v.type}
              </p>
              <p className="flex items-center gap-1.5">
                <Gauge className="h-3.5 w-3.5" /> {v.odometer}
              </p>
            </div>

            <button className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg border border-neutral-200 py-2 text-[12.5px] font-semibold text-neutral-700 hover:bg-neutral-50">
              View Details <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
