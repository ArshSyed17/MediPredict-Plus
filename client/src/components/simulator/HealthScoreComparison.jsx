import React from "react";
import { HealthScoreTrendChart } from "./RiskComparisonChart";
import useAnimatedCounter from "./useAnimatedCounter";

const HealthScoreComparison = ({ trendData, comparison }) => {
  const animatedScore = useAnimatedCounter(comparison.after.healthScore);

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
      <header className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Health Score Trend</h3>
          <p className="text-sm text-slate-300">Projected trajectory from baseline to simulated state.</p>
        </div>
        <div className="rounded-xl border border-cyan-400/30 bg-cyan-500/10 px-4 py-2 text-center">
          <p className="text-xs uppercase tracking-wide text-cyan-200">Current Score</p>
          <p className="text-2xl font-bold text-white">{Math.round(animatedScore)}</p>
        </div>
      </header>
      <HealthScoreTrendChart data={trendData} />
    </section>
  );
};

export default HealthScoreComparison;
