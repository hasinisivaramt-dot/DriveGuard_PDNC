import { Construction } from "lucide-react";

export default function ComingSoon({ title, phaseNote }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-200 bg-white p-10 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-500">
        <Construction className="h-6 w-6" />
      </span>
      <h2 className="mt-4 text-[18px] font-bold text-neutral-900">{title}</h2>
      <p className="mt-2 max-w-sm text-[13.5px] text-neutral-500">
        {phaseNote || "This section is built in a later development phase."}
      </p>
    </div>
  );
}
