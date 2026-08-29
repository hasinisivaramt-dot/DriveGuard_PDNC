import { Headset, Clock } from "lucide-react";

export default function WizardFooter({ progressPct }) {
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progressPct / 100);

  return (
    <footer className="border-t border-neutral-100 bg-white px-6 py-6 sm:px-10">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="flex items-center gap-3">
          <svg width="52" height="52" viewBox="0 0 52 52" className="shrink-0">
            <circle cx="26" cy="26" r={radius} fill="none" stroke="#eef0f2" strokeWidth="5" />
            <circle
              cx="26"
              cy="26"
              r={radius}
              fill="none"
              stroke="#2563eb"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              transform="rotate(-90 26 26)"
            />
            <text x="26" y="30" textAnchor="middle" className="fill-neutral-800 text-[11px] font-bold">
              {progressPct}%
            </text>
          </svg>
          <div>
            <p className="text-[13px] font-bold text-neutral-800">Progress</p>
            <p className="text-[11.5px] leading-snug text-neutral-500">
              You're doing great! Just a few more steps to complete your vehicle profile.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <Headset className="h-5 w-5" />
          </span>
          <div>
            <p className="text-[13px] font-bold text-neutral-800">Need Assistance?</p>
            <p className="text-[11.5px] text-neutral-500">
              Our support team is here to help you with any questions.
            </p>
            <a href="#" className="text-[11.5px] font-semibold text-blue-600 hover:underline">
              Contact Support →
            </a>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-500">
            <Clock className="h-5 w-5" />
          </span>
          <div>
            <p className="text-[13px] font-bold text-neutral-800">Estimated Time</p>
            <p className="text-[11.5px] leading-snug text-neutral-500">
              It will take about 8-10 minutes to complete the full registration process.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
