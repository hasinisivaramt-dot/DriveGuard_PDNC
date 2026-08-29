import { Link } from "react-router-dom";
import { ShieldCheck, Cpu, Activity, ShieldAlert } from "lucide-react";

const POINTS = [
  { icon: Cpu, text: "AI-powered failure prediction & RUL estimation" },
  { icon: Activity, text: "Real-time sensor health monitoring" },
  { icon: ShieldAlert, text: "Proactive maintenance recommendations" },
];

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-maroon-700 p-10 text-white lg:flex">
        <Link to="/" className="flex items-center gap-2.5">
          <ShieldCheck className="h-8 w-8 text-gold-400" />
          <div>
            <p className="font-display text-[17px] font-bold">
              DRIVEGUARD <span className="text-gold-400">AI</span>
            </p>
            <p className="text-[11px] font-medium text-white/60">
              Predict. Prevent. Protect.
            </p>
          </div>
        </Link>

        <div className="relative z-10">
          <h2 className="max-w-sm text-[28px] font-extrabold leading-tight">
            Predictive maintenance for every vehicle you're responsible for.
          </h2>
          <ul className="mt-8 space-y-4">
            {POINTS.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-[14px] text-white/85">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/10">
                  <Icon className="h-4 w-4 text-gold-400" />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>

        <p className="relative z-10 text-[12px] text-white/40">
          © {new Date().getFullYear()} DriveGuard AI. All rights reserved.
        </p>

        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold-400/10" />
        <div className="pointer-events-none absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-white/5" />
      </div>

      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <Link to="/" className="mb-8 flex items-center gap-2.5 lg:hidden">
            <ShieldCheck className="h-7 w-7 text-maroon-600" />
            <p className="font-display text-[16px] font-bold text-neutral-900">
              DRIVEGUARD <span className="text-gold-500">AI</span>
            </p>
          </Link>

          <h1 className="text-[26px] font-extrabold text-neutral-900">{title}</h1>
          {subtitle && (
            <p className="mt-1.5 text-[14px] text-neutral-500">{subtitle}</p>
          )}

          <div className="mt-7">{children}</div>
        </div>
      </div>
    </div>
  );
}
