import { useState, useRef, useEffect } from "react";
import { Calendar } from "lucide-react";
import FieldLabel from "./FieldLabel.jsx";
import CalendarPopover from "./CalendarPopover.jsx";

function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
}

export default function DateField({
  label,
  required,
  optional,
  info,
  value, // ISO string "YYYY-MM-DD" or null
  onChange,
  placeholder = "Select date",
  maxDate,
  minDate,
  className = "",
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

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
            {value ? formatDate(value) : placeholder}
          </span>
          <Calendar className="h-4 w-4 text-neutral-400" />
        </button>
        {open && (
          <div className="absolute left-0 top-full z-30 mt-1.5">
            <CalendarPopover
              value={value}
              maxDate={maxDate}
              minDate={minDate}
              onSelect={(date) => {
                const iso = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
                  date.getDate()
                ).padStart(2, "0")}`;
                onChange?.(iso);
                setOpen(false);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
