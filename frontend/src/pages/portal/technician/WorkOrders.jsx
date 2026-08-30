import { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Plus,
  CheckCircle2,
  TriangleAlert,
  Sparkles,
  ChevronDown,
  X,
  ClipboardList,
} from "lucide-react";
import { mockWorkOrdersFull, allFleetVehicles } from "../../../data/mockTechnician.js";
import StatusBadge from "../../../components/portal/dashboard/StatusBadge.jsx";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const TECHNICIANS = ["Ravi Kumar", "Sunil Menon", "Mohan Das", "Unassigned"];

const STATUS_CYCLE = {
  Open:        "In Progress",
  "In Progress": "Completed",
  Completed:   "Completed",  // terminal
  Cancelled:   "Cancelled",  // terminal
};

const STATUS_STYLES = {
  Open:        "bg-blue-50 text-blue-700 border-blue-200",
  "In Progress": "bg-amber-50 text-amber-700 border-amber-200",
  Completed:   "bg-emerald-50 text-emerald-700 border-emerald-200",
  Cancelled:   "bg-neutral-100 text-neutral-500 border-neutral-200",
};

const PRIORITY_STYLES = {
  High:   "bg-red-50 text-red-600 border-red-200",
  Medium: "bg-amber-50 text-amber-600 border-amber-200",
  Low:    "bg-emerald-50 text-emerald-600 border-emerald-200",
};

function StatusPill({ status }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${
        STATUS_STYLES[status] || "bg-neutral-100 text-neutral-500 border-neutral-200"
      }`}
    >
      {status}
    </span>
  );
}

function PriorityPill({ priority }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${
        PRIORITY_STYLES[priority] || "bg-neutral-100 text-neutral-500 border-neutral-200"
      }`}
    >
      {priority}
    </span>
  );
}

// Simple toast
function Toast({ toast, onDismiss }) {
  if (!toast) return null;
  return (
    <div
      role="alert"
      style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999 }}
      className={`flex max-w-sm items-start gap-3 rounded-xl border px-4 py-3 shadow-lg ${
        toast.type === "success"
          ? "border-emerald-200 bg-white text-emerald-700"
          : "border-blue-200 bg-white text-blue-700"
      }`}
    >
      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
      <p className="text-[13px] font-medium leading-snug">{toast.message}</p>
      <button onClick={onDismiss} className="ml-auto shrink-0 text-neutral-400 hover:text-neutral-600">×</button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Create Work Order Modal (inline, no library)
// ---------------------------------------------------------------------------
function CreateOrderModal({ onClose, onSave }) {
  const [vehicleId, setVehicleId]   = useState(allFleetVehicles[0]?.id ?? "");
  const [task, setTask]             = useState("");
  const [priority, setPriority]     = useState("Medium");
  const [assignedTo, setAssignedTo] = useState("Unassigned");
  const [eta, setEta]               = useState("1.0 hr");
  const [notes, setNotes]           = useState("");
  const [error, setError]           = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!task.trim()) { setError("Task description is required."); return; }
    const vehicle = allFleetVehicles.find((v) => v.id === vehicleId);
    onSave({
      vehicleId,
      vehicleName: vehicle ? `${vehicle.manufacturer} ${vehicle.model}` : vehicleId,
      task: task.trim(),
      priority,
      status: "Open",
      assignedTo,
      eta,
      notes: notes.trim(),
    });
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="w-full max-w-lg rounded-2xl border border-neutral-100 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-4">
          <div className="flex items-center gap-2">
            <Plus className="h-4 w-4 text-blue-600" />
            <p className="text-[15px] font-bold text-neutral-900">Create Work Order</p>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600">
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-6">
          {/* Vehicle */}
          <div>
            <label className="mb-1 block text-[12px] font-semibold text-neutral-500">Vehicle *</label>
            <select
              value={vehicleId}
              onChange={(e) => setVehicleId(e.target.value)}
              className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-[13px] text-neutral-800 focus:border-blue-400 focus:outline-none"
            >
              {allFleetVehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.id} — {v.manufacturer} {v.model}
                </option>
              ))}
            </select>
          </div>

          {/* Task */}
          <div>
            <label className="mb-1 block text-[12px] font-semibold text-neutral-500">Task Description *</label>
            <input
              type="text"
              value={task}
              onChange={(e) => { setTask(e.target.value); setError(""); }}
              placeholder="e.g. Inspect cooling system & radiator"
              className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-[13px] placeholder-neutral-400 focus:border-blue-400 focus:outline-none"
            />
            {error && <p className="mt-1 text-[11.5px] text-red-500">{error}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Priority */}
            <div>
              <label className="mb-1 block text-[12px] font-semibold text-neutral-500">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-[13px] focus:border-blue-400 focus:outline-none"
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
            {/* Assigned To */}
            <div>
              <label className="mb-1 block text-[12px] font-semibold text-neutral-500">Assign To</label>
              <select
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-[13px] focus:border-blue-400 focus:outline-none"
              >
                {TECHNICIANS.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>

          {/* ETA */}
          <div>
            <label className="mb-1 block text-[12px] font-semibold text-neutral-500">Estimated Time</label>
            <input
              type="text"
              value={eta}
              onChange={(e) => setEta(e.target.value)}
              placeholder="e.g. 1.5 hrs"
              className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-[13px] placeholder-neutral-400 focus:border-blue-400 focus:outline-none"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="mb-1 block text-[12px] font-semibold text-neutral-500">Notes (optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              placeholder="Any additional context…"
              className="w-full resize-none rounded-lg border border-neutral-200 px-3 py-2 text-[13px] placeholder-neutral-400 focus:border-blue-400 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 border-t border-neutral-100 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-neutral-200 px-4 py-2 text-[13px] font-medium text-neutral-600 hover:bg-neutral-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-5 py-2 text-[13px] font-semibold text-white hover:bg-blue-700"
            >
              Create Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function WorkOrders() {
  const navigate = useNavigate();

  // Local state — seeded from mock data (replaces API call)
  const [orders, setOrders] = useState(() => mockWorkOrdersFull.map((o) => ({ ...o })));

  const [search, setSearch]               = useState("");
  const [statusFilter, setStatusFilter]   = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [showCreate, setShowCreate]       = useState(false);
  const [updatingId, setUpdatingId]       = useState(null);  // which order is status-updating
  const [toast, setToast]                 = useState(null);
  const toastRef                          = useRef(null);

  // auto-dismiss toast
  useEffect(() => {
    if (!toast) return;
    clearTimeout(toastRef.current);
    toastRef.current = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(toastRef.current);
  }, [toast]);

  function showToast(message, type = "success") {
    setToast({ message, type });
  }

  // ---- derived stats -------------------------------------------------------
  const stats = useMemo(() => ({
    total:      orders.length,
    open:       orders.filter((o) => o.status === "Open").length,
    inProgress: orders.filter((o) => o.status === "In Progress").length,
    completed:  orders.filter((o) => o.status === "Completed").length,
  }), [orders]);

  // ---- filtered list -------------------------------------------------------
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return orders.filter((o) => {
      const matchSearch =
        !q ||
        o.id.toLowerCase().includes(q) ||
        o.vehicleId.toLowerCase().includes(q) ||
        o.vehicleName.toLowerCase().includes(q) ||
        o.task.toLowerCase().includes(q) ||
        o.assignedTo.toLowerCase().includes(q);
      const matchStatus   = statusFilter   === "All" || o.status === statusFilter;
      const matchPriority = priorityFilter === "All" || o.priority === priorityFilter;
      return matchSearch && matchStatus && matchPriority;
    });
  }, [orders, search, statusFilter, priorityFilter]);

  // ---- handlers ------------------------------------------------------------
  async function handleAdvanceStatus(id) {
    const order = orders.find((o) => o.id === id);
    if (!order) return;
    const next = STATUS_CYCLE[order.status];
    if (!next || next === order.status) return;  // terminal state

    setUpdatingId(id);
    await new Promise((r) => setTimeout(r, 600)); // brief loading feel
    setOrders((prev) =>
      prev.map((o) =>
        o.id === id
          ? { ...o, status: next, completedAt: next === "Completed" ? "Just now" : o.completedAt }
          : o
      )
    );
    setUpdatingId(null);
    showToast(`${id}: status updated to "${next}".`);
  }

  function handleCancelOrder(id) {
    setOrders((prev) =>
      prev.map((o) => o.id === id ? { ...o, status: "Cancelled" } : o)
    );
    showToast(`${id}: order cancelled.`, "info");
  }

  function handleCreateOrder(fields) {
    const nextNum = String(orders.length + 1).padStart(4, "0");
    const newOrder = {
      id: `WO-${nextNum}`,
      createdAt: "Just now",
      completedAt: null,
      ...fields,
    };
    setOrders((prev) => [newOrder, ...prev]);
    setShowCreate(false);
    showToast(`Work order ${newOrder.id} created successfully.`);
  }

  function viewDiagnostics(vehicleId) {
    navigate(`/portal/technician/diagnostics?vin=${encodeURIComponent(vehicleId)}`);
  }

  // ---------------------------------------------------------------------------
  return (
    <div className="space-y-4 sm:space-y-6">

      {/* ================================================================== */}
      {/* Header                                                              */}
      {/* ================================================================== */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-blue-600" />
            <h2 className="text-[18px] font-bold text-neutral-900">Work Orders</h2>
          </div>
          <p className="mt-0.5 text-[13px] text-neutral-400">
            Manage and track all vehicle maintenance work orders.
          </p>
        </div>
        <button
          id="wo-create-btn"
          onClick={() => setShowCreate(true)}
          className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-[13px] font-semibold text-white hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Create Work Order
        </button>
      </div>

      {/* ================================================================== */}
      {/* Summary cards                                                        */}
      {/* ================================================================== */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Total",       value: stats.total,      cls: "text-neutral-900"  },
          { label: "Open",        value: stats.open,       cls: "text-blue-600"     },
          { label: "In Progress", value: stats.inProgress, cls: "text-amber-500"    },
          { label: "Completed",   value: stats.completed,  cls: "text-emerald-600"  },
        ].map(({ label, value, cls }) => (
          <div key={label} className="rounded-2xl border border-neutral-100 bg-white p-4 shadow-card">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-400">{label}</p>
            <p className={`mt-1 text-[26px] font-extrabold leading-none ${cls}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* ================================================================== */}
      {/* Filters                                                              */}
      {/* ================================================================== */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400" />
          <input
            id="wo-search"
            type="text"
            placeholder="Search orders, vehicles, tasks…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-neutral-200 bg-white py-2 pl-9 pr-3 text-[13px] placeholder-neutral-400 focus:border-blue-400 focus:outline-none"
          />
        </div>

        {/* Status filter */}
        <select
          id="wo-status-filter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-[13px] text-neutral-700 focus:border-blue-400 focus:outline-none"
        >
          <option value="All">All Statuses</option>
          <option>Open</option>
          <option>In Progress</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>

        {/* Priority filter */}
        <select
          id="wo-priority-filter"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-[13px] text-neutral-700 focus:border-blue-400 focus:outline-none"
        >
          <option value="All">All Priorities</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <span className="ml-auto text-[12px] text-neutral-400">
          {filtered.length} order{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* ================================================================== */}
      {/* Orders Table                                                         */}
      {/* ================================================================== */}
      <div className="overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[960px] border-collapse text-[12.5px]">
            <thead>
              <tr className="border-b border-neutral-100 text-left text-[11px] uppercase tracking-wide text-neutral-400">
                <th className="px-4 py-3 font-semibold">Order ID</th>
                <th className="px-4 py-3 font-semibold">Vehicle</th>
                <th className="px-4 py-3 font-semibold">Task</th>
                <th className="px-4 py-3 font-semibold">Priority</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Assigned To</th>
                <th className="px-4 py-3 font-semibold">Est. Time</th>
                <th className="px-4 py-3 font-semibold">Created</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-16 text-center text-[13px] text-neutral-400">
                    No work orders match the current filters.
                  </td>
                </tr>
              ) : (
                filtered.map((o) => {
                  const isTerminal = o.status === "Completed" || o.status === "Cancelled";
                  const isUpdating = updatingId === o.id;
                  const nextStatus = STATUS_CYCLE[o.status];

                  return (
                    <tr
                      key={o.id}
                      className="border-b border-neutral-50 transition hover:bg-neutral-50/60 last:border-0"
                    >
                      {/* Order ID */}
                      <td className="px-4 py-3">
                        <span className="font-bold text-neutral-900">{o.id}</span>
                        {o.notes && (
                          <p className="mt-0.5 max-w-[120px] truncate text-[10.5px] text-neutral-400" title={o.notes}>
                            {o.notes}
                          </p>
                        )}
                      </td>

                      {/* Vehicle */}
                      <td className="px-4 py-3">
                        <p className="font-semibold text-neutral-800">{o.vehicleId}</p>
                        <p className="text-[11px] text-neutral-400">{o.vehicleName}</p>
                      </td>

                      {/* Task */}
                      <td className="px-4 py-3 max-w-[200px]">
                        <p className="truncate text-neutral-700" title={o.task}>{o.task}</p>
                      </td>

                      {/* Priority */}
                      <td className="px-4 py-3">
                        <PriorityPill priority={o.priority} />
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3">
                        <StatusPill status={o.status} />
                        {o.completedAt && (
                          <p className="mt-0.5 text-[10.5px] text-neutral-400">{o.completedAt}</p>
                        )}
                      </td>

                      {/* Assigned To */}
                      <td className="px-4 py-3 text-neutral-600">
                        <span className={o.assignedTo === "Unassigned" ? "italic text-neutral-400" : ""}>
                          {o.assignedTo}
                        </span>
                      </td>

                      {/* ETA */}
                      <td className="px-4 py-3 tabular-nums text-neutral-500">{o.eta}</td>

                      {/* Created */}
                      <td className="px-4 py-3 text-neutral-400">{o.createdAt}</td>

                      {/* Actions */}
                      <td className="px-4 py-3">
                        <div className="flex flex-col gap-1">
                          {/* View Diagnostics */}
                          <button
                            id={`wo-view-${o.id}`}
                            onClick={() => viewDiagnostics(o.vehicleId)}
                            className="rounded-md border border-blue-200 px-2.5 py-1 text-[11px] font-semibold text-blue-600 hover:bg-blue-50"
                          >
                            View Diagnostics
                          </button>

                          {/* Advance Status */}
                          {!isTerminal && (
                            <button
                              id={`wo-advance-${o.id}`}
                              onClick={() => handleAdvanceStatus(o.id)}
                              disabled={isUpdating}
                              className={`rounded-md border px-2.5 py-1 text-[11px] font-semibold transition ${
                                isUpdating
                                  ? "cursor-not-allowed border-neutral-200 text-neutral-400"
                                  : "border-amber-200 text-amber-600 hover:bg-amber-50"
                              }`}
                            >
                              {isUpdating
                                ? "Updating…"
                                : `Mark ${nextStatus}`}
                            </button>
                          )}

                          {/* Cancel */}
                          {!isTerminal && (
                            <button
                              id={`wo-cancel-${o.id}`}
                              onClick={() => handleCancelOrder(o.id)}
                              className="rounded-md border border-neutral-200 px-2.5 py-1 text-[11px] font-semibold text-neutral-400 hover:border-red-200 hover:text-red-500"
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-neutral-100 px-4 py-2.5 text-[11.5px] text-neutral-400">
          {filtered.length} of {orders.length} work orders shown.
        </div>
      </div>

      {/* ================================================================== */}
      {/* Create Work Order Modal                                              */}
      {/* ================================================================== */}
      {showCreate && (
        <CreateOrderModal
          onClose={() => setShowCreate(false)}
          onSave={handleCreateOrder}
        />
      )}

      {/* ================================================================== */}
      {/* Toast                                                               */}
      {/* ================================================================== */}
      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </div>
  );
}
