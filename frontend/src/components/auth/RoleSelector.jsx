import { UserRound, Wrench, UserCog } from "lucide-react";
import { ROLES, ROLE_LABELS } from "../../lib/mockAuth.js";

const OPTIONS = [
  {
    role: ROLES.USER,
    icon: UserRound,
    desc: "Register vehicles, upload sensor data, view predictions.",
  },
  {
    role: ROLES.TECHNICIAN,
    icon: Wrench,
    desc: "Monitor fleets, review AI explanations, manage maintenance.",
  },
  {
    role: ROLES.ADMIN,
    icon: UserCog,
    desc: "Manage users, vehicles, and model performance.",
  },
];

export default function RoleSelector({ value, onChange }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
      {OPTIONS.map(({ role, icon: Icon, desc }) => {
        const active = value === role;
        return (
          <button
            key={role}
            type="button"
            onClick={() => onChange(role)}
            className={`flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition ${
              active
                ? "border-maroon-600 bg-maroon-50 ring-2 ring-maroon-200"
                : "border-neutral-200 bg-white hover:border-maroon-200"
            }`}
          >
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                active ? "bg-maroon-600 text-white" : "bg-neutral-100 text-neutral-500"
              }`}
            >
              <Icon className="h-5 w-5" />
            </span>
            <span className="text-[13.5px] font-bold text-neutral-900">
              {ROLE_LABELS[role]}
            </span>
            <span className="text-[11.5px] leading-snug text-neutral-500">{desc}</span>
          </button>
        );
      })}
    </div>
  );
}
