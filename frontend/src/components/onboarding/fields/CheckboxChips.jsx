import { Check } from "lucide-react";
import FieldLabel from "./FieldLabel.jsx";

export default function CheckboxChips({
  label,
  required,
  optional,
  info,
  options = [],
  value = [],
  onChange,
  className = "",
}) {
  const toggle = (opt) => {
    if (value.includes(opt)) {
      onChange?.(value.filter((v) => v !== opt));
    } else {
      onChange?.([...value, opt]);
    }
  };

  return (
    <div className={className}>
      <FieldLabel label={label} required={required} optional={optional} info={info} />
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = value.includes(opt);
          return (
            <button
              key={opt}
              type="button"
              onClick={() => toggle(opt)}
              className={`flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium transition ${
                active
                  ? "border-blue-600 bg-blue-50 text-blue-700"
                  : "border-neutral-200 text-neutral-600 hover:border-blue-200"
              }`}
            >
              {active && <Check className="h-3.5 w-3.5" />}
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
