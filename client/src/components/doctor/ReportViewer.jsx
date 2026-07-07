import React from "react";
import GlassCard from "./ui/GlassCard";

const ReportViewer = ({ report, patientName }) => (
  <div className="space-y-5">
    <GlassCard title="Report Viewer" subtitle={`${report.id} — ${patientName}`}>
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-slate-950/40 p-3 text-center">
          <p className="text-xs text-slate-400">Health Score</p>
          <p className="text-2xl font-bold text-white">{report.healthScore}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-slate-950/40 p-3 text-center">
          <p className="text-xs text-slate-400">Risk Category</p>
          <p className="text-lg font-semibold text-white">{report.riskCategory}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-slate-950/40 p-3 text-center">
          <p className="text-xs text-slate-400">Report ID</p>
          <p className="text-sm font-medium text-cyan-300">{report.id}</p>
        </div>
      </div>
      <p className="mt-4 rounded-xl border border-white/10 bg-slate-950/40 p-4 text-sm text-slate-200">
        {report.summary}
      </p>
    </GlassCard>
  </div>
);

export default ReportViewer;
