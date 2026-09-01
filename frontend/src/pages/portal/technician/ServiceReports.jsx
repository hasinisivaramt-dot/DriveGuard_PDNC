import { useState, useMemo, useRef, useEffect } from "react";
import { Search, FileText, X, CheckCircle2, Eye, Download } from "lucide-react";
import { jsPDF } from "jspdf";
import { serviceReports } from "../../../data/mockTechnician.js";

const STATUS_STYLES = {
  Completed: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Pending:   "bg-amber-50 text-amber-700 border-amber-200",
};

const TYPE_STYLES = {
  Corrective:  "bg-red-50 text-red-600",
  Preventive:  "bg-blue-50 text-blue-700",
  Inspection:  "bg-purple-50 text-purple-700",
};

function Pill({ label, styleMap }) {
  return (
    <span className={`inline-block rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${styleMap[label] || "bg-neutral-100 text-neutral-500 border-neutral-200"}`}>
      {label}
    </span>
  );
}

// View/Generate Report Modal
function ReportModal({ report, onClose }) {
  if (!report) return null;
  const isCompleted = report.status === "Completed";

  function exportPdf() {
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    let y = 15;

    // Helper: format numbers safely (avoids jsPDF spacing issues with toLocaleString)
    function formatAmount(val) {
      if (val == null || val === "—") return "—";
      const str = String(val).trim();
      let prefix = "";
      if (str.startsWith("₹") || str.startsWith("$")) prefix = str[0] + " ";
      const cleanNumStr = str.replace(/[^\d.]/g, "");
      if (!cleanNumStr) return str;
      const num = parseFloat(cleanNumStr);
      if (isNaN(num)) return str;
      
      const parts = num.toFixed(0).split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return prefix + parts.join(".");
    }

    // Helper: format date safely
    function formatDateTime(d) {
      const date = new Date(d);
      if (isNaN(date.getTime())) return d;
      const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      const day = String(date.getDate()).padStart(2, "0");
      const month = months[date.getMonth()];
      const year = date.getFullYear();
      let hours = date.getHours();
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;
      const strTime = String(hours).padStart(2, "0") + ":" + minutes + " " + ampm;
      return `${day} ${month} ${year}, ${strTime}`;
    }
    
    function formatDateOnly(d) {
      if (!d || d === "—") return "—";
      const date = new Date(d);
      if (isNaN(date.getTime())) return d;
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      return `${String(date.getDate()).padStart(2, "0")} ${months[date.getMonth()]} ${date.getFullYear()}`;
    }

    // --- HEADER ---
    doc.setFillColor(15, 30, 80);
    doc.rect(0, 0, pageWidth, 25, "F");
    
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("DRIVEGUARD AI", margin, 12);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text("Predict. Prevent. Protect.", margin, 18);

    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(0.5);
    doc.line(pageWidth - margin - 50, 8, pageWidth - margin - 50, 19);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(7);
    doc.text("GENERATED ON", pageWidth - margin, 12, { align: "right" });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(formatDateTime(new Date()), pageWidth - margin, 17, { align: "right" });

    y = 38;

    // --- REPORT TITLE ---
    doc.setTextColor(15, 30, 80);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("SERVICE REPORT", margin, y);
    
    const titleWidth = doc.getTextWidth("SERVICE REPORT");
    doc.setFillColor(15, 30, 80);
    doc.roundedRect(margin + titleWidth + 5, y - 7, doc.getTextWidth(report.id) + 8, 9, 1.5, 1.5, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.text(report.id, margin + titleWidth + 9, y - 0.5);

    y += 7;
    doc.setTextColor(100, 100, 100);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.text("Professional Vehicle Service Summary", margin, y);

    y += 12;

    // --- VEHICLE / SERVICE INFORMATION ---
    doc.setDrawColor(220, 220, 220);
    doc.setFillColor(252, 252, 252);
    const infoHeight = 42;
    doc.roundedRect(margin, y, pageWidth - margin * 2, infoHeight, 2, 2, "FD");

    const leftColX = margin + 12;
    const rightColX = margin + 95;
    let infoY = y + 8;
    const rowH = 9;

    const leftData = [
      { label: "Report ID", value: report.id },
      { label: "Make / Model", value: report.vehicleName },
      { label: "Service Type", value: report.type },
      { label: "Work Order", value: report.orderId ?? "—" }
    ];

    const rightData = [
      { label: "Vehicle", value: report.vehicleId },
      { label: "Service Date", value: formatDateOnly(report.date) },
      { label: "Technician", value: report.technician },
      { label: "Status", value: report.status }
    ];

    for (let i = 0; i < 4; i++) {
      // Left
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(130, 130, 130);
      doc.text(leftData[i].label, leftColX, infoY + i * rowH);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.setTextColor(30, 30, 30);
      doc.text(leftData[i].value, leftColX, infoY + 4 + i * rowH);

      // Right
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(130, 130, 130);
      doc.text(rightData[i].label, rightColX, infoY + i * rowH);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      
      if (i === 3) {
         if (report.status === "Completed") {
           doc.setTextColor(16, 185, 129); // green
           doc.text(`✓ ${report.status}`, rightColX, infoY + 4 + i * rowH);
         } else {
           doc.setTextColor(245, 158, 11); // amber
           doc.text(`○ ${report.status}`, rightColX, infoY + 4 + i * rowH);
         }
      } else {
         doc.setTextColor(30, 30, 30);
         doc.text(rightData[i].value, rightColX, infoY + 4 + i * rowH);
      }
    }
    
    doc.setDrawColor(230, 230, 230);
    doc.setLineWidth(0.3);
    doc.line(margin + (pageWidth - margin * 2)/2, y + 5, margin + (pageWidth - margin * 2)/2, y + infoHeight - 5);

    y += infoHeight + 8;

    // --- FINDINGS & RECOMMENDATIONS ---
    const boxW = (pageWidth - margin * 2 - 5) / 2;
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const findLines = doc.splitTextToSize(report.findings || "No findings recorded.", boxW - 10);
    const recLines = doc.splitTextToSize(report.recommendations || "No recommendations recorded.", boxW - 10);
    const findingsH = Math.max(30, findLines.length * 5 + 15);
    const recH = Math.max(30, recLines.length * 5 + 15);
    const boxesHeight = Math.max(findingsH, recH);

    if (y + boxesHeight > pageHeight - 30) {
      doc.addPage();
      y = 20;
    }

    // Left Box (Findings)
    doc.setDrawColor(220, 220, 220);
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(margin, y, boxW, boxesHeight, 2, 2, "FD");
    
    doc.setFont("helvetica", "bold");
    doc.setTextColor(37, 99, 235);
    doc.setFontSize(9);
    doc.text("FINDINGS", margin + 5, y + 8);
    doc.setDrawColor(37, 99, 235);
    doc.setLineWidth(0.5);
    doc.line(margin + 5, y + 11, margin + boxW - 5, y + 11);
    
    doc.setFont("helvetica", "normal");
    doc.setTextColor(50, 50, 50);
    doc.setFontSize(10);
    doc.text(findLines, margin + 5, y + 18);

    // Right Box (Recommendations)
    doc.setDrawColor(220, 220, 220);
    doc.roundedRect(margin + boxW + 5, y, boxW, boxesHeight, 2, 2, "FD");
    
    doc.setFont("helvetica", "bold");
    doc.setTextColor(37, 99, 235);
    doc.setFontSize(9);
    doc.text("RECOMMENDATIONS", margin + boxW + 10, y + 8);
    doc.line(margin + boxW + 10, y + 11, margin + boxW * 2, y + 11);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(50, 50, 50);
    doc.setFontSize(10);
    doc.text(recLines, margin + boxW + 10, y + 18);

    y += boxesHeight + 8;

    // --- COST BREAKDOWN ---
    if (isCompleted && report.totalCost && report.totalCost !== "—") {
      if (y + 45 > pageHeight - 30) {
        doc.addPage();
        y = 20;
      }

      doc.setFont("helvetica", "bold");
      doc.setTextColor(37, 99, 235);
      doc.setFontSize(10);
      doc.text("COST BREAKDOWN", margin, y + 4);

      y += 6;
      
      doc.setDrawColor(220, 220, 220);
      doc.setFillColor(255, 255, 255);
      doc.setLineWidth(0.3);
      doc.roundedRect(margin, y, pageWidth - margin * 2, 30, 2, 2, "FD");

      // Table Header
      doc.setFillColor(240, 245, 255);
      doc.roundedRect(margin, y, pageWidth - margin * 2, 8, 2, 2, "F");
      doc.rect(margin, y + 4, pageWidth - margin * 2, 4, "F");
      
      doc.setFont("helvetica", "bold");
      doc.setTextColor(37, 99, 235);
      doc.setFontSize(8);
      doc.text("ITEM", margin + 5, y + 5.5);
      doc.text("AMOUNT", pageWidth - margin - 5, y + 5.5, { align: "right" });

      y += 8;
      doc.setFont("helvetica", "normal");
      doc.setTextColor(50, 50, 50);
      doc.setFontSize(9.5);
      doc.text("Labour Cost", margin + 5, y + 5.5);
      doc.text(formatAmount(report.laborCost), pageWidth - margin - 5, y + 5.5, { align: "right" });

      doc.setDrawColor(230, 230, 230);
      doc.setLineDashPattern([1, 1], 0);
      doc.line(margin + 5, y + 8, pageWidth - margin - 5, y + 8);
      doc.setLineDashPattern([], 0);

      y += 8;
      doc.text("Parts Cost", margin + 5, y + 5.5);
      doc.text(formatAmount(report.partsCost), pageWidth - margin - 5, y + 5.5, { align: "right" });

      y += 8;
      // Total background
      doc.setFillColor(240, 245, 255);
      doc.roundedRect(margin, y - 2, pageWidth - margin * 2, 8, 2, 2, "F");
      doc.rect(margin, y - 2, pageWidth - margin * 2, 4, "F");

      doc.setFont("helvetica", "bold");
      doc.setTextColor(15, 30, 80);
      doc.setFontSize(10.5);
      doc.text("TOTAL COST", margin + 5, y + 3.5);
      
      doc.setTextColor(37, 99, 235);
      doc.text(formatAmount(report.totalCost), pageWidth - margin - 5, y + 3.5, { align: "right" });
      
      y += 10;
    }

    // --- THANK YOU & FOOTER ---
    if (y + 30 > pageHeight) {
      doc.addPage();
      y = 20;
    }
    
    y = Math.max(y + 10, pageHeight - 35);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(50, 50, 50);
    doc.setFontSize(9);
    doc.text("Thank you for choosing DriveGuard AI.", margin, y);
    doc.setFont("helvetica", "italic");
    doc.text("Drive safe. We've got your back.", margin, y + 4);
    
    doc.setFont("helvetica", "normal");
    doc.text("Page 1 of 1", pageWidth - margin, y + 4, { align: "right" });

    // Footer line
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.line(margin, pageHeight - 15, pageWidth - margin, pageHeight - 15);

    doc.setFont("helvetica", "bold");
    doc.setTextColor(37, 99, 235);
    doc.setFontSize(8);
    doc.text("DRIVEGUARD AI", margin, pageHeight - 10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(130, 130, 130);
    doc.text(" — Technician Service Report", margin + 25, pageHeight - 10);

    doc.setFont("helvetica", "italic");
    doc.text("This is a system generated document.", pageWidth - margin, pageHeight - 10, { align: "right" });

    doc.save(`ServiceReport_${report.id}.pdf`);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="w-full max-w-xl rounded-2xl border border-neutral-100 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-neutral-100 px-6 py-4">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-blue-600" />
            <p className="text-[15px] font-bold text-neutral-900">Service Report — {report.id}</p>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100"><X className="h-4 w-4" /></button>
        </div>
        <div className="space-y-4 p-6">
          <div className="grid grid-cols-2 gap-3 text-[12.5px]">
            {[
              ["Vehicle",    report.vehicleId],
              ["Model",      report.vehicleName],
              ["Report Type",report.type],
              ["Date",       report.date],
              ["Technician", report.technician],
              ["Work Order", report.orderId ?? "—"],
              ["Status",     report.status],
            ].map(([k, v]) => (
              <div key={k}>
                <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-400">{k}</p>
                <p className="mt-0.5 font-semibold text-neutral-800">{v}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-neutral-100 bg-neutral-50 p-4 space-y-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-400 mb-1">Findings</p>
              <p className="text-[12.5px] text-neutral-700">{report.findings}</p>
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-400 mb-1">Recommendations</p>
              <p className="text-[12.5px] text-neutral-700">{report.recommendations}</p>
            </div>
          </div>

          {isCompleted && (
            <div className="grid grid-cols-3 gap-3">
              {[["Labour Cost", report.laborCost], ["Parts Cost", report.partsCost], ["Total Cost", report.totalCost]].map(([k, v]) => (
                <div key={k} className="rounded-xl border border-neutral-100 bg-white p-3">
                  <p className="text-[10.5px] font-semibold uppercase tracking-wide text-neutral-400">{k}</p>
                  <p className="mt-0.5 text-[15px] font-extrabold text-neutral-900">{v}</p>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-end gap-2 border-t border-neutral-100 pt-4">
            <button onClick={onClose}
              className="rounded-lg border border-neutral-200 px-4 py-2 text-[13px] font-medium text-neutral-600 hover:bg-neutral-50">
              Close
            </button>
            {isCompleted && (
              <button
                id={`export-pdf-${report.id}`}
                onClick={exportPdf}
                className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-5 py-2 text-[13px] font-semibold text-white hover:bg-blue-700">
                <Download className="h-4 w-4" /> Export PDF
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ServiceReports() {
  const [reports, setReports]         = useState(() => serviceReports.map((r) => ({ ...r })));
  const [search, setSearch]           = useState("");
  const [typeFilter, setTypeFilter]   = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [viewReport, setViewReport]   = useState(null);
  const [toast, setToast]             = useState(null);
  const [generatingId, setGeneratingId] = useState(null);
  const toastRef                      = useRef(null);

  useEffect(() => {
    if (!toast) return;
    clearTimeout(toastRef.current);
    toastRef.current = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(toastRef.current);
  }, [toast]);

  const stats = useMemo(() => ({
    total:     reports.length,
    completed: reports.filter((r) => r.status === "Completed").length,
    pending:   reports.filter((r) => r.status === "Pending").length,
  }), [reports]);

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return reports.filter((r) => {
      const matchSearch = !q || r.id.toLowerCase().includes(q) || r.vehicleId.toLowerCase().includes(q)
        || r.vehicleName.toLowerCase().includes(q) || r.technician.toLowerCase().includes(q);
      const matchType   = typeFilter === "All"   || r.type === typeFilter;
      const matchStatus = statusFilter === "All" || r.status === statusFilter;
      return matchSearch && matchType && matchStatus;
    });
  }, [reports, search, typeFilter, statusFilter]);

  async function handleGenerate(id) {
    setGeneratingId(id);
    await new Promise((r) => setTimeout(r, 1400));
    setReports((prev) => prev.map((r) => r.id === id ? {
      ...r,
      status: "Completed",
      laborCost: "₹1,200",
      partsCost: "₹400",
      totalCost: "₹1,600",
      findings: r.findings.replace("Awaiting completion.", "Service completed successfully."),
      recommendations: "Schedule follow-up check in 30 days.",
    } : r));
    setGeneratingId(null);
    setToast(`Report ${id} generated successfully.`);
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex items-center gap-2">
        <FileText className="h-5 w-5 text-blue-600" />
        <div>
          <h2 className="text-[18px] font-bold text-neutral-900">Service Reports</h2>
          <p className="text-[13px] text-neutral-400">Review, generate, and export service reports for all vehicles.</p>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Total Reports", value: stats.total,     cls: "text-neutral-900" },
          { label: "Completed",     value: stats.completed, cls: "text-emerald-600" },
          { label: "Pending",       value: stats.pending,   cls: "text-amber-500"   },
        ].map(({ label, value, cls }) => (
          <div key={label} className="rounded-2xl border border-neutral-100 bg-white p-4 shadow-card">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-neutral-400">{label}</p>
            <p className={`mt-1 text-[26px] font-extrabold leading-none ${cls}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400" />
          <input type="text" placeholder="Search reports…" value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-neutral-200 bg-white py-2 pl-9 pr-3 text-[13px] placeholder-neutral-400 focus:border-blue-400 focus:outline-none" />
        </div>
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}
          className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-[13px] text-neutral-700 focus:border-blue-400 focus:outline-none">
          {["All", "Corrective", "Preventive", "Inspection"].map((t) => <option key={t}>{t}</option>)}
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-neutral-200 bg-white px-3 py-2 text-[13px] text-neutral-700 focus:border-blue-400 focus:outline-none">
          {["All", "Completed", "Pending"].map((s) => <option key={s}>{s}</option>)}
        </select>
        <span className="ml-auto text-[12px] text-neutral-400">{filtered.length} report{filtered.length !== 1 ? "s" : ""}</span>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-neutral-100 bg-white shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] border-collapse text-[12.5px]">
            <thead>
              <tr className="border-b border-neutral-100 text-left text-[11px] uppercase tracking-wide text-neutral-400">
                {["Report ID", "Vehicle", "Type", "Date", "Technician", "Work Order", "Total Cost", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={9} className="py-16 text-center text-[13px] text-neutral-400">No reports match the current filters.</td></tr>
              ) : filtered.map((r) => {
                const isGenerating = generatingId === r.id;
                return (
                  <tr key={r.id} className="border-b border-neutral-50 hover:bg-neutral-50/60 last:border-0 transition">
                    <td className="px-4 py-3 font-bold text-neutral-800">{r.id}</td>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-neutral-800">{r.vehicleId}</p>
                      <p className="text-[11px] text-neutral-400">{r.vehicleName}</p>
                    </td>
                    <td className="px-4 py-3"><Pill label={r.type} styleMap={TYPE_STYLES} /></td>
                    <td className="px-4 py-3 text-neutral-500">{r.date}</td>
                    <td className="px-4 py-3 text-neutral-600">{r.technician}</td>
                    <td className="px-4 py-3 text-neutral-500">{r.orderId ?? "—"}</td>
                    <td className="px-4 py-3 tabular-nums font-semibold text-neutral-700">{r.totalCost}</td>
                    <td className="px-4 py-3"><Pill label={r.status} styleMap={STATUS_STYLES} /></td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-1">
                        <button id={`sr-view-${r.id}`} onClick={() => setViewReport(r)}
                          className="inline-flex items-center gap-1 rounded-md border border-blue-200 px-2.5 py-1 text-[11px] font-semibold text-blue-600 hover:bg-blue-50">
                          <Eye className="h-3 w-3" /> View
                        </button>
                        {r.status === "Pending" && (
                          <button id={`sr-generate-${r.id}`} onClick={() => handleGenerate(r.id)}
                            disabled={isGenerating}
                            className={`rounded-md border px-2.5 py-1 text-[11px] font-semibold transition ${isGenerating ? "cursor-not-allowed border-neutral-200 text-neutral-400" : "border-emerald-200 text-emerald-600 hover:bg-emerald-50"}`}>
                            {isGenerating ? "Generating…" : "Generate"}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="border-t border-neutral-100 px-4 py-2.5 text-[11.5px] text-neutral-400">
          {filtered.length} of {reports.length} reports shown.
        </div>
      </div>

      {viewReport && <ReportModal report={viewReport} onClose={() => setViewReport(null)} />}

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
