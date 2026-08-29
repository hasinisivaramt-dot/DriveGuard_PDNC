import { useState, useRef, useEffect } from "react";
import { Calendar } from "lucide-react";
import FieldLabel from "./FieldLabel.jsx";

export default function YearField({
  label,
  required,
  optional,
  info,
  value,
  onChange,
  placeholder = "Select Year",
  fromYear = 1990,
  toYear = new Date().getFullYear() + 1,
  className = "",
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const years = [];
  for (let y = toYear; y >= fromYear; y--) years.push(y);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div className={className} ref={ref}>
      <FieldLabel label={label} required={required} optional={optional} info={info} />
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center justify-between rounded-lg border border-neutral-200 px-3.5 py-2.5 text-left text-[13.5px] outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
        >
          <span className={value ? "text-neutral-800" : "text-neutral-400"}>
            {value || placeholder}
          </span>
          <Calendar className="h-4 w-4 text-neutral-400" />
        </button>
        {open && (
          <div className="absolute left-0 top-full z-30 mt-1.5 max-h-56 w-40 overflow-y-auto rounded-xl border border-neutral-100 bg-white p-2 shadow-xl">
            <div className="grid grid-cols-3 gap-1">
              {years.map((y) => (
                <button
                  key={y}
                  type="button"
                  onClick={() => {
                    onChange?.(String(y));
                    setOpen(false);
                  }}
                  className={`rounded-md py-1.5 text-[12.5px] transition ${
                    String(y) === value
                      ? "bg-blue-600 font-semibold text-white"
                      : "text-neutral-700 hover:bg-blue-50"
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
