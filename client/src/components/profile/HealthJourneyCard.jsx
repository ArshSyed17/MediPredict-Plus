import React from "react";
import { Activity, FileText, Sparkles, TrendingUp } from "lucide-react";
import GlassCard from "./ui/GlassCard";

const typeConfig = {
  milestone: { icon: Sparkles, color: "text-violet-300 bg-violet-500/20" },
  prediction: { icon: Activity, color: "text-cyan-300 bg-cyan-500/20" },
  simulation: { icon: TrendingUp, color: "text-emerald-300 bg-emerald-500/20" },
  improvement: { icon: TrendingUp, color: "text-amber-300 bg-amber-500/20" },
  report: { icon: FileText, color: "text-blue-300 bg-blue-500/20" },
};

const HealthJourneyCard = ({ journey }) => (
  <GlassCard title="Health Journey" subtitle="Timeline of your MediPredict+ milestones.">
    <div className="space-y-0">
      {journey.map((event, index) => {
        const config = typeConfig[event.type] ?? typeConfig.milestone;
        const Icon = config.icon;
        return (
          <div key={event.id} className="relative flex gap-3 pb-5 last:pb-0">
            {index < journey.length - 1 && (
              <span className="absolute left-[15px] top-8 h-full w-px bg-white/10" />
            )}
            <div className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${config.color}`}>
              <Icon className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-white">{event.title}</p>
              <p className="text-xs text-slate-400">{new Date(event.date).toLocaleDateString()}</p>
            </div>
          </div>
        );
      })}
    </div>
  </GlassCard>
);

export default HealthJourneyCard;
