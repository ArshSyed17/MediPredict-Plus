import React from "react";
import { User, Mail, Hash, CalendarDays } from "lucide-react";
import GlassCard from "./ui/GlassCard";

const ReportSummary = ({ report }) => (
  <GlassCard title="Report Summary" subtitle="Patient profile and AI assessment overview.">
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <User className="h-4 w-4 text-cyan-300" />
          <span>{report.patient.name}</span>
          <span className="text-slate-500">•</span>
          <span>
            {report.patient.age} yrs, {report.patient.gender}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <Hash className="h-4 w-4 text-cyan-300" />
          <span>Patient ID: {report.patient.patientId}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <Mail className="h-4 w-4 text-cyan-300" />
          <span>{report.patient.email}</span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <Hash className="h-4 w-4 text-cyan-300" />
          <span>Report ID: {report.id}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <CalendarDays className="h-4 w-4 text-cyan-300" />
          <span>{new Date(report.createdAt).toLocaleString()}</span>
        </div>
        <p className="rounded-xl border border-white/10 bg-slate-950/40 p-3 text-sm text-slate-200">
          {report.summary}
        </p>
      </div>
    </div>
  </GlassCard>
);

export default ReportSummary;
