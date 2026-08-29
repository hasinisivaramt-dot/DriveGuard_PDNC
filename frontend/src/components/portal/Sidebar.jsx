import { NavLink } from "react-router-dom";
import {
  ShieldCheck,
  LayoutDashboard,
  Car,
  Database,
  LineChart,
  Sparkles,
  Wrench,
  History,
  Bell,
  FileText,
  Settings,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";

const NAV = [
  { to: "/portal/user", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/portal/user/vehicles", label: "My Vehicles", icon: Car },
  { to: "/portal/user/sensor-data", label: "Sensor Data", icon: Database },
  { to: "/portal/user/predictions", label: "Predictions", icon: LineChart },
  { to: "/portal/user/explainability", label: "Explainability", icon: Sparkles },
  { to: "/portal/user/maintenance", label: "Maintenance", icon: Wrench },
  { to: "/portal/user/history", label: "History", icon: History },
  { to: "/portal/user/alerts", label: "Alerts", icon: Bell },
  { to: "/portal/user/reports", label: "Reports", icon: FileText },
  { to: "/portal/user/settings", label: "Settings", icon: Settings },
];

export default function Sidebar({ open, onClose }) {
  const { user, logout } = useAuth();

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/30 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[260px] shrink-0 flex-col border-r border-neutral-100 bg-white transition-transform lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-[72px] items-center gap-2.5 border-b border-neutral-100 px-6">
          <ShieldCheck className="h-8 w-8 text-maroon-600" />
          <div>
            <p className="font-display text-[15px] font-bold text-neutral-900">
              DRIVEGUARD <span className="text-gold-500">AI</span>
            </p>
            <p className="text-[10px] font-medium text-neutral-400">
              Predict. Prevent. Protect.
            </p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13.5px] font-medium transition ${
                  isActive
                    ? "bg-blue-600 text-white shadow-sm"
                    : "text-neutral-600 hover:bg-neutral-50"
                }`
              }
            >
              <Icon className="h-[18px] w-[18px]" strokeWidth={1.9} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-neutral-100 p-3">
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition hover:bg-neutral-50"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-maroon-100 text-[13px] font-bold text-maroon-700">
              {user?.name?.[0]?.toUpperCase() ?? "U"}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[13px] font-semibold text-neutral-900">
                {user?.name}
              </span>
              <span className="block text-[11px] text-neutral-400">Vehicle Owner</span>
            </span>
            <ChevronDown className="h-4 w-4 text-neutral-400" />
          </button>
        </div>
      </aside>
    </>
  );
}
