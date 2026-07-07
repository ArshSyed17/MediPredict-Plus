import React from "react";
import { Activity, FileText, Mail, Phone, Stethoscope } from "lucide-react";
import GlassCard from "./ui/GlassCard";

const trendIcon = { up: "↑", down: "↓", stable: "→" };
const trendColor = { up: "text-rose-300", down: "text-emerald-300", stable: "text-slate-400" };

const PatientDetails = ({ patient, onViewPrediction, onViewReport, onViewNotes }) => (
  <div className="space-y-5">
    <GlassCard title={patient.name} subtitle={`${patient.id} • Last visit ${patient.lastVisit}`}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Age", `${patient.age} years`],
          ["Gender", patient.gender],
          ["Blood Group", patient.bloodGroup],
          ["Risk Level", patient.riskLevel],
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl border border-white/10 bg-slate-950/40 p-3">
            <p className="text-xs text-slate-400">{label}</p>
            <p className="font-medium text-white">{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-3 text-sm text-slate-300">
        <span className="flex items-center gap-1"><Mail className="h-4 w-4" />{patient.email}</span>
        <span className="flex items-center gap-1"><Phone className="h-4 w-4" />{patient.phone}</span>
      </div>
    </GlassCard>

    <div className="grid gap-5 lg:grid-cols-2">
      <GlassCard title="Medical History">
        <ul className="space-y-2">
          {patient.medicalHistory.map((item) => (
            <li key={item} className="flex items-start gap-2 rounded-lg border border-white/10 bg-slate-950/40 px-3 py-2 text-sm text-slate-200">
              <Stethoscope className="mt-0.5 h-4 w-4 shrink-0 text-cyan-300" />
              {item}
            </li>
          ))}
        </ul>
      </GlassCard>

      <GlassCard title="Health Metrics">
        <div className="grid grid-cols-2 gap-2">
          {patient.metrics.map((m) => (
            <div key={m.label} className="rounded-xl border border-white/10 bg-slate-950/40 p-3">
              <p className="text-xs text-slate-400">{m.label}</p>
              <p className="font-medium text-white">{m.value}</p>
              <p className={`text-xs ${trendColor[m.trend]}`}>{trendIcon[m.trend]} {m.trend}</p>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>

    <div className="grid gap-5 lg:grid-cols-2">
      <GlassCard title="Prediction History">
        <div className="space-y-2">
          {patient.predictions.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={onViewPrediction}
              className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2 text-left text-sm hover:border-cyan-400/30"
            >
              <span className="text-slate-200">{p.disease}</span>
              <span className="text-cyan-300">{p.risk}% • {p.confidence}% conf.</span>
            </button>
          ))}
        </div>
      </GlassCard>

      <GlassCard title="Latest Reports">
        <div className="space-y-2">
          {patient.reports.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={onViewReport}
              className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2 text-left text-sm hover:border-cyan-400/30"
            >
              <span className="flex items-center gap-2 text-slate-200">
                <FileText className="h-4 w-4 text-slate-400" />
                {r.title}
              </span>
              <span className={r.status === "Pending" ? "text-amber-300" : "text-emerald-300"}>{r.status}</span>
            </button>
          ))}
        </div>
      </GlassCard>
    </div>

    <GlassCard title="Health Timeline">
      <div className="space-y-3">
        {patient.timeline.map((event) => (
          <div key={event.date + event.event} className="flex items-center gap-3">
            <Activity className="h-4 w-4 text-cyan-300" />
            <div>
              <p className="text-sm text-white">{event.event}</p>
              <p className="text-xs text-slate-400">{event.date}</p>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>

    <div className="flex flex-wrap gap-3">
      <button type="button" onClick={onViewPrediction} className="rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 px-4 py-2 text-sm font-medium text-white">
        Review Prediction
      </button>
      <button type="button" onClick={onViewReport} className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
        View Report
      </button>
      <button type="button" onClick={onViewNotes} className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200">
        Consultation Notes
      </button>
    </div>
  </div>
);

export default PatientDetails;
