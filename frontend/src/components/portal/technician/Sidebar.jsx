import { NavLink } from "react-router-dom";
import {
  ShieldCheck,
  LayoutDashboard,
  Car,
  Stethoscope,
  TriangleAlert,
  ClipboardList,
  History,
  BarChart3,
  HeartPulse,
  Microscope,
  Sparkles,
  ListChecks,
  Boxes,
  FileText,
  UserCog,
  LogOut,
  Headset,
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext.jsx";

const GROUPS = [
  {
    label: "Main",
    items: [
      { to: "/portal/technician", label: "Technician Dashboard", icon: LayoutDashboard, end: true },
      { to: "/portal/technician/fleet-overview", label: "Fleet Overview", icon: Car },
      { to: "/portal/technician/diagnostics", label: "Vehicle Diagnostics", icon: Stethoscope },
      { to: "/portal/technician/high-risk", label: "High Risk Vehicles", icon: TriangleAlert },
      { to: "/portal/technician/work-orders", label: "Work Orders", icon: ClipboardList },
      { to: "/portal/technician/maintenance-history", label: "Maintenance History", icon: History },
    ],
  },
  {
    label: "Analytics",
    items: [
      { to: "/portal/technician/sensor-trends", label: "Sensor Trends", icon: BarChart3 },
      { to: "/portal/technician/health-monitoring", label: "Health Monitoring", icon: HeartPulse },
      { to: "/portal/technician/failure-analysis", label: "Failure Analysis", icon: Microscope },
      { to: "/portal/technician/explainability", label: "Explainability (SHAP)", icon: Sparkles },
    ],
  },
  {
    label: "Management",
    items: [
      { to: "/portal/technician/maintenance-tasks", label: "Maintenance Tasks", icon: ListChecks },
      { to: "/portal/technician/parts-inventory", label: "Parts & Inventory", icon: Boxes },
      { to: "/portal/technician/service-reports", label: "Service Reports", icon: FileText },
    ],
  },
];

export default function TechnicianSidebar({ open, onClose }) {
  const { logout } = useAuth();

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-30 bg-black/30 lg:hidden" onClick={onClose} />
      )}
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-[270px] shrink-0 flex-col border-r border-neutral-100 bg-white transition-transform lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-[72px] items-center gap-2.5 border-b border-neutral-100 px-6">
          <ShieldCheck className="h-8 w-8 text-maroon-600" />
          <div>
            <p className="font-display text-[15px] font-bold text-neutral-900">
              DRIVEGUARD <span className="text-gold-500">AI</span>
            </p>
            <p className="text-[10px] font-medium text-neutral-400">Technician Portal</p>
          </div>
        </div>

        <nav className="flex-1 space-y-5 overflow-y-auto px-3 py-4">
          {GROUPS.map((group) => (
            <div key={group.label}>
              <p className="px-3 pb-1.5 text-[10.5px] font-bold uppercase tracking-wider text-neutral-400">
                {group.label}
              </p>
              <div className="space-y-1">
                {group.items.map(({ to, label, icon: Icon, end }) => (
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
              </div>
            </div>
          ))}

          <div>
            <p className="px-3 pb-1.5 text-[10.5px] font-bold uppercase tracking-wider text-neutral-400">
              Settings
            </p>
            <div className="space-y-1">
              <NavLink
                to="/portal/technician/profile"
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13.5px] font-medium transition ${
                    isActive ? "bg-blue-600 text-white shadow-sm" : "text-neutral-600 hover:bg-neutral-50"
                  }`
                }
              >
                <UserCog className="h-[18px] w-[18px]" strokeWidth={1.9} />
                Profile Settings
              </NavLink>
              <button
                onClick={logout}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-[13.5px] font-medium text-neutral-600 transition hover:bg-neutral-50"
              >
                <LogOut className="h-[18px] w-[18px]" strokeWidth={1.9} />
                Logout
              </button>
            </div>
          </div>
        </nav>

        <div className="border-t border-neutral-100 p-3">
          <div className="flex items-start gap-2.5 rounded-xl bg-blue-50 p-3">
            <Headset className="h-5 w-5 shrink-0 text-blue-600" />
            <div className="text-[11.5px] leading-snug">
              <p className="font-bold text-neutral-800">Need Assistance?</p>
              <p className="text-neutral-500">Contact Support</p>
              <p className="font-medium text-blue-600">support@driveguard.ai</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
