import React from "react";
import { Pill, AlertTriangle, Stethoscope } from "lucide-react";
import GlassCard from "./ui/GlassCard";

const TagList = ({ items, icon: Icon, tone }) => (
  <div className="space-y-2">
    {items.map((item) => (
      <div key={item} className={`flex items-center gap-2 rounded-xl border px-3 py-2 text-sm ${tone}`}>
        <Icon className="h-4 w-4 shrink-0" />
        {item}
      </div>
    ))}
  </div>
);

const MedicalInformation = ({ profile }) => (
  <GlassCard title="Medical Information" subtitle="Conditions, allergies, and current medications.">
    <div className="grid gap-4 lg:grid-cols-3">
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Conditions</p>
        <TagList
          items={profile.medicalConditions}
          icon={Stethoscope}
          tone="border-amber-400/20 bg-amber-500/10 text-amber-100"
        />
      </div>
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Allergies</p>
        <TagList
          items={profile.allergies}
          icon={AlertTriangle}
          tone="border-rose-400/20 bg-rose-500/10 text-rose-100"
        />
      </div>
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Medications</p>
        <TagList
          items={profile.medications}
          icon={Pill}
          tone="border-cyan-400/20 bg-cyan-500/10 text-cyan-100"
        />
      </div>
    </div>
  </GlassCard>
);

export default MedicalInformation;
