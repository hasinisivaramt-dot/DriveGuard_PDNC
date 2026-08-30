import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ChevronDown,
  Sparkles,
  TriangleAlert,
  CheckCircle2,
  Car,
} from "lucide-react";
import {
  AreaChart, Area,
  LineChart, Line,
  XAxis, YAxis,
  CartesianGrid, Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  allFleetVehicles,
  allVehicleDiagnostics,
} from "../../../data/mockTechnician.js";
import VehicleThumb from "../../../components/portal/technician/VehicleThumb.jsx";
import StatusBadge from "../../../components/portal/dashboard/StatusBadge.jsx";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function healthColor(v) {
  return v >= 75 ? "#22c55e" : v >= 50 ? "#f59e0b" : "#ef4444";
}
function healthTextClass(v) {
  return v >= 75 ? "text-emerald-600" : v >= 50 ? "text-amber-500" : "text-red-500";
}
function riskTextClass(v) {
  return v <= 15 ? "text-emerald-600" : v <= 30 ? "text-amber-500" : "text-red-500";
}

// Mini sparkline stat card — mirrors MiniStat in VehicleDiagnosticDetails.jsx
function MiniStat({ label, value, suffix, sparkline, lineColor, valueClass }) {
  return (
    <div className="rounded-xl border border-neutral-100 bg-white p-3 shadow-sm">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-400">
        {label}
      </p>
      <p className={`mt-1 text-[20px] font-extrabold leading-none ${valueClass}`}>
        {value}
        {suffix && (
          <span className="ml-1 text-[12px] font-semibold text-neutral-400">
            {suffix}
          </span>
        )}
      </p>
      {sparkline && (
        <div className="mt-1.5 h-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sparkline.map((v) => ({ v }))}>
              <Line
                type="monotone"
                dataKey="v"
                stroke={lineColor}
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

// Sensor card with sparkline
function SensorCard({ sensor }) {
  const { label, unit, current, trend, normalRange, statusOk } = sensor;
  const lineColor = statusOk ? "#22c55e" : "#ef4444";
  const formattedCurrent =
    typeof current === "number" && !Number.isInteger(current)
      ? current.toFixed(1)
      : typeof current === "number"
      ? current.toLocaleString()
      : current;

  return (
    <div
      className={`rounded-xl border p-4 ${
        statusOk ? "border-neutral-100 bg-white" : "border-red-100 bg-red-50/40"
      }`}
    >
      <div className="flex items-start justify-between gap-1">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-400">
          {label}
        </p>
        <span
          className={`flex items-center gap-1 text-[10px] font-bold ${
            statusOk ? "text-emerald-600" : "text-red-500"
          }`}
        >
          {statusOk ? (
            <CheckCircle2 className="h-3 w-3" />
          ) : (
            <TriangleAlert className="h-3 w-3" />
          )}
          {statusOk ? "Normal" : "Alert"}
        </span>
      </div>
      <p
        className={`mt-1.5 text-[22px] font-extrabold leading-none ${
          statusOk ? "text-neutral-900" : "text-red-500"
        }`}
      >
        {formattedCurrent}
        <span className="ml-1 text-[12px] font-semibold text-neutral-400">
          {unit}
        </span>
      </p>
      <p className="mt-0.5 text-[10.5px] text-neutral-400">
        Normal: {normalRange}
      </p>
      <div className="mt-2 h-10">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={trend.map((v) => ({ v }))}>
            <Line
              type="monotone"
              dataKey="v"
              stroke={lineColor}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// Severity badge for alerts — distinct from StatusBadge risk levels
const SEVERITY_STYLES = {
  High:   "bg-red-50 text-red-600",
  Medium: "bg-amber-50 text-amber-600",
  Low:    "bg-emerald-50 text-emerald-600",
};
function SeverityBadge({ severity }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold ${
        SEVERITY_STYLES[severity] || "bg-neutral-100 text-neutral-600"
      }`}
    >
      {severity}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function VehicleDiagnostics() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Resolve selected vehicle — prefer URL param, fall back to first vehicle
  const vinParam = searchParams.get("vin");
  const resolvedVehicle =
    allFleetVehicles.find((v) => v.id === vinParam) ?? allFleetVehicles[0];
  const selectedId = resolvedVehicle.id;

  // Base identity from allFleetVehicles + rich diagnostic data
  const base = resolvedVehicle;
  const diag = allVehicleDiagnostics[selectedId] ?? allVehicleDiagnostics[allFleetVehicles[0].id];

  function selectVehicle(id) {
    setSearchParams({ vin: id });
    setDropdownOpen(false);
  }

  const hColor = healthColor(base.health);
  const sensorList = Object.values(diag.sensors);
  const alertCount = diag.alerts.filter((a) => a.severity === "High").length;

  // ---- action state -------------------------------------------------------
  // Toast notification: { message, type: 'success'|'info'|'error' }
  const [toast, setToast] = useState(null);
  const toastTimerRef = useRef(null);

  // Tracks which task IDs have had orders created (keyed per vehicle via reset below)
  const [createdOrders, setCreatedOrders] = useState(new Set());

  // Async flags
  const [analyzing, setAnalyzing] = useState(false);
  const [creatingAll, setCreatingAll] = useState(false);

  // Reset order state whenever the selected vehicle changes
  useEffect(() => {
    setCreatedOrders(new Set());
  }, [selectedId]);

  // Auto-dismiss toast after 3.5 s
  useEffect(() => {
    if (!toast) return;
    clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(toastTimerRef.current);
  }, [toast]);

  function showToast(message, type = "success") {
    setToast({ message, type });
  }

  // ---- handlers -----------------------------------------------------------
  async function handleRunAnalysis() {
    if (analyzing) return;
    setAnalyzing(true);
    // Simulate a 1.8 s analysis run
    await new Promise((resolve) => setTimeout(resolve, 1800));
    setAnalyzing(false);
    showToast("Analysis completed successfully.", "success");
  }

  function handleCreateOrder(taskId, taskLabel) {
    if (createdOrders.has(taskId)) return;  // prevent duplicate
    setCreatedOrders((prev) => new Set([...prev, taskId]));
    showToast(`Work order created: ${taskLabel}`, "success");
  }

  async function handleCreateAll() {
    const tasks = diag.actions.tasks;
    if (!tasks.length || creatingAll) return;
    const pending = tasks.filter((t) => !createdOrders.has(t.id));
    if (!pending.length) {
      showToast("All work orders are already created.", "info");
      return;
    }
    setCreatingAll(true);
    // Simulate brief processing delay
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setCreatedOrders(new Set(tasks.map((t) => t.id)));
    setCreatingAll(false);
    showToast(
      `${pending.length} work order${pending.length !== 1 ? "s" : ""} created successfully.`,
      "success"
    );
  }

  // ---- render ---------------------------------------------------------------
  return (
    <div className="space-y-4 sm:space-y-6">

      {/* ================================================================== */}
      {/* Header — breadcrumb, title, vehicle selector, run analysis          */}
      {/* ================================================================== */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          {/* Back navigation */}
          <button
            id="diag-back-fleet"
            onClick={() => navigate("/portal/technician/fleet-overview")}
            className="mb-2 flex items-center gap-1.5 text-[12.5px] font-medium text-neutral-400 transition hover:text-blue-600"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Fleet Overview
          </button>
          <h2 className="text-[18px] font-bold text-neutral-900">
            Vehicle Diagnostics
          </h2>
          <p className="mt-0.5 text-[13px] text-neutral-400">
            Full diagnostic report &amp; sensor analysis for the selected vehicle.
          </p>
        </div>

        {/* Vehicle selector + action */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Dropdown */}
          <div className="relative">
            <button
              id="diag-vehicle-selector"
              onClick={() => setDropdownOpen((v) => !v)}
              className="flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-[13px] font-medium text-neutral-700 shadow-sm hover:border-blue-300 hover:bg-blue-50/40"
            >
              <Car className="h-4 w-4 text-neutral-400" />
              <span className="max-w-[160px] truncate">{selectedId}</span>
              <ChevronDown className="h-3.5 w-3.5 text-neutral-400" />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 z-20 mt-1 max-h-72 w-56 overflow-y-auto rounded-xl border border-neutral-100 bg-white py-1.5 shadow-lg">
                {allFleetVehicles.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => selectVehicle(v.id)}
                    className={`block w-full px-4 py-2 text-left text-[12.5px] hover:bg-blue-50 ${
                      v.id === selectedId
                        ? "font-semibold text-blue-700"
                        : "text-neutral-600"
                    }`}
                  >
                    <span className="block font-medium">{v.id}</span>
                    <span className="block text-[11px] text-neutral-400">
                      {v.manufacturer} {v.model}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Run analysis */}
          <button
            id="diag-run-analysis"
            onClick={handleRunAnalysis}
            disabled={analyzing}
            className={`flex items-center gap-1.5 rounded-lg px-4 py-2 text-[13px] font-semibold text-white transition ${
              analyzing
                ? "cursor-not-allowed bg-blue-400"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {analyzing ? (
              <>
                {/* Inline CSS spinner — no extra deps */}
                <span
                  style={{
                    display: "inline-block",
                    width: 14,
                    height: 14,
                    border: "2px solid rgba(255,255,255,0.4)",
                    borderTopColor: "#fff",
                    borderRadius: "50%",
                    animation: "spin 0.7s linear infinite",
                  }}
                />
                Running Analysis…
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Run New Analysis
              </>
            )}
          </button>
        </div>
      </div>

      {/* ================================================================== */}
      {/* Row 1: Identity card + KPI stats + degradation trend               */}
      {/* ================================================================== */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[240px_1fr]">

        {/* ---- Identity card ---------------------------------------------- */}
        <div className="flex flex-col rounded-2xl border border-neutral-100 bg-white p-5 shadow-card">
          <div className="flex items-center justify-center rounded-xl bg-neutral-50 p-4">
            <VehicleThumb className="h-24 w-full" />
          </div>

          <div className="mt-3 flex items-center gap-2">
            <StatusBadge status={base.risk} />
            <StatusBadge status={base.status} />
          </div>

          <dl className="mt-3 space-y-1.5 text-[12.5px]">
            {[
              ["Vehicle No.", base.id],
              ["Model",       `${base.manufacturer} ${base.model}`],
              ["Type",        base.type],
              ["Year",        base.year],
              ["Odometer",    base.odometer],
              ["Owner",       base.owner],
              ["VIN",         diag.vin],
            ].map(([label, val]) => (
              <div key={label} className="flex items-baseline justify-between gap-2">
                <dt className="shrink-0 text-neutral-400">{label}</dt>
                <dd className="truncate text-right font-semibold text-neutral-800">
                  {val}
                </dd>
              </div>
            ))}
          </dl>

          {alertCount > 0 && (
            <p className="mt-4 flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-2 text-[12px] font-medium text-red-600">
              <TriangleAlert className="h-3.5 w-3.5 shrink-0" />
              {alertCount} active high-severity alert{alertCount !== 1 ? "s" : ""}
            </p>
          )}
        </div>

        {/* ---- Right column: KPIs + chart ---------------------------------- */}
        <div className="flex flex-col gap-4">

          {/* 4 KPI mini stats */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <MiniStat
              label="Health Score"
              value={`${base.health}%`}
              sparkline={diag.healthSparkline}
              lineColor={hColor}
              valueClass={healthTextClass(base.health)}
            />
            <MiniStat
              label="Failure Risk"
              value={`${base.failureRisk}%`}
              sparkline={diag.healthSparkline.slice().reverse()}
              lineColor={base.failureRisk >= 50 ? "#ef4444" : base.failureRisk >= 25 ? "#f59e0b" : "#22c55e"}
              valueClass={riskTextClass(base.failureRisk)}
            />
            <MiniStat
              label="RUL Remaining"
              value={base.rul.toLocaleString()}
              suffix="km"
              sparkline={diag.healthSparkline}
              lineColor="#f59e0b"
              valueClass="text-neutral-900"
            />
            <div className="rounded-xl border border-neutral-100 bg-white p-3 shadow-sm">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-400">
                Risk Level
              </p>
              <div className="mt-2">
                <StatusBadge status={base.risk} className="text-[13px]" />
              </div>
            </div>
          </div>

          {/* Health degradation area chart — same pattern as VehicleDiagnosticDetails */}
          <div className="flex-1 rounded-2xl border border-neutral-100 bg-white p-5 shadow-card">
            <p className="text-[13px] font-bold text-neutral-900">
              Health Degradation Trend
            </p>
            <p className="mt-0.5 text-[11.5px] text-neutral-400">
              7-day health score history for {base.id}
            </p>
            <div className="mt-3 h-[160px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={diag.degradationTrend}
                  margin={{ left: -20, right: 10 }}
                >
                  <defs>
                    <linearGradient id={`hFill-${selectedId}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%"   stopColor={hColor} stopOpacity={0.2} />
                      <stop offset="100%" stopColor={hColor} stopOpacity={0}   />
                    </linearGradient>
                  </defs>
                  <CartesianGrid vertical={false} stroke="#f1f2f4" />
                  <XAxis
                    dataKey="day"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 11, fill: "#9ca3af" }}
                  />
                  <YAxis
                    domain={[0, 100]}
                    ticks={[0, 25, 50, 75, 100]}
                    tickFormatter={(v) => `${v}%`}
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 11, fill: "#9ca3af" }}
                  />
                  <Tooltip
                    formatter={(v) => [`${v}%`, "Health"]}
                    contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #eee" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={hColor}
                    strokeWidth={2.5}
                    fill={`url(#hFill-${selectedId})`}
                    dot={{ r: 3, fill: hColor, strokeWidth: 0 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* ================================================================== */}
      {/* Row 2: Live sensor readings                                         */}
      {/* ================================================================== */}
      <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-card">
        <div className="flex items-baseline justify-between gap-2">
          <p className="text-[14px] font-bold text-neutral-900">
            Live Sensor Readings
          </p>
          <span className="text-[12px] text-neutral-400">
            {sensorList.filter((s) => !s.statusOk).length} sensor
            {sensorList.filter((s) => !s.statusOk).length !== 1 ? "s" : ""} out of range
          </span>
        </div>
        <p className="mt-0.5 text-[11.5px] text-neutral-400">
          Current values with 7-day trend. Red border = outside normal range.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
          {sensorList.map((sensor) => (
            <SensorCard key={sensor.label} sensor={sensor} />
          ))}
        </div>
      </div>

      {/* ================================================================== */}
      {/* Row 3: Recent Alerts + Recommended Actions                          */}
      {/* ================================================================== */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_1.1fr]">

        {/* ---- Recent alerts ----------------------------------------------- */}
        <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-card">
          <div className="flex items-baseline justify-between gap-2">
            <p className="text-[14px] font-bold text-neutral-900">Recent Alerts</p>
            <span className="text-[12px] text-neutral-400">
              {diag.alerts.length} alert{diag.alerts.length !== 1 ? "s" : ""}
            </span>
          </div>

          {diag.alerts.length === 0 ? (
            <div className="mt-6 flex flex-col items-center gap-2 py-6">
              <CheckCircle2 className="h-8 w-8 text-emerald-400" />
              <p className="text-[13px] font-semibold text-neutral-400">
                No active alerts
              </p>
              <p className="text-[12px] text-neutral-300">
                All systems operating within normal range
              </p>
            </div>
          ) : (
            <div className="mt-3 space-y-2">
              {diag.alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`flex items-start gap-3 rounded-lg px-3 py-2.5 ${
                    alert.severity === "High"
                      ? "bg-red-50"
                      : alert.severity === "Medium"
                      ? "bg-amber-50"
                      : "bg-neutral-50"
                  }`}
                >
                  <TriangleAlert
                    className={`mt-0.5 h-4 w-4 shrink-0 ${
                      alert.severity === "High"
                        ? "text-red-500"
                        : alert.severity === "Medium"
                        ? "text-amber-500"
                        : "text-neutral-400"
                    }`}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-[12.5px] font-semibold text-neutral-800">
                      {alert.title}
                    </p>
                    <p className="mt-0.5 text-[11px] text-neutral-400">
                      {alert.datetime}
                    </p>
                  </div>
                  <SeverityBadge severity={alert.severity} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ---- Recommended actions ----------------------------------------- */}
        <div className="flex flex-col rounded-2xl border border-neutral-100 bg-white p-5 shadow-card">
          <p className="text-[14px] font-bold text-neutral-900">
            Recommended Actions
          </p>

          {/* Banner */}
          <p
            className={`mt-3 flex items-center gap-2 rounded-lg px-3 py-2.5 text-[12.5px] font-medium ${
              base.risk === "Critical" || base.risk === "High"
                ? "bg-red-50 text-red-600"
                : base.risk === "Moderate"
                ? "bg-amber-50 text-amber-700"
                : "bg-emerald-50 text-emerald-700"
            }`}
          >
            <TriangleAlert className="h-4 w-4 shrink-0" />
            {diag.actions.banner}
          </p>

          {/* Tasks table */}
          <div className="mt-4 flex-1 overflow-x-auto">
            <table className="w-full min-w-[380px] border-collapse text-[12.5px]">
              <thead>
                <tr className="border-b border-neutral-100 text-left text-[11px] uppercase tracking-wide text-neutral-400">
                  <th className="pb-2 font-semibold">Task</th>
                  <th className="pb-2 font-semibold">Priority</th>
                  <th className="pb-2 font-semibold">Est. Time</th>
                  <th className="pb-2 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {diag.actions.tasks.map((t) => (
                  <tr key={t.id} className="border-b border-neutral-50 last:border-0">
                    <td className="py-2.5 font-medium text-neutral-800">
                      {t.task}
                    </td>
                    <td className="py-2.5">
                      <StatusBadge status={t.priority} />
                    </td>
                    <td className="py-2.5 tabular-nums text-neutral-500">
                      {t.eta}
                    </td>
                    <td className="py-2.5">
                      {createdOrders.has(t.id) ? (
                        <span
                          id={`diag-order-${t.id}`}
                          className="inline-flex items-center gap-1 rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11.5px] font-semibold text-emerald-600"
                        >
                          <CheckCircle2 className="h-3 w-3" />
                          Created
                        </span>
                      ) : (
                        <button
                          id={`diag-order-${t.id}`}
                          onClick={() => handleCreateOrder(t.id, t.task)}
                          className="rounded-md border border-blue-200 px-2.5 py-1 text-[11.5px] font-semibold text-blue-600 hover:bg-blue-50"
                        >
                          Create Order
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Create all orders CTA */}
          {(() => {
            const tasks = diag.actions.tasks;
            const allDone = tasks.length > 0 && tasks.every((t) => createdOrders.has(t.id));
            const pendingCount = tasks.filter((t) => !createdOrders.has(t.id)).length;
            return (
              <button
                id="diag-create-all-orders"
                onClick={handleCreateAll}
                disabled={creatingAll || allDone || tasks.length === 0}
                className={`mt-4 w-full rounded-lg py-2.5 text-[13.5px] font-semibold text-white transition ${
                  allDone
                    ? "cursor-default bg-emerald-500"
                    : creatingAll
                    ? "cursor-not-allowed bg-maroon-500 opacity-70"
                    : tasks.length === 0
                    ? "cursor-not-allowed bg-neutral-300"
                    : "bg-maroon-700 hover:bg-maroon-800"
                }`}
              >
                {creatingAll ? (
                  <span className="flex items-center justify-center gap-2">
                    <span
                      style={{
                        display: "inline-block",
                        width: 14,
                        height: 14,
                        border: "2px solid rgba(255,255,255,0.4)",
                        borderTopColor: "#fff",
                        borderRadius: "50%",
                        animation: "spin 0.7s linear infinite",
                      }}
                    />
                    Creating Orders…
                  </span>
                ) : allDone ? (
                  <span className="flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4" />
                    All Work Orders Created
                  </span>
                ) : tasks.length === 0 ? (
                  "No Tasks to Order"
                ) : (
                  `Create Work Order${pendingCount !== 1 ? "s" : ""} for ${
                    pendingCount < tasks.length
                      ? `Remaining ${pendingCount} Task${pendingCount !== 1 ? "s" : ""}`
                      : "All Tasks"
                  }`
                )}
              </button>
            );
          })()}
        </div>
      </div>

      {/* ================================================================== */}
      {/* Toast notification (bottom-right, auto-dismisses)                   */}
      {/* ================================================================== */}
      {/* Spinner keyframe — injected once via a <style> tag */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

      {toast && (
        <div
          role="alert"
          aria-live="polite"
          style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999 }}
          className={`flex max-w-sm items-start gap-3 rounded-xl border px-4 py-3 shadow-lg transition-all ${
            toast.type === "success"
              ? "border-emerald-200 bg-white text-emerald-700"
              : toast.type === "error"
              ? "border-red-200 bg-white text-red-600"
              : "border-blue-200 bg-white text-blue-700"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
          ) : toast.type === "error" ? (
            <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
          ) : (
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-blue-500" />
          )}
          <p className="text-[13px] font-medium leading-snug">{toast.message}</p>
          <button
            onClick={() => setToast(null)}
            className="ml-auto shrink-0 text-neutral-400 hover:text-neutral-600"
            aria-label="Dismiss"
          >
            ×
          </button>
        </div>
      )}

    </div>
  );
}
