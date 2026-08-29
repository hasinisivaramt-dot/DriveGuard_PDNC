import { useState } from "react";
import { Info } from "lucide-react";

export default function FieldLabel({ label, required, optional, info }) {
  const [showInfo, setShowInfo] = useState(false);
  if (!label) return null;

  return (
    <div className="mb-1.5 flex items-center gap-1.5">
      <label className="text-[12.5px] font-semibold text-neutral-700">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
        {optional && <span className="ml-1 font-normal text-neutral-400">(Optional)</span>}
      </label>
      {info && (
        <span
          className="relative flex items-center"
          onMouseEnter={() => setShowInfo(true)}
          onMouseLeave={() => setShowInfo(false)}
        >
          <Info className="h-3.5 w-3.5 cursor-help text-neutral-300" />
          {showInfo && (
            <span className="absolute bottom-full left-1/2 z-20 mb-1.5 w-52 -translate-x-1/2 rounded-lg bg-neutral-800 px-2.5 py-1.5 text-[11px] leading-snug text-white shadow-lg">
              {info}
            </span>
          )}
        </span>
      )}
    </div>
  );
}
