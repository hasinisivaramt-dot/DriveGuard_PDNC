import { useState, useMemo, useRef, useEffect } from "react";
import { Search, Package, CheckCircle2, TriangleAlert } from "lucide-react";
import { partsInventory } from "../../../data/mockTechnician.js";

const CATEGORIES = ["All", "Engine", "Filters", "Cooling", "Electrical", "Brakes", "Suspension", "Fluids", "Tyres", "Body"];

const STATUS_STYLES = {
  "In Stock":    "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Low Stock":   "bg-amber-50 text-amber-700 border-amber-200",
  "Out of Stock":"bg-red-50 text-red-600 border-red-200",
};

function StatusPill({ status }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${STATUS_STYLES[status] || "bg-neutral-100 text-neutral-500 border-neutral-200"}`}>
      {status === "In Stock" ? <CheckCircle2 className="mr-1 h-3 w-3" /> : <TriangleAlert className="mr-1 h-3 w-3" />}
      {status}
    </span>
  );
}

function StockBar({ stock, reorder }) {
  const pct = Math.min(100, Math.round((stock / Math.max(reorder * 3, 1)) * 100));
  const color = stock === 0 ? "#ef4444" : stock <= reorder ? "#f59e0b" : "#22c55e";
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-neutral-100">
        <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="tabular-nums text-[12px] font-semibold" style={{ color }}>{stock}</span>
    </div>
  );
}

export default function PartsInventory() {
  const [parts, setParts]           = useState(() => partsInventory.map((p) => ({ ...p })));
  const [search, setSearch]         = useState("");
  const [catFilter, setCatFilter]   = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [reorderingId, setReorderingId] = useState(null);
  const [toast, setToast]           = useState(null);
  const toastRef                    = useRef(null);

  useEffect(() => {
    if (!toast) return;
    clearTimeout(toastRef.current);
    toastRef.current = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(toastRef.current);
  }, [toast]);

  const stats = useMemo(() => ({
    total:      parts.length,
    lowStock:   parts.filter((p) => p.status === "Low Stock").length,
    outOfStock: parts.filter((p) => p.status === "Out of Stock").length,
  }), [parts]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return parts.filter((p) => {
      const matchSearch = !q || p.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q)
        || p.category.toLowerCase().includes(q) || p.supplier.toLowerCase().includes(q);
      const matchCat    = catFilter === "All"    || p.category === catFilter;
      const matchStatus = statusFilter === "All" || p.status === statusFilter;
      return matchSearch && matchCat && matchStatus;
    });
  }, [parts, search, catFilter, statusFilter]);

  async function handleReorder(id) {
    setReorderingId(id);
    await new Promise((r) => setTimeout(r, 900));
    setParts((prev) => prev.map((p) => {
      if (p.id !== id) return p;
      const newStock = p.reorderLevel * 3;
      return { ...p, stock: newStock, status: "In Stock" };
    }));
    setReorderingId(null);
    setToast(`Reorder placed for ${id}. Stock replenished.`);
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Package className="h-5 w-5 text-blue-600" />
        <div>
          <h2 className="text-[18px] font-bold text-neutral-900">Parts & Inventory</h2>
          <p className="text-[13px] text-neutral-400">Track spare parts stock levels and place reorders.</p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total Parts",   value: stats.total,      cls: "text-neutral-900" },
          { label: "Low Stock",     value: stats.lowStock,   cls: "text-amber-500"   },
          { label: "Out of Stock",  value: stats.outOfStock, cls: "text-red-500"     },
        ].map(({ label, value, cls }) => (
          <div key={label} className="rounded-2xl border border-neutral-100 bg-white p-4 shadow-card">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-400">{label}</p>
            <p className={`mt-1 text-[26px] font-extrabold leading-none ${cls}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Alert banner */}
      {(stats.lowStock > 0 || stats.outOfStock > 0) && (
        <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
          <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
          <p className="text-[12.5px] text-amber-700">
            <strong>{stats.outOfStock} item{stats.outOfStock !== 1 ? "s are" : " is"} out of stock</strong> and
            {" "}<strong>{stats.lowStock} item{stats.lowStock !== 1 ? "s are" : " is"} low.</strong>
            {" "}Use the <em>Reorder</em> button to replenish.
          </p>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400" />
          <input type="text" placeholder="Search parts…" value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-neutral-200 bg-white py-2 pl-9 pr-3 text-[13px] placeholder-neutral-400 focus:border-blue-400 focus:outline-none" />
        </div>
        <select value={catFilter} onChange={(e) => setCatFilter(e.target.value)}
          className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-[13px] text-neutral-700 focus:border-blue-400 focus:outline-none">
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-[13px] text-neutral-700 focus:border-blue-400 focus:outline-none">
          {["All", "In Stock", "Low Stock", "Out of Stock"].map((s) => <option key={s}>{s}</option>)}
        </select>
        <span className="ml-auto text-[12px] text-neutral-400">{filtered.length} part{filtered.length !== 1 ? "s" : ""}</span>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] border-collapse text-[12.5px]">
            <thead>
              <tr className="border-b border-neutral-100 text-left text-[11px] uppercase tracking-wide text-neutral-400">
                {["Part ID", "Name", "Category", "Stock", "Reorder Level", "Unit", "Unit Cost", "Supplier", "Status", "Action"].map((h) => (
                  <th key={h} className="px-4 py-3 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={10} className="py-16 text-center text-[13px] text-neutral-400">No parts match the current filters.</td></tr>
              ) : filtered.map((p) => {
                const isReordering = reorderingId === p.id;
                const needsReorder = p.status === "Out of Stock" || p.status === "Low Stock";
                return (
                  <tr key={p.id} className={`border-b border-neutral-50 hover:bg-neutral-50/60 last:border-0 transition ${p.status === "Out of Stock" ? "bg-red-50/20" : p.status === "Low Stock" ? "bg-amber-50/20" : ""}`}>
                    <td className="px-4 py-3 font-bold text-neutral-700">{p.id}</td>
                    <td className="px-4 py-3 font-medium text-neutral-900 max-w-[180px]">
                      <p className="truncate" title={p.name}>{p.name}</p>
                    </td>
                    <td className="px-4 py-3 text-neutral-500">{p.category}</td>
                    <td className="px-4 py-3"><StockBar stock={p.stock} reorder={p.reorderLevel} /></td>
                    <td className="px-4 py-3 tabular-nums text-neutral-500">{p.reorderLevel}</td>
                    <td className="px-4 py-3 text-neutral-500">{p.unit}</td>
                    <td className="px-4 py-3 tabular-nums font-semibold text-neutral-700">{p.unitCost}</td>
                    <td className="px-4 py-3 text-neutral-500">{p.supplier}</td>
                    <td className="px-4 py-3"><StatusPill status={p.status} /></td>
                    <td className="px-4 py-3">
                      <button id={`parts-reorder-${p.id}`} onClick={() => handleReorder(p.id)}
                        disabled={isReordering || !needsReorder}
                        className={`rounded-md border px-2.5 py-1 text-[11.5px] font-semibold transition ${
                          isReordering
                            ? "cursor-not-allowed border-neutral-200 text-neutral-400"
                            : needsReorder
                            ? "border-blue-200 text-blue-600 hover:bg-blue-50"
                            : "border-neutral-100 text-neutral-300 cursor-default"
                        }`}>
                        {isReordering ? "Ordering…" : "Reorder"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="border-t border-neutral-100 px-4 py-2.5 text-[11.5px] text-neutral-400">
          {filtered.length} of {parts.length} parts shown. Reorder simulates stock replenishment.
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999 }}
          className="flex max-w-sm items-start gap-3 rounded-xl border border-emerald-200 bg-white px-4 py-3 shadow-lg text-emerald-700">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
          <p className="text-[13px] font-medium">{toast}</p>
          <button onClick={() => setToast(null)} className="ml-auto text-neutral-400 hover:text-neutral-600">×</button>
        </div>
      )}
    </div>
  );
}
