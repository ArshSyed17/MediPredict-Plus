import React from "react";
import { Lightbulb } from "lucide-react";
import GlassCard from "./ui/GlassCard";

const RecommendationsSection = ({ recommendations }) => (
  <GlassCard title="Recommendations" subtitle="AI-generated lifestyle and care suggestions.">
    <div className="space-y-2">
      {recommendations.map((item) => (
        <div
          key={item}
          className="flex items-start gap-2 rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm text-slate-100"
        >
          <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" />
          {item}
        </div>
      ))}
    </div>
  </GlassCard>
);

export default RecommendationsSection;
