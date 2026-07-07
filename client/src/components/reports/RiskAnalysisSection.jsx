import React from "react";
import { motion } from "framer-motion";
import GlassCard from "./ui/GlassCard";

const diseaseLabels = {
  diabetes: "Diabetes",
  hypertension: "Hypertension",
  heartDisease: "Heart Disease",
  stroke: "Stroke",
  ckd: "CKD",
  liverDisease: "Liver Disease",
};

const riskColor = (value) => {
  if (value >= 40) return "bg-rose-500";
  if (value >= 25) return "bg-amber-500";
  return "bg-emerald-500";
};

const RiskAnalysisSection = ({ diseaseRisks }) => (
  <GlassCard title="Disease Risk Summary" subtitle="AI-predicted risk levels across supported conditions.">
    <div className="grid gap-3 sm:grid-cols-2">
      {Object.entries(diseaseRisks).map(([key, value]) => (
        <div key={key} className="rounded-xl border border-white/10 bg-slate-950/40 p-3">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-slate-200">{diseaseLabels[key] ?? key}</span>
            <span className="font-semibold text-white">{value}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-800">
            <motion.div
              className={`h-full rounded-full ${riskColor(value)}`}
              initial={{ width: 0 }}
              animate={{ width: `${value}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      ))}
    </div>
  </GlassCard>
);

export default RiskAnalysisSection;
