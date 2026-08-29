import { Users, Car, TrendingUp, ShieldCheck, Clock } from "lucide-react";

// Placeholder marketing figures for the landing page only — once the
// evaluation notebook (Phase 6) produces real metrics, swap "98.6%
// Prediction Accuracy" for the measured ROC-AUC / accuracy of the best model.
const STATS = [
  { icon: Users, value: "1,500+", label: "Happy Users" },
  { icon: Car, value: "3,200+", label: "Vehicles Monitored" },
  { icon: TrendingUp, value: "98.6%", label: "Prediction Accuracy" },
  { icon: ShieldCheck, value: "35%", label: "Reduction in Downtime" },
  { icon: Clock, value: "24/7", label: "Real-time Monitoring" },
];

export default function StatsBar() {
  return (
    <section className="bg-maroon-600">
      <div className="container-page grid grid-cols-2 gap-y-8 py-12 text-center text-white sm:grid-cols-3 lg:grid-cols-5">
        {STATS.map(({ icon: Icon, value, label }) => (
          <div key={label} className="flex flex-col items-center gap-2">
            <Icon className="h-6 w-6 text-white/80" strokeWidth={1.8} />
            <p className="text-2xl font-extrabold sm:text-3xl">{value}</p>
            <p className="text-[12.5px] font-medium text-white/70">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
