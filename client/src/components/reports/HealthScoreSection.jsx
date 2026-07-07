import React from "react";
import { Brain, Sparkles } from "lucide-react";
import GlassCard from "./ui/GlassCard";

const HealthScoreSection = ({ healthScore, aiConfidence, riskCategory }) => (
  <GlassCard title="Overall Health Score" subtitle="Composite wellness index from AI analysis.">
    <div className="grid gap-3 sm:grid-cols-3">
      <div className="rounded-xl border border-cyan-400/30 bg-cyan-500/10 p-4 text-center">
        <Sparkles className="mx-auto mb-2 h-5 w-5 text-cyan-300" />
        <p className="text-xs uppercase tracking-wide text-cyan-200">Health Score</p>
        <p className="text-3xl font-bold text-white">{healthScore}</p>
      </div>
      <div className="rounded-xl border border-white/10 bg-slate-950/40 p-4 text-center">
        <Brain className="mx-auto mb-2 h-5 w-5 text-violet-300" />
        <p className="text-xs uppercase tracking-wide text-slate-400">AI Confidence</p>
        <p className="text-3xl font-bold text-white">{aiConfidence}%</p>
      </div>
      <div className="rounded-xl border border-white/10 bg-slate-950/40 p-4 text-center">
        <p className="text-xs uppercase tracking-wide text-slate-400">Risk Category</p>
        <p className="mt-4 text-2xl font-semibold text-white">{riskCategory}</p>
      </div>
    </div>
  </GlassCard>
);

export default HealthScoreSection;
