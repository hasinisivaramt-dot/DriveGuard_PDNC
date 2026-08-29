import { Link } from "react-router-dom";
import { Car, TriangleAlert, HeartPulse, ClipboardList, Wrench, ArrowUp, ArrowDown, ArrowRight } from "lucide-react";
import { fleetStats } from "../../../../data/mockTechnician.js";

function Card({ children }) {
  return (
    <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-card">
      {children}
    </div>
  );
}

function Icon({ icon: Icon, bg, color }) {
  return (
    <span className={`flex h-11 w-11 items-center justify-center rounded-xl ${bg}`}>
      <Icon className={`h-5 w-5 ${color}`} />
    </span>
  );
}

function Change({ text, up, good }) {
  const positive = good;
  const Arrow = up ? ArrowUp : ArrowDown;
  return (
    <p className={`mt-2 flex items-center gap-1 text-[11.5px] font-medium ${positive ? "text-emerald-600" : "text-red-500"}`}>
      <Arrow className="h-3.5 w-3.5" /> {text}
    </p>
  );
}

export default function FleetStatCards() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
      <Card>
        <div className="flex items-center justify-between">
          <p className="text-[13.5px] font-semibold text-neutral-700">Total Vehicles</p>
          <Icon icon={Car} bg="bg-blue-50" color="text-blue-600" />
        </div>
        <p className="mt-3 text-[30px] font-extrabold leading-none text-neutral-900">
          {fleetStats.totalVehicles.value}
        </p>
        <p className="mt-1.5 text-[12px] text-neutral-400">{fleetStats.totalVehicles.label}</p>
        <Change text={fleetStats.totalVehicles.change} up={fleetStats.totalVehicles.up} good={fleetStats.totalVehicles.good} />
      </Card>

      <Card>
        <div className="flex items-center justify-between">
          <p className="text-[13.5px] font-semibold text-neutral-700">High Risk Vehicles</p>
          <Icon icon={TriangleAlert} bg="bg-red-50" color="text-red-500" />
        </div>
        <p className="mt-3 text-[30px] font-extrabold leading-none text-red-500">
          {fleetStats.highRiskVehicles.value}
        </p>
        <p className="mt-1.5 text-[12px] text-neutral-400">{fleetStats.highRiskVehicles.label}</p>
        <Change text={fleetStats.highRiskVehicles.change} up={fleetStats.highRiskVehicles.up} good={fleetStats.highRiskVehicles.good} />
      </Card>

      <Card>
        <div className="flex items-center justify-between">
          <p className="text-[13.5px] font-semibold text-neutral-700">Avg. Fleet Health</p>
          <Icon icon={HeartPulse} bg="bg-emerald-50" color="text-emerald-500" />
        </div>
        <p className="mt-3 text-[30px] font-extrabold leading-none text-neutral-900">
          {fleetStats.avgFleetHealth.value}%
        </p>
        <p className="mt-1.5 text-[12px] text-emerald-600">{fleetStats.avgFleetHealth.label}</p>
        <Change text={fleetStats.avgFleetHealth.change} up={fleetStats.avgFleetHealth.up} good={fleetStats.avgFleetHealth.good} />
      </Card>

      <Card>
        <div className="flex items-center justify-between">
          <p className="text-[13.5px] font-semibold text-neutral-700">Active Work Orders</p>
          <Icon icon={ClipboardList} bg="bg-violet-50" color="text-violet-600" />
        </div>
        <p className="mt-3 text-[30px] font-extrabold leading-none text-neutral-900">
          {fleetStats.activeWorkOrders.value}
        </p>
        <p className="mt-1.5 text-[12px] text-neutral-400">{fleetStats.activeWorkOrders.label}</p>
        <Change text={fleetStats.activeWorkOrders.change} up={fleetStats.activeWorkOrders.up} good={fleetStats.activeWorkOrders.good} />
      </Card>

      <Card>
        <div className="flex items-center justify-between">
          <p className="text-[13.5px] font-semibold text-neutral-700">Maintenance Due</p>
          <Icon icon={Wrench} bg="bg-amber-50" color="text-amber-600" />
        </div>
        <p className="mt-3 text-[30px] font-extrabold leading-none text-amber-500">
          {fleetStats.maintenanceDue.value}
        </p>
        <p className="mt-1.5 text-[12px] text-neutral-400">{fleetStats.maintenanceDue.label}</p>
        <Link
          to="/portal/technician/maintenance-tasks"
          className="mt-2 flex items-center gap-1 text-[11.5px] font-semibold text-amber-600 hover:underline"
        >
          View Schedule <ArrowRight className="h-3 w-3" />
        </Link>
      </Card>
    </div>
  );
}
