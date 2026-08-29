import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function daysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function startWeekday(year, month) {
  return new Date(year, month, 1).getDay();
}

export default function CalendarPopover({ value, onSelect, maxDate, minDate }) {
  const initial = value ? new Date(value) : new Date();
  const [viewYear, setViewYear] = useState(initial.getFullYear());
  const [viewMonth, setViewMonth] = useState(initial.getMonth());

  const total = daysInMonth(viewYear, viewMonth);
  const offset = startWeekday(viewYear, viewMonth);
  const cells = [...Array(offset).fill(null), ...Array.from({ length: total }, (_, i) => i + 1)];

  const goPrev = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else {
      setViewMonth((m) => m - 1);
    }
  };

  const goNext = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else {
      setViewMonth((m) => m + 1);
    }
  };

  const isDisabled = (day) => {
    const d = new Date(viewYear, viewMonth, day);
    if (maxDate && d > new Date(maxDate)) return true;
    if (minDate && d < new Date(minDate)) return true;
    return false;
  };

  const isSelected = (day) => {
    if (!value) return false;
    const d = new Date(value);
    return d.getFullYear() === viewYear && d.getMonth() === viewMonth && d.getDate() === day;
  };

  return (
    <div className="w-[260px] rounded-xl border border-neutral-100 bg-white p-3 shadow-xl">
      <div className="mb-2 flex items-center justify-between">
        <button
          type="button"
          onClick={goPrev}
          className="rounded-md p-1 text-neutral-500 hover:bg-neutral-50"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <p className="text-[13px] font-semibold text-neutral-800">
          {MONTH_NAMES[viewMonth]} {viewYear}
        </p>
        <button
          type="button"
          onClick={goNext}
          className="rounded-md p-1 text-neutral-500 hover:bg-neutral-50"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center">
        {WEEKDAYS.map((w, i) => (
          <span key={`${w}-${i}`} className="text-[10.5px] font-semibold text-neutral-400">
            {w}
          </span>
        ))}
        {cells.map((day, i) =>
          day === null ? (
            <span key={`blank-${i}`} />
          ) : (
            <button
              key={day}
              type="button"
              disabled={isDisabled(day)}
              onClick={() => onSelect(new Date(viewYear, viewMonth, day))}
              className={`rounded-md py-1.5 text-[12.5px] transition ${
                isSelected(day)
                  ? "bg-blue-600 font-semibold text-white"
                  : isDisabled(day)
                  ? "cursor-not-allowed text-neutral-300"
                  : "text-neutral-700 hover:bg-blue-50"
              }`}
            >
              {day}
            </button>
          )
        )}
      </div>
    </div>
  );
}
