import React from "react";
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import useAnimatedCounter from "./useAnimatedCounter";

const MetricBlock = ({ label, value, suffix = "" }) => {
  const animated = useAnimatedCounter(value || 0);
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/40 p-4 text-center">
      <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-1 text-2xl font-bold text-white">
        {Math.round(animated)}
        {suffix}
      </p>
    </div>
  );
};

const calcAvgRisk = (risks) => {
  if (!risks) return 0;
  const vals = Object.values(risks);
  return vals.length > 0 ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : 0;
};

const BeforeAfterComparison = ({ comparison }) => {
  if (!comparison || !comparison.before || !comparison.after) return null;

  const { before, after } = comparison;

  const healthScoreDelta = (after.healthScore || 0) - (before.healthScore || 0);
  const avgRiskBefore = calcAvgRisk(before.diseaseRisks);
  const avgRiskAfter = calcAvgRisk(after.diseaseRisks);
  const avgRiskDelta = avgRiskBefore - avgRiskAfter; // positive = risk decreased = improvement
  const improvement = healthScoreDelta >= 0;

  const DeltaIcon = healthScoreDelta > 0 ? ArrowUpRight : healthScoreDelta < 0 ? ArrowDownRight : Minus;

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
    >
      <header className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Before / After</h3>
          <p className="text-sm text-slate-300">Live delta from your baseline profile.</p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            improvement ? "bg-emerald-500/20 text-emerald-300" : "bg-amber-500/20 text-amber-300"
          }`}
        >
          {improvement ? "Improving" : "Needs Attention"}
        </span>
      </header>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-slate-950/50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Before</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <MetricBlock label="Health Score" value={before.healthScore} />
            <MetricBlock label="Avg Risk" value={avgRiskBefore} suffix="%" />
          </div>
        </div>
        <div className="rounded-xl border border-teal-400/30 bg-teal-500/10 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-teal-200">After</p>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <MetricBlock label="Health Score" value={after.healthScore} />
            <MetricBlock label="Avg Risk" value={avgRiskAfter} suffix="%" />
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm">
          <DeltaIcon className={`h-4 w-4 ${healthScoreDelta >= 0 ? "text-emerald-300" : "text-rose-300"}`} />
          <span className="text-slate-300">Health Score Difference:</span>
          <span className={`font-semibold ${healthScoreDelta >= 0 ? "text-emerald-300" : "text-rose-300"}`}>
            {healthScoreDelta > 0 ? "+" : ""}
            {healthScoreDelta}
          </span>
        </div>
        <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm">
          <DeltaIcon className={`h-4 w-4 ${avgRiskDelta >= 0 ? "text-emerald-300" : "text-rose-300"}`} />
          <span className="text-slate-300">Risk Reduction:</span>
          <span className={`font-semibold ${avgRiskDelta >= 0 ? "text-emerald-300" : "text-rose-300"}`}>
            {avgRiskDelta > 0 ? "-" : "+"}
            {Math.abs(avgRiskDelta).toFixed(1)}%
          </span>
        </div>
      </div>
    </motion.section>
  );
};

export default BeforeAfterComparison;
