import React from "react";
import GlassCard from "./ui/GlassCard";

const fieldClass = "w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-white outline-none focus:border-indigo-400/50";

const SystemSettings = ({ settings, onChange }) => (
  <div className="space-y-5">
    <GlassCard title="General Settings">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-xs text-slate-400">Platform Name</label>
          <input className={fieldClass} value={settings.platformName} onChange={(e) => onChange("platformName", e.target.value)} />
        </div>
        <div>
          <label className="mb-1 block text-xs text-slate-400">Support Email</label>
          <input className={fieldClass} value={settings.supportEmail} onChange={(e) => onChange("supportEmail", e.target.value)} />
        </div>
      </div>
    </GlassCard>

    <GlassCard title="Notification Settings">
      <div className="space-y-3">
        {[
          ["emailNotifications", "Email Notifications"],
          ["smsNotifications", "SMS Notifications"],
          ["maintenanceMode", "Maintenance Mode"],
          ["twoFactorRequired", "Require Two-Factor Auth"],
        ].map(([key, label]) => (
          <label key={key} className="flex cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-slate-950/40 px-3 py-3">
            <span className="text-sm text-slate-200">{label}</span>
            <input
              type="checkbox"
              checked={settings[key]}
              onChange={(e) => onChange(key, e.target.checked)}
              className="h-4 w-4 rounded accent-indigo-500"
            />
          </label>
        ))}
      </div>
    </GlassCard>

    <GlassCard title="Security Settings">
      <div>
        <label className="mb-1 block text-xs text-slate-400">Session Timeout (minutes)</label>
        <input
          type="number"
          className={fieldClass}
          value={settings.sessionTimeout}
          onChange={(e) => onChange("sessionTimeout", Number(e.target.value))}
        />
      </div>
    </GlassCard>
  </div>
);

export default SystemSettings;
