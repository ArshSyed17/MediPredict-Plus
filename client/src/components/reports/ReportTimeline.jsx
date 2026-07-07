import React from "react";
import { CheckCircle2, Circle } from "lucide-react";
import GlassCard from "./ui/GlassCard";

const ReportTimeline = ({ timeline }) => (
  <GlassCard title="Report Timeline" subtitle="Care journey milestones for this assessment.">
    <div className="space-y-0">
      {timeline.map((event, index) => (
        <div key={event.id} className="relative flex gap-3 pb-6 last:pb-0">
          {index < timeline.length - 1 && (
            <span className="absolute left-[11px] top-6 h-full w-px bg-white/10" />
          )}
          <div className="relative z-10 mt-0.5">
            {event.status === "completed" ? (
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            ) : (
              <Circle className="h-5 w-5 text-slate-500" />
            )}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-white">{event.label}</p>
            <p className="text-xs text-slate-400">{new Date(event.date).toLocaleString()}</p>
          </div>
        </div>
      ))}
    </div>
  </GlassCard>
);

export default ReportTimeline;
