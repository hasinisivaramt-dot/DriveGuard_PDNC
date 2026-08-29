import { Link } from "react-router-dom";
import { ArrowRight, CalendarClock, ShieldCheck } from "lucide-react";

function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[220px] rotate-3 rounded-[2.2rem] border-[6px] border-neutral-900 bg-neutral-900 shadow-2xl sm:w-[250px]">
      <div className="absolute left-1/2 top-0 h-5 w-24 -translate-x-1/2 rounded-b-xl bg-neutral-900" />
      <div className="overflow-hidden rounded-[1.7rem] bg-white">
        <div className="flex items-center justify-between px-4 pb-2 pt-4 text-[10px] font-semibold text-neutral-800">
          <span>9:41</span>
          <span className="flex items-center gap-1">
            <ShieldCheck className="h-3 w-3 text-maroon-600" /> DriveGuard AI
          </span>
        </div>

        <div className="space-y-3 px-4 pb-6">
          <div className="rounded-xl bg-neutral-50 p-3">
            <p className="text-[10px] font-semibold uppercase text-neutral-400">
              Overall Health
            </p>
            <p className="text-2xl font-extrabold text-emerald-600">82%</p>
          </div>
          <div className="rounded-xl bg-neutral-50 p-3">
            <p className="text-[10px] font-semibold uppercase text-neutral-400">
              Failure Risk
            </p>
            <p className="text-xl font-extrabold text-maroon-700">
              12% <span className="text-[10px] font-semibold text-emerald-600">Low Risk</span>
            </p>
          </div>
          <div className="rounded-xl bg-neutral-50 p-3">
            <p className="text-[10px] font-semibold uppercase text-neutral-400">
              Remaining Life
            </p>
            <p className="text-xl font-extrabold text-neutral-900">
              1,240 <span className="text-[10px] font-semibold text-neutral-400">km</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CTASection() {
  return (
    <section className="py-16">
      <div className="container-page">
        <div className="grid items-center gap-10 rounded-3xl border border-neutral-100 bg-neutral-50 px-8 py-12 lg:grid-cols-2 lg:px-14">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gold-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-gold-700">
              Smarter Decisions. Safer Journeys.
            </span>
            <h2 className="mt-4 text-[28px] font-extrabold leading-tight text-neutral-900 sm:text-[32px]">
              Take Control of Your Vehicle's Health Today
            </h2>
            <p className="mt-4 max-w-md text-[14.5px] leading-relaxed text-neutral-500">
              Join thousands of vehicle owners and fleet managers who trust
              DriveGuard AI for proactive maintenance.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link to="/register" className="flex items-center gap-2 rounded-lg bg-maroon-600 px-6 py-3 text-[14.5px] font-semibold text-white shadow-card transition hover:bg-maroon-700">
                Get Started Now <ArrowRight className="h-4 w-4" />
              </Link>
              <button className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-6 py-3 text-[14.5px] font-semibold text-neutral-700 transition hover:border-maroon-300 hover:text-maroon-600">
                <CalendarClock className="h-4 w-4" /> Schedule Demo
              </button>
            </div>
          </div>

          <PhoneMockup />
        </div>
      </div>
    </section>
  );
}
