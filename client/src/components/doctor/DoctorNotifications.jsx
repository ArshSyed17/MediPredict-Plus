import React from "react";
import { Activity, AlertTriangle, Bell, Calendar, FileText } from "lucide-react";
import GlassCard from "./ui/GlassCard";

const typeConfig = {
  prediction: { icon: Activity, color: "text-cyan-300 bg-cyan-500/20" },
  alert: { icon: AlertTriangle, color: "text-rose-300 bg-rose-500/20" },
  appointment: { icon: Calendar, color: "text-violet-300 bg-violet-500/20" },
  report: { icon: FileText, color: "text-amber-300 bg-amber-500/20" },
};

const DoctorNotifications = ({ notifications, onMarkRead, compact = false }) => (
  <GlassCard
    title="Notifications"
    subtitle={compact ? "Recent alerts" : "All system notifications"}
  >
    <div className="space-y-2">
      {notifications.length === 0 && (
        <p className="py-6 text-center text-sm text-slate-400">No notifications.</p>
      )}
      {notifications.map((n) => {
        const config = typeConfig[n.type] ?? { icon: Bell, color: "text-slate-300 bg-slate-700" };
        const Icon = config.icon;
        return (
          <button
            key={n.id}
            type="button"
            onClick={() => !n.read && onMarkRead?.(n.id)}
            className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left transition ${
              n.read
                ? "border-white/5 bg-slate-950/20 opacity-70"
                : "border-white/10 bg-slate-950/40 hover:border-cyan-400/30"
            }`}
          >
            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${config.color}`}>
              <Icon className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">{n.title}</p>
              <p className="text-xs text-slate-400">{n.message}</p>
              <p className="mt-1 text-[10px] text-slate-500">
                {new Date(n.time).toLocaleString()}
              </p>
            </div>
            {!n.read && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-cyan-400" />}
          </button>
        );
      })}
    </div>
  </GlassCard>
);

export default DoctorNotifications;
