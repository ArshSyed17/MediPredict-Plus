import React from "react";
import { Shield } from "lucide-react";
import GlassCard from "./ui/GlassCard";

const RoleManagement = ({ roles }) => (
  <GlassCard title="Role Management" subtitle="Platform roles and user counts.">
    <div className="grid gap-3 sm:grid-cols-3">
      {roles.map((role) => (
        <div key={role.id} className="rounded-xl border border-white/10 bg-slate-950/40 p-4">
          <div className="mb-2 flex items-center gap-2">
            <Shield className="h-4 w-4 text-indigo-300" />
            <span className="font-medium text-white">{role.label}</span>
          </div>
          <p className="text-2xl font-bold text-white">{role.users}</p>
          <p className="text-xs text-slate-400">users assigned</p>
          <p className="mt-2 text-[10px] text-slate-500">{role.permissions.join(", ")}</p>
        </div>
      ))}
    </div>
  </GlassCard>
);

export default RoleManagement;
