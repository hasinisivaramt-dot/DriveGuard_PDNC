import { Plus, Minus } from "lucide-react";
import FieldLabel from "./FieldLabel.jsx";

export default function NumberStepper({
  label,
  required,
  optional,
  info,
  value,
  onChange,
  min = 0,
  max = 999,
  step = 1,
  placeholder,
  className = "",
}) {
  const numeric = value === "" || value === undefined || value === null ? null : Number(value);

  const clamp = (n) => Math.min(max, Math.max(min, n));

  const bump = (delta) => {
    const base = numeric ?? min - step;
    onChange?.(String(clamp(base + delta)));
  };

  return (
    <div className={className}>
      <FieldLabel label={label} required={required} optional={optional} info={info} />
      <div className="flex items-center rounded-lg border border-neutral-200 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100">
        <button
          type="button"
          onClick={() => bump(-step)}
          className="flex h-[42px] w-10 shrink-0 items-center justify-center rounded-l-lg text-neutral-500 transition hover:bg-neutral-50"
          aria-label="Decrease"
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <input
          type="number"
          value={value ?? ""}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          min={min}
          max={max}
          className="w-full border-x border-neutral-100 bg-transparent px-2 py-2.5 text-center text-[13.5px] text-neutral-800 outline-none placeholder:text-neutral-400 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        />
        <button
          type="button"
          onClick={() => bump(step)}
          className="flex h-[42px] w-10 shrink-0 items-center justify-center rounded-r-lg text-neutral-500 transition hover:bg-neutral-50"
          aria-label="Increase"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
