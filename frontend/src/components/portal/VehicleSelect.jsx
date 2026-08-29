import { ChevronDown } from "lucide-react";

export default function VehicleSelect({ value, onChange, options }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none rounded-lg border border-neutral-200 bg-white py-2.5 pl-3.5 pr-9 text-[13.5px] font-medium text-neutral-800 outline-none focus:border-blue-400"
      >
        {options.map((id) => (
          <option key={id} value={id}>
            {id}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
    </div>
  );
}
