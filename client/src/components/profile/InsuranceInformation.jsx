import React from "react";
import { Shield } from "lucide-react";
import GlassCard from "./ui/GlassCard";

const InsuranceInformation = ({ insurance }) => (
  <GlassCard title="Insurance Information" subtitle="Coverage details for clinical services.">
    <div className="mb-3 flex items-center gap-2 text-cyan-300">
      <Shield className="h-5 w-5" />
      <span className="font-medium text-white">{insurance.provider}</span>
    </div>
    <div className="grid gap-2 sm:grid-cols-2">
      {[
        ["Policy Number", insurance.policyNumber],
        ["Group Number", insurance.groupNumber],
        ["Valid Until", new Date(insurance.validUntil).toLocaleDateString()],
      ].map(([label, value]) => (
        <div key={label} className="rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2">
          <p className="text-xs text-slate-400">{label}</p>
          <p className="text-sm font-medium text-white">{value}</p>
        </div>
      ))}
    </div>
  </GlassCard>
);

export default InsuranceInformation;
