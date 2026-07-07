import React from "react";
import GlassCard from "./ui/GlassCard";

const statusTone = {
  normal: "text-emerald-300 bg-emerald-500/10 border-emerald-400/20",
  borderline: "text-amber-300 bg-amber-500/10 border-amber-400/20",
  high: "text-rose-300 bg-rose-500/10 border-rose-400/20",
};

const MedicalHistorySection = ({ healthMetrics, medicalHistory, doctorNotes }) => (
  <div className="grid gap-5 lg:grid-cols-2">
    <GlassCard title="Health Metrics" subtitle="Key biomarkers from the report.">
      <div className="space-y-2">
        {healthMetrics.map((metric) => (
          <div
            key={metric.label}
            className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2"
          >
            <span className="text-sm text-slate-300">{metric.label}</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-white">{metric.value}</span>
              <span className={`rounded-full border px-2 py-0.5 text-[10px] uppercase ${statusTone[metric.status]}`}>
                {metric.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>

    <GlassCard title="Medical History & Doctor Notes" subtitle="Clinical context and physician commentary.">
      <ul className="mb-4 space-y-2">
        {medicalHistory.map((item) => (
          <li key={item} className="rounded-lg border border-white/10 bg-slate-950/40 px-3 py-2 text-sm text-slate-200">
            {item}
          </li>
        ))}
      </ul>
      <div className="rounded-xl border border-violet-400/20 bg-violet-500/10 p-3">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-violet-200">Doctor Notes</p>
        <p className="text-sm text-slate-100">{doctorNotes}</p>
      </div>
    </GlassCard>
  </div>
);

export default MedicalHistorySection;
