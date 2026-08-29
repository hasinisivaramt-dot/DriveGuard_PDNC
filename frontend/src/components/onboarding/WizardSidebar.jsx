import { Check, ShieldCheck } from "lucide-react";
import { WIZARD_STEPS } from "../../data/onboardingSteps.js";

export default function WizardSidebar({ currentIndex, furthestIndex, onStepClick }) {
  return (
    <aside className="hidden w-[280px] shrink-0 border-r border-neutral-100 bg-white px-6 py-8 lg:block">
      <h2 className="text-[17px] font-bold text-neutral-900">Vehicle Registration</h2>
      <p className="mt-1 text-[12.5px] text-neutral-500">
        Complete all steps to create your vehicle profile
      </p>

      <ol className="mt-7 space-y-0">
        {WIZARD_STEPS.map((step, i) => {
          const isActive = i === currentIndex;
          const isDone = i < furthestIndex || (i <= furthestIndex && i < currentIndex);
          const clickable = i <= furthestIndex;
          return (
            <li key={step.key} className="relative flex gap-3 pb-7 last:pb-0">
              {i < WIZARD_STEPS.length - 1 && (
                <span className="absolute left-[15px] top-8 h-[calc(100%-1rem)] w-px bg-neutral-200" />
              )}
              <button
                type="button"
                disabled={!clickable}
                onClick={() => clickable && onStepClick(i)}
                className={`z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[12.5px] font-bold transition ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : isDone
                    ? "bg-blue-100 text-blue-600"
                    : "border border-neutral-200 bg-white text-neutral-400"
                } ${clickable ? "cursor-pointer" : "cursor-not-allowed"}`}
              >
                {isDone && !isActive ? <Check className="h-4 w-4" /> : i + 1}
              </button>
              <button
                type="button"
                disabled={!clickable}
                onClick={() => clickable && onStepClick(i)}
                className={`-mt-0.5 flex-1 rounded-lg px-2 py-1 text-left transition ${
                  isActive ? "bg-blue-50" : ""
                } ${clickable ? "cursor-pointer" : "cursor-not-allowed"}`}
              >
                <p className={`text-[13px] font-semibold ${isActive ? "text-blue-700" : "text-neutral-800"}`}>
                  {step.title}
                </p>
                <p className="mt-0.5 text-[11.5px] leading-snug text-neutral-400">{step.desc}</p>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="mt-8 rounded-xl border border-neutral-100 bg-neutral-50 p-4">
        <p className="flex items-center gap-2 text-[12.5px] font-bold text-neutral-800">
          <ShieldCheck className="h-4 w-4 text-blue-500" /> Your Data is Secure
        </p>
        <p className="mt-1.5 text-[11.5px] leading-relaxed text-neutral-500">
          We use industry-standard encryption to protect your personal and vehicle data.
        </p>
        <a href="#" className="mt-1.5 inline-block text-[11.5px] font-semibold text-blue-600 hover:underline">
          Privacy Policy
        </a>
      </div>
    </aside>
  );
}
