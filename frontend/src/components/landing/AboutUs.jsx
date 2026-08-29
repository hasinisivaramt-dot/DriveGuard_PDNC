import { Cpu, Activity, ShieldCheck } from "lucide-react";

export default function AboutUs() {
  return (
    <section id="about" className="bg-neutral-50 py-20">
      <div className="container-page">
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-100 px-3 py-1 text-[12px] font-semibold text-gold-700">
            ✦ Who We Are
          </span>
          <h2 className="mt-4 text-[30px] font-extrabold text-neutral-900 sm:text-[34px]">
            About DriveGuard AI
          </h2>
          <div className="mx-auto mt-3 h-[3px] w-14 rounded-full bg-gold-400" />
        </div>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-12">
          {/* Left Column: Purpose Description */}
          <div className="lg:col-span-5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-maroon-50 px-3 py-1 text-[12px] font-semibold text-maroon-700">
              ✦ Our Mission
            </span>
            <h3 className="mt-4 text-[24px] font-bold leading-tight text-neutral-900 sm:text-[28px]">
              Smarter Care for Your Vehicle
            </h3>
            <p className="mt-4 text-[15px] leading-relaxed text-neutral-500">
              DriveGuard AI is dedicated to helping vehicle owners monitor vehicle health, identify potential problems early, and make proactive maintenance decisions using AI and vehicle data.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-neutral-500">
              By combining real-time vehicle diagnostics with state-of-the-art machine learning algorithms, we transform complex telemetry data into actionable, easily understandable alerts and recommendations.
            </p>
          </div>

          {/* Right Column: Value Points */}
          <div className="space-y-6 lg:col-span-7">
            {[
              {
                icon: Cpu,
                title: "AI-Powered Insights",
                desc: "Harness predictive machine learning models to detect potential component anomalies and failure risks before they escalate.",
              },
              {
                icon: Activity,
                title: "Real-Time Vehicle Monitoring",
                desc: "Track critical vehicle telemetry, sensors, and diagnostic codes continuously to maintain complete visibility.",
              },
              {
                icon: ShieldCheck,
                title: "Proactive Maintenance",
                desc: "Get personalized, early recommendations to plan service visits efficiently, avoiding emergency repairs.",
              },
            ].map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex flex-col gap-4 rounded-2xl border border-neutral-100 bg-white p-6 shadow-card transition hover:shadow-glass sm:flex-row sm:items-start"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-maroon-50 text-maroon-600">
                  <Icon className="h-6 w-6" strokeWidth={1.8} />
                </div>
                <div>
                  <h4 className="text-[16px] font-bold text-neutral-900">
                    {title}
                  </h4>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-neutral-500">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
