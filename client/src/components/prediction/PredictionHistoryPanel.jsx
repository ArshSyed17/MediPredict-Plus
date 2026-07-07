import React from "react";
import { History } from "lucide-react";
import GlassCard from "./ui/GlassCard";

const PredictionHistoryPanel = ({ history }) => (
  <GlassCard title="Prediction History" subtitle="Recently saved AI assessments.">
    <div className="space-y-2">
      {history.length === 0 && (
        <div className="flex items-center gap-2 rounded-lg border border-dashed border-white/20 p-3 text-sm text-slate-300">
          <History className="h-4 w-4" /> No saved predictions yet.
        </div>
      )}
      {history.map((item) => (
        <div key={item.id} className="rounded-xl border border-white/10 bg-slate-950/40 p-3">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-white">{item.disease}</span>
            <span className="text-slate-300">{item.risk}% risk</span>
          </div>
          <p className="mt-1 text-xs text-slate-400">{new Date(item.generatedAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  </GlassCard>
);

export default PredictionHistoryPanel;
