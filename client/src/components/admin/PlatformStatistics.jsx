import React from "react";
import GlassCard from "./ui/GlassCard";

const PlatformStatistics = ({ platform }) => (
  <GlassCard title="Platform Statistics" subtitle="Real-time platform performance metrics.">
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {[
        ["Daily Active Users", platform.dailyActiveUsers],
        ["Weekly Predictions", platform.weeklyPredictions.toLocaleString()],
        ["Avg Response Time", platform.avgResponseTime],
        ["Error Rate", `${platform.errorRate}%`],
      ].map(([label, value]) => (
        <div key={label} className="rounded-xl border border-white/10 bg-slate-950/40 p-3 text-center">
          <p className="text-xs text-slate-400">{label}</p>
          <p className="mt-1 text-lg font-semibold text-white">{value}</p>
        </div>
      ))}
    </div>
  </GlassCard>
);

export default PlatformStatistics;
