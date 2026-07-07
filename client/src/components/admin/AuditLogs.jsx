import React from "react";
import { Activity, FileText, Key, LogIn, Settings } from "lucide-react";
import GlassCard from "./ui/GlassCard";

const typeConfig = {
  login: { icon: LogIn, color: "text-cyan-300" },
  role: { icon: Key, color: "text-violet-300" },
  prediction: { icon: Activity, color: "text-amber-300" },
  report: { icon: FileText, color: "text-emerald-300" },
  system: { icon: Settings, color: "text-slate-300" },
};

const AuditLogs = ({ logs }) => (
  <GlassCard title="Audit Logs" subtitle="Login history, role changes, and system events.">
    <div className="space-y-2 max-h-96 overflow-y-auto">
      {logs.map((log) => {
        const config = typeConfig[log.type] ?? typeConfig.system;
        const Icon = config.icon;
        return (
          <div key={log.id} className="flex items-start gap-3 rounded-xl border border-white/10 bg-slate-950/40 p-3">
            <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${config.color}`} />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white">{log.action}</p>
              <p className="text-xs text-slate-400">{log.user} • {log.ip}</p>
              <p className="text-[10px] text-slate-500">{new Date(log.timestamp).toLocaleString()}</p>
            </div>
          </div>
        );
      })}
    </div>
  </GlassCard>
);

export default AuditLogs;
