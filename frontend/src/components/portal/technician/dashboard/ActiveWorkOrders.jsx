import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import { activeWorkOrders } from "../../../../data/mockTechnician.js";
import StatusBadge from "../../dashboard/StatusBadge.jsx";

export default function ActiveWorkOrders() {
  return (
    <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-card">
      <div className="flex items-center justify-between">
        <h3 className="text-[14.5px] font-bold text-neutral-900">Active Work Orders</h3>
        <Link to="/portal/technician/work-orders" className="text-[12.5px] font-semibold text-blue-600 hover:underline">
          View All
        </Link>
      </div>

      <div className="mt-3 overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-[13px]">
          <thead>
            <tr className="border-b border-neutral-100 text-left text-[11.5px] uppercase tracking-wide text-neutral-400">
              <th className="pb-2 font-semibold">Order ID</th>
              <th className="pb-2 font-semibold">Vehicle</th>
              <th className="pb-2 font-semibold">Issue</th>
              <th className="pb-2 font-semibold">Priority</th>
              <th className="pb-2 font-semibold">Status</th>
              <th className="pb-2 font-semibold">Assigned To</th>
              <th className="pb-2 font-semibold">Due Date</th>
              <th className="pb-2 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {activeWorkOrders.map((w) => (
              <tr key={w.orderId} className="border-b border-neutral-50 last:border-0">
                <td className="py-2.5 font-semibold text-neutral-900">{w.orderId}</td>
                <td className="py-2.5 text-neutral-600">{w.vehicle}</td>
                <td className="py-2.5 text-neutral-600">{w.issue}</td>
                <td className="py-2.5">
                  <StatusBadge status={w.priority} />
                </td>
                <td className="py-2.5">
                  <StatusBadge status={w.status} />
                </td>
                <td className="py-2.5 text-neutral-600">{w.assignedTo}</td>
                <td className="py-2.5 text-neutral-600">{w.dueDate}</td>
                <td className="py-2.5">
                  <button className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-50 hover:text-blue-600">
                    <Eye className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
