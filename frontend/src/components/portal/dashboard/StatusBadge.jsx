const STYLES = {
  Good: "bg-emerald-50 text-emerald-600",
  Low: "bg-emerald-50 text-emerald-600",
  "Low Risk": "bg-emerald-50 text-emerald-600",
  Moderate: "bg-amber-50 text-amber-600",
  "Moderate Risk": "bg-amber-50 text-amber-600",
  High: "bg-red-50 text-red-600",
  "High Risk": "bg-red-50 text-red-600",
  Medium: "bg-amber-50 text-amber-600",
  Critical: "bg-red-100 text-red-700",
  "Critical Risk": "bg-red-100 text-red-700",
  "In Progress": "bg-blue-50 text-blue-600",
  Pending: "bg-neutral-100 text-neutral-600",
  // Vehicle status values used in Fleet Overview
  Active: "bg-emerald-50 text-emerald-600",
  "In Service": "bg-violet-50 text-violet-600",
  Offline: "bg-neutral-100 text-neutral-500",
};


export default function StatusBadge({ status, className = "" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${
        STYLES[status] || "bg-neutral-100 text-neutral-600"
      } ${className}`}
    >
      {status}
    </span>
  );
}
