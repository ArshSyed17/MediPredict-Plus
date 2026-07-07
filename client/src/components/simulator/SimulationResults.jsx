import React from "react";
import { motion } from "framer-motion";
import { Brain, ShieldAlert, Sparkles } from "lucide-react";
import { DISEASES } from "../../data/simulatorMockData";
import useAnimatedCounter from "./useAnimatedCounter";
import HealthParameterCard from "./HealthParameterCard";

const riskTone = (category) => {
  if (category === "High") return "text-rose-300 bg-rose-500/15 border-rose-400/30";
  if (category === "Moderate") return "text-amber-300 bg-amber-500/15 border-amber-400/30";
  return "text-emerald-300 bg-emerald-500/15 border-emerald-400/30";
};

const SimulationResults = ({ result }) => {
  const animatedScore = useAnimatedCounter(result.healthScore);
  const animatedConfidence = useAnimatedCounter(result.aiConfidence);

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
    >
      <header className="mb-4">
        <h3 className="text-lg font-semibold text-white">Live Simulation Results</h3>
        <p className="text-sm text-slate-300">Metrics update instantly as you adjust controls.</p>
      </header>

      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        <HealthParameterCard label="Health Score" value={Math.round(animatedScore)} unit="/100" icon={Sparkles} />
        <HealthParameterCard
          label="AI Confidence"
          value={animatedConfidence.toFixed(1)}
          unit="%"
          icon={Brain}
        />
        <div className={`rounded-xl border p-3 ${riskTone(result.riskCategory)}`}>
          <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-wide">
            <ShieldAlert className="h-4 w-4" />
            Risk Category
          </div>
          <p className="text-xl font-semibold">{result.riskCategory}</p>
        </div>
      </div>

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {DISEASES.map((disease) => (
          <div key={disease.id} className="rounded-xl border border-white/10 bg-slate-950/40 p-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-slate-200">{disease.label}</span>
              <span className="text-sm font-semibold text-white">{result.diseaseRisks[disease.id]}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-800">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: disease.color }}
                initial={{ width: 0 }}
                animate={{ width: `${result.diseaseRisks[disease.id]}%` }}
                transition={{ duration: 0.45 }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default SimulationResults;
