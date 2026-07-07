import React from "react";
import GlassCard from "./ui/GlassCard";

const ActivityLogs = ({ logs }) => (
  <GlassCard title="Activity Feed" subtitle="Recent platform activity.">
    <div className="space-y-2">
      {logs.map((log) => (
        <div key={log.id} className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2">
          <p className="text-sm text-slate-200">{log.message}</p>
          <span className="shrink-0 text-[10px] text-slate-500">{new Date(log.time).toLocaleString()}</span>
        </div>
      ))}
    </div>
  </GlassCard>
);

export default ActivityLogs;
