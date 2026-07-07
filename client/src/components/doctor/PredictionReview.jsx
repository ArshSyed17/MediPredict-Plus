import React from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Brain, ShieldAlert } from "lucide-react";
import GlassCard from "./ui/GlassCard";

const PredictionReview = ({ prediction }) => (
  <div className="space-y-5">
    <GlassCard title="Prediction Review" subtitle={`${prediction.disease} — AI Assessment`}>
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-rose-400/20 bg-rose-500/10 p-4 text-center">
          <ShieldAlert className="mx-auto mb-2 h-5 w-5 text-rose-300" />
          <p className="text-xs text-slate-400">Disease Risk</p>
          <p className="text-2xl font-bold text-white">{prediction.risk}%</p>
        </div>
        <div className="rounded-xl border border-cyan-400/20 bg-cyan-500/10 p-4 text-center">
          <Brain className="mx-auto mb-2 h-5 w-5 text-cyan-300" />
          <p className="text-xs text-slate-400">AI Confidence</p>
          <p className="text-2xl font-bold text-white">{prediction.confidence}%</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-slate-950/40 p-4 text-center">
          <p className="text-xs text-slate-400">Disease</p>
          <p className="mt-2 text-lg font-semibold text-white">{prediction.disease}</p>
        </div>
      </div>
    </GlassCard>

    <GlassCard title="Explainable AI Summary" subtitle="Feature contribution to risk score.">
      <div className="h-56">
        <ResponsiveContainer>
          <BarChart data={prediction.factors} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis type="number" stroke="#cbd5e1" />
            <YAxis dataKey="factor" type="category" width={100} stroke="#cbd5e1" tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={{ backgroundColor: "#0f172a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px" }} />
            <Bar dataKey="contribution" fill="#22d3ee" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>

    <GlassCard title="Recommendation History">
      <div className="space-y-2">
        {prediction.recommendations.map((rec) => (
          <div key={rec} className="rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm text-slate-100">
            {rec}
          </div>
        ))}
      </div>
    </GlassCard>
  </div>
);

export default PredictionReview;
