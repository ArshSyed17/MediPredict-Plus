import React, { useState } from "react";
import { Archive, Download, Search, Trash2 } from "lucide-react";
import GlassCard from "./ui/GlassCard";

const ReportManagement = ({ reports, onDownload, onDelete, onArchive }) => {
  const [search, setSearch] = useState("");

  const filtered = reports.filter(
    (r) =>
      r.id.toLowerCase().includes(search.toLowerCase()) ||
      r.patient.toLowerCase().includes(search.toLowerCase()) ||
      r.disease.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <GlassCard title="Report Management" subtitle={`${filtered.length} reports`}>
      <div className="relative mb-4">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search reports..."
          className="w-full rounded-xl border border-white/10 bg-slate-950/60 py-2 pl-10 pr-3 text-sm text-white outline-none"
        />
      </div>
      <div className="space-y-2">
        {filtered.map((report) => (
          <div key={report.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-slate-950/40 p-3">
            <div>
              <p className="font-medium text-white">{report.id}</p>
              <p className="text-xs text-slate-400">{report.patient} • {report.disease} • {report.date}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`rounded-full px-2 py-0.5 text-[10px] capitalize ${report.status === "archived" ? "bg-slate-600 text-slate-300" : "bg-emerald-500/20 text-emerald-300"}`}>
                {report.status}
              </span>
              <button type="button" onClick={() => onDownload(report)} className="rounded-lg p-1.5 text-slate-400 hover:text-cyan-300"><Download className="h-4 w-4" /></button>
              <button type="button" onClick={() => onArchive(report.id)} className="rounded-lg p-1.5 text-slate-400 hover:text-amber-300"><Archive className="h-4 w-4" /></button>
              <button type="button" onClick={() => onDelete(report.id)} className="rounded-lg p-1.5 text-slate-400 hover:text-rose-300"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};

export default ReportManagement;
