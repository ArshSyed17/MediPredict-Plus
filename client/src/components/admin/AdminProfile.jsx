import React from "react";
import { Mail, Shield } from "lucide-react";
import GlassCard from "./ui/GlassCard";

const AdminProfile = ({ admin }) => (
  <div className="space-y-5">
    <GlassCard title="Admin Profile">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 text-2xl font-bold text-white">
          {admin.avatarInitials}
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">{admin.name}</h2>
          <p className="text-sm text-indigo-300">{admin.role}</p>
          <p className="mt-2 flex items-center gap-2 text-sm text-slate-300">
            <Mail className="h-4 w-4" />
            {admin.email}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Last login: {new Date(admin.lastLogin).toLocaleString()}
          </p>
        </div>
      </div>
    </GlassCard>
    <GlassCard title="Access Level">
      <div className="flex items-center gap-3 rounded-xl border border-indigo-400/20 bg-indigo-500/10 p-4">
        <Shield className="h-6 w-6 text-indigo-300" />
        <div>
          <p className="font-medium text-white">Super Administrator</p>
          <p className="text-sm text-slate-300">Full platform access and configuration rights</p>
        </div>
      </div>
    </GlassCard>
  </div>
);

export default AdminProfile;
