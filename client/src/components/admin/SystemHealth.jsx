import React from "react";
import { motion } from "framer-motion";
import { Cpu, Database, HardDrive, Server } from "lucide-react";
import GlassCard from "./ui/GlassCard";

const StatusBadge = ({ status }) => (
  <span className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${
    status === "operational" ? "bg-emerald-500/20 text-emerald-300" : "bg-rose-500/20 text-rose-300"
  }`}>
    {status}
  </span>
);

const UsageBar = ({ label, used, total, icon: Icon }) => {
  const pct = Math.round((used / total) * 100);
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950/40 p-4">
      <div className="mb-2 flex items-center justify-between">
        <span className="flex items-center gap-2 text-sm text-slate-300">
          <Icon className="h-4 w-4 text-indigo-300" />
          {label}
        </span>
        <span className="text-sm font-medium text-white">{pct}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-800">
        <motion.div
          className={`h-full rounded-full ${pct > 80 ? "bg-rose-500" : pct > 60 ? "bg-amber-500" : "bg-emerald-500"}`}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
};

const SystemHealth = ({ health }) => (
  <div className="space-y-5">
    <div className="grid gap-4 sm:grid-cols-2">
      <GlassCard title="API Status">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-slate-400">Status</span><StatusBadge status={health.api.status} /></div>
          <div className="flex justify-between"><span className="text-slate-400">Latency</span><span className="text-white">{health.api.latency}</span></div>
          <div className="flex justify-between"><span className="text-slate-400">Uptime</span><span className="text-emerald-300">{health.api.uptime}%</span></div>
        </div>
      </GlassCard>
      <GlassCard title="Database Status">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-slate-400">Status</span><StatusBadge status={health.database.status} /></div>
          <div className="flex justify-between"><span className="text-slate-400">Connections</span><span className="text-white">{health.database.connections}</span></div>
          <div className="flex justify-between"><span className="text-slate-400">Uptime</span><span className="text-emerald-300">{health.database.uptime}%</span></div>
        </div>
      </GlassCard>
    </div>
    <div className="grid gap-4 sm:grid-cols-3">
      <UsageBar label="Storage" used={health.storage.used} total={health.storage.total} icon={HardDrive} />
      <UsageBar label="Memory" used={health.memory.used} total={health.memory.total} icon={Server} />
      <UsageBar label="CPU" used={health.cpu.used} total={health.cpu.total} icon={Cpu} />
    </div>
  </div>
);

export default SystemHealth;
