import { UploadCloud, Database, Cpu, BarChart3, ShieldCheck } from "lucide-react";

const STEPS = [
  {
    icon: UploadCloud,
    title: "Upload Data",
    desc: "Upload your vehicle sensor data (CSV) securely.",
  },
  {
    icon: Database,
    title: "AI Analysis",
    desc: "Our AI models analyze sensor data and detect patterns.",
  },
  {
    icon: Cpu,
    title: "Predict & Evaluate",
    desc: "Predict failure risk, RUL, and overall vehicle health.",
  },
  {
    icon: BarChart3,
    title: "Explain & Assess",
    desc: "Understand key factors using explainable AI (SHAP).",
  },
  {
    icon: ShieldCheck,
    title: "Act & Maintain",
    desc: "Get recommendations and take proactive maintenance actions.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20">
      <div className="container-page">
        <div className="text-center">
          <h2 className="text-[30px] font-extrabold text-neutral-900 sm:text-[34px]">
            How DriveGuard AI Works
          </h2>
          <div className="mx-auto mt-3 h-[3px] w-14 rounded-full bg-gold-400" />
        </div>

        <div className="relative mt-14 grid grid-cols-2 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          <div className="pointer-events-none absolute left-[10%] right-[10%] top-8 hidden border-t-2 border-dashed border-gold-300 lg:block" />
          {STEPS.map(({ icon: Icon, title, desc }, i) => (
            <div key={title} className="relative flex flex-col items-center text-center">
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-neutral-100 bg-white shadow-card">
                <Icon className="h-6 w-6 text-maroon-600" strokeWidth={1.8} />
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gold-400 text-[10px] font-bold text-white">
                  {i + 1}
                </span>
              </div>
              <h3 className="mt-4 text-[14px] font-bold text-neutral-900">
                {title}
              </h3>
              <p className="mt-1.5 max-w-[150px] text-[12px] leading-relaxed text-neutral-500">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
