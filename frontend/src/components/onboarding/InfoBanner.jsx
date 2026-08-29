import { Info } from "lucide-react";
import VehicleThumb from "../portal/technician/VehicleThumb.jsx";

export default function InfoBanner({ title, text }) {
  return (
    <div className="flex items-center gap-5 rounded-2xl border border-blue-100 bg-blue-50/60 p-5">
      <div className="flex-1">
        <p className="flex items-center gap-2 text-[13.5px] font-bold text-neutral-900">
          <Info className="h-4 w-4 text-blue-500" /> {title}
        </p>
        <p className="mt-1.5 text-[12.5px] leading-relaxed text-neutral-600">{text}</p>
      </div>
      <VehicleThumb className="hidden h-16 w-32 shrink-0 sm:block" />
    </div>
  );
}
