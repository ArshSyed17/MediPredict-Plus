import React from "react";
import { TrendingDown, TrendingUp } from "lucide-react";

const SimulationSummary = ({ comparison, bmi }) => {
  // Guard against undefined comparison
  if (!comparison || !comparison.before || !comparison.after) {
    return null;
  }

  const { before, after } = comparison;
  const healthScoreDelta = (after.healthScore || 0) - (before.healthScore || 0);

  // Compute average risk shift from diseaseRisks
  const calcAvgRisk = (risks) => {
    if (!risks) return 0;
    const vals = Object.values(risks);
    return vals.length > 0 ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
  };
  const avgRiskBefore = calcAvgRisk(before.diseaseRisks);
  const avgRiskAfter = calcAvgRisk(after.diseaseRisks);
  const avgRiskDelta = avgRiskBefore - avgRiskAfter; // Positive = improvement (risk went down)

  const highlights = [
    {
      label: "BMI",
      value: bmi,
      detail: bmi >= 25 ? "Focus on gradual weight optimization." : "Within healthy range.",
    },
    {
      label: "Health Score Shift",
      value: `${healthScoreDelta > 0 ? "+" : ""}${healthScoreDelta}`,
      detail: `From ${before.healthScore} to ${after.healthScore}`,
      positive: healthScoreDelta >= 0,
    },
    {
      label: "Average Risk Shift",
      value: `${avgRiskDelta > 0 ? "-" : "+"}${Math.abs(avgRiskDelta).toFixed(1)}%`,
      detail: `Category: ${after.riskCategory || "Low"}`,
      positive: avgRiskDelta >= 0,
    },
  ];

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
      <header className="mb-4">
        <h3 className="text-lg font-semibold text-white">Simulation Summary</h3>
        <p className="text-sm text-slate-300">Key outcomes from your current scenario.</p>
      </header>

      <div className="space-y-3">
        {highlights.map((item) => (
          <div key={item.label} className="flex items-start justify-between rounded-xl border border-white/10 bg-slate-950/40 p-3">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">{item.label}</p>
              <p className="mt-1 text-sm text-slate-300">{item.detail}</p>
            </div>
            <div className="flex items-center gap-1 text-lg font-semibold text-white">
              {item.positive === true && <TrendingUp className="h-4 w-4 text-emerald-300" />}
              {item.positive === false && <TrendingDown className="h-4 w-4 text-rose-300" />}
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SimulationSummary;
