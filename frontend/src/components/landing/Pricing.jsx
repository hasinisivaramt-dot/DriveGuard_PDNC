import { Link } from "react-router-dom";
import { Check } from "lucide-react";

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container-page">
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-100 px-3 py-1 text-[12px] font-semibold text-gold-700">
            ✦ Pricing Plans
          </span>
          <h2 className="mt-4 text-[30px] font-extrabold text-neutral-900 sm:text-[34px]">
            Simple Plans for Smarter Vehicle Care
          </h2>
          <div className="mx-auto mt-3 h-[3px] w-14 rounded-full bg-gold-400" />
          <p className="mx-auto mt-4 max-w-md text-[15px] text-neutral-500">
            Select the tier that fits your needs. Start predictive vehicle health management today.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3 md:items-stretch max-w-5xl mx-auto">
          {/* Basic Tier */}
          <div className="flex flex-col justify-between rounded-2xl border border-neutral-100 bg-white p-8 shadow-card transition hover:shadow-glass">
            <div>
              <p className="text-[18px] font-bold text-neutral-900">Basic</p>
              <p className="mt-2 text-[13px] text-neutral-400">
                Essential diagnostic monitoring for individual vehicle owners.
              </p>
              <div className="mt-6">
                <span className="text-3xl font-extrabold text-neutral-900">Coming Soon</span>
              </div>
              <ul className="mt-8 space-y-4">
                {[
                  "Basic vehicle monitoring",
                  "Vehicle health overview",
                  "Maintenance history",
                ].map((feat) => (
                  <li key={feat} className="flex items-start gap-3">
                    <Check className="h-5 w-5 shrink-0 text-gold-500" strokeWidth={2.5} />
                    <span className="text-[14px] text-neutral-600">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8">
              <Link
                to="/register"
                className="block w-full rounded-lg border border-neutral-200 py-3 text-center text-sm font-semibold text-neutral-700 transition hover:border-maroon-300 hover:text-maroon-600"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Professional Tier (Recommended) */}
          <div className="relative flex flex-col justify-between rounded-2xl border-2 border-maroon-600 bg-white p-8 shadow-glass scale-105 z-10">
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-gold-500 px-4 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-sm">
              Recommended
            </span>
            <div>
              <p className="text-[18px] font-bold text-neutral-900">Professional</p>
              <p className="mt-2 text-[13px] text-neutral-400">
                Advanced AI insights and real-time failure prediction.
              </p>
              <div className="mt-6">
                <span className="text-3xl font-extrabold text-neutral-900">Coming Soon</span>
              </div>
              <ul className="mt-8 space-y-4">
                {[
                  "AI-powered predictions",
                  "Real-time monitoring",
                  "Advanced vehicle insights",
                  "Smart maintenance recommendations",
                ].map((feat) => (
                  <li key={feat} className="flex items-start gap-3">
                    <Check className="h-5 w-5 shrink-0 text-maroon-600" strokeWidth={2.5} />
                    <span className="text-[14px] text-neutral-600">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8">
              <Link
                to="/register"
                className="block w-full rounded-lg bg-maroon-600 py-3 text-center text-sm font-semibold text-white shadow-card transition hover:bg-maroon-700"
              >
                Get Started
              </Link>
            </div>
          </div>

          {/* Enterprise Tier */}
          <div className="flex flex-col justify-between rounded-2xl border border-neutral-100 bg-white p-8 shadow-card transition hover:shadow-glass">
            <div>
              <p className="text-[18px] font-bold text-neutral-900">Enterprise</p>
              <p className="mt-2 text-[13px] text-neutral-400">
                For commercial fleets requiring customized tools and support.
              </p>
              <div className="mt-6">
                <span className="text-3xl font-extrabold text-neutral-900">Contact Us</span>
              </div>
              <ul className="mt-8 space-y-4">
                {[
                  "Multi-vehicle support",
                  "Advanced analytics",
                  "Fleet monitoring",
                  "Custom support",
                ].map((feat) => (
                  <li key={feat} className="flex items-start gap-3">
                    <Check className="h-5 w-5 shrink-0 text-gold-500" strokeWidth={2.5} />
                    <span className="text-[14px] text-neutral-600">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-8">
              <a
                href="#contact"
                className="block w-full rounded-lg border border-neutral-200 py-3 text-center text-sm font-semibold text-neutral-700 transition hover:border-maroon-300 hover:text-maroon-600"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
