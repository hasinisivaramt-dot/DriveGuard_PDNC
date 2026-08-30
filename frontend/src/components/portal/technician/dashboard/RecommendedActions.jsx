import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TriangleAlert, CheckCircle2 } from "lucide-react";
import { recommendedActions } from "../../../../data/mockTechnician.js";
import StatusBadge from "../../dashboard/StatusBadge.jsx";

function Toast({ msg, onDismiss }) {
  if (!msg) return null;
  return (
    <div
      role="alert"
      style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999 }}
      className="flex max-w-xs items-center gap-2 rounded-xl border border-emerald-200 bg-white px-4 py-3 shadow-lg text-emerald-700"
    >
      <CheckCircle2 className="h-4 w-4 shrink-0" />
      <p className="text-[13px] font-medium">{msg}</p>
      <button onClick={onDismiss} className="ml-2 text-neutral-400 hover:text-neutral-600">×</button>
    </div>
  );
}

export default function RecommendedActions() {
  const navigate = useNavigate();
  const [createdIds, setCreatedIds] = useState(new Set());
  const [allCreated, setAllCreated] = useState(false);
  const [toast, setToast] = useState(null);
  const toastRef = useRef(null);

  useEffect(() => {
    if (!toast) return;
    clearTimeout(toastRef.current);
    toastRef.current = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(toastRef.current);
  }, [toast]);

  function handleCreateOrder(task) {
    if (createdIds.has(task.id)) return;
    setCreatedIds((prev) => new Set([...prev, task.id]));
    setToast(`Work order created for: "${task.task}"`);
  }

  function handleCreateAll() {
    const remaining = recommendedActions.tasks.filter((t) => !createdIds.has(t.id));
    if (remaining.length === 0) {
      setToast("All work orders already created.");
      return;
    }
    const allIds = new Set(recommendedActions.tasks.map((t) => t.id));
    setCreatedIds(allIds);
    setAllCreated(true);
    setToast(`${remaining.length} work order${remaining.length !== 1 ? "s" : ""} created successfully.`);
  }

  const pendingCount = recommendedActions.tasks.filter((t) => !createdIds.has(t.id)).length;

  return (
    <div className="flex h-full flex-col rounded-2xl border border-neutral-100 bg-white p-5 shadow-card">
      <h3 className="text-[14.5px] font-bold text-neutral-900">Recommended Actions</h3>

      <p className="mt-3 flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2.5 text-[12.5px] font-medium text-red-600">
        <TriangleAlert className="h-4 w-4 shrink-0" /> {recommendedActions.banner}
      </p>

      <div className="mt-4 flex-1 overflow-x-auto">
        <table className="w-full min-w-[420px] border-collapse text-[12.5px]">
          <thead>
            <tr className="border-b border-neutral-100 text-left text-[11px] uppercase tracking-wide text-neutral-400">
              <th className="pb-2 font-semibold">Task</th>
              <th className="pb-2 font-semibold">Priority</th>
              <th className="pb-2 font-semibold">Est. Time</th>
              <th className="pb-2 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {recommendedActions.tasks.map((t) => {
              const done = createdIds.has(t.id);
              return (
                <tr key={t.id} className="border-b border-neutral-50 last:border-0">
                  <td className="py-2.5 font-medium text-neutral-800">{t.task}</td>
                  <td className="py-2.5">
                    <StatusBadge status={t.priority} />
                  </td>
                  <td className="py-2.5 text-neutral-500">{t.eta}</td>
                  <td className="py-2.5">
                    {done ? (
                      <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2.5 py-1 text-[11.5px] font-semibold text-emerald-700">
                        <CheckCircle2 className="h-3 w-3" /> Created
                      </span>
                    ) : (
                      <button
                        id={`ra-create-order-${t.id}`}
                        onClick={() => handleCreateOrder(t)}
                        className="rounded-md border border-blue-200 px-2.5 py-1 text-[11.5px] font-semibold text-blue-600 hover:bg-blue-50"
                      >
                        Create Order
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <button
          id="ra-create-all"
          onClick={handleCreateAll}
          disabled={allCreated && pendingCount === 0}
          className={`w-full rounded-lg py-2.5 text-[13.5px] font-semibold text-white transition ${
            allCreated && pendingCount === 0
              ? "cursor-default bg-emerald-500"
              : "bg-maroon-700 hover:bg-maroon-800"
          }`}
        >
          {allCreated && pendingCount === 0
            ? "✓ All Work Orders Created"
            : pendingCount < recommendedActions.tasks.length
            ? `Create Remaining ${pendingCount} Work Order${pendingCount !== 1 ? "s" : ""}`
            : "Create Work Order for All Tasks"}
        </button>

        {/* Quick-navigate to Work Orders page */}
        <button
          id="ra-view-work-orders"
          onClick={() => navigate("/portal/technician/work-orders")}
          className="w-full rounded-lg border border-neutral-200 py-2 text-[12.5px] font-semibold text-neutral-600 hover:bg-neutral-50"
        >
          View All Work Orders →
        </button>
      </div>

      <Toast msg={toast} onDismiss={() => setToast(null)} />
    </div>
  );
}
