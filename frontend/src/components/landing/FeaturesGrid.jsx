import {
  Cpu,
  Activity,
  TrendingUp,
  ShieldAlert,
  Wrench,
  ClipboardList,
} from "lucide-react";

const FEATURES = [
  {
    icon: Cpu,
    title: "AI-Powered Predictions",
    desc: "Advanced ML/DL models predict failures before they happen.",
  },
  {
    icon: Activity,
    title: "Real-Time Monitoring",
    desc: "Continuously analyze sensor data for real-time health insights.",
  },
  {
    icon: TrendingUp,
    title: "Remaining Useful Life (RUL)",
    desc: "Accurate RUL estimation to plan maintenance efficiently.",
  },
  {
    icon: ShieldAlert,
    title: "Risk Assessment",
    desc: "Get risk levels and alerts to avoid costly breakdowns.",
  },
  {
    icon: Wrench,
    title: "Smart Recommendations",
    desc: "AI-driven maintenance recommendations tailored to your vehicle.",
  },
  {
    icon: ClipboardList,
    title: "Maintenance History",
    desc: "Track and manage all maintenance activities in one place.",
  },
];

export default function FeaturesGrid() {
  return (
    <section id="features" className="bg-neutral-50 py-20">
      <div className="container-page">
        <div className="text-center">
          <h2 className="text-[30px] font-extrabold text-neutral-900 sm:text-[34px]">
            Everything You Need for Smarter Maintenance
          </h2>
          <div className="mx-auto mt-3 h-[3px] w-14 rounded-full bg-gold-400" />
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex flex-col items-center rounded-2xl border border-neutral-100 bg-white p-5 text-center shadow-card transition hover:-translate-y-1 hover:shadow-glass"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-maroon-50">
                <Icon className="h-6 w-6 text-maroon-600" strokeWidth={1.8} />
              </span>
              <h3 className="mt-4 text-[14px] font-bold text-neutral-900">
                {title}
              </h3>
              <p className="mt-2 text-[12.5px] leading-relaxed text-neutral-500">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
