import { ChevronDown } from "lucide-react";
import FieldLabel from "./FieldLabel.jsx";

export default function Dropdown({
  label,
  required,
  optional,
  info,
  value,
  onChange,
  options = [],
  placeholder = "Select",
  className = "",
}) {
  return (
    <div className={className}>
      <FieldLabel label={label} required={required} optional={optional} info={info} />
      <div className="relative">
        <select
          value={value ?? ""}
          onChange={(e) => onChange?.(e.target.value)}
          className={`w-full appearance-none rounded-lg border border-neutral-200 bg-white px-3.5 py-2.5 pr-9 text-[13.5px] outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 ${
            value ? "text-neutral-800" : "text-neutral-400"
          }`}
        >
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {options.map((opt) => {
            const optValue = typeof opt === "string" ? opt : opt.value;
            const optLabel = typeof opt === "string" ? opt : opt.label;
            return (
              <option key={optValue} value={optValue} className="text-neutral-800">
                {optLabel}
              </option>
            );
          })}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
      </div>
    </div>
  );
}
