import React from "react";
import GlassCard from "../profile/ui/GlassCard";

const fieldClass =
  "w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-400/50";

const AccountSettings = ({ account, onChange }) => (
  <GlassCard title="Account Settings" subtitle="Manage your account preferences.">
    <div className="grid gap-4 sm:grid-cols-2">
      <div>
        <label className="mb-1 block text-xs text-slate-400">Email Address</label>
        <input
          className={fieldClass}
          value={account.email}
          onChange={(event) => onChange("email", event.target.value)}
        />
      </div>
      <div>
        <label className="mb-1 block text-xs text-slate-400">Language</label>
        <select
          className={fieldClass}
          value={account.language}
          onChange={(event) => onChange("language", event.target.value)}
        >
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
        </select>
      </div>
      <div className="sm:col-span-2">
        <label className="mb-1 block text-xs text-slate-400">Timezone</label>
        <select
          className={fieldClass}
          value={account.timezone}
          onChange={(event) => onChange("timezone", event.target.value)}
        >
          <option value="America/Los_Angeles">Pacific Time (PT)</option>
          <option value="America/New_York">Eastern Time (ET)</option>
          <option value="Europe/London">GMT (London)</option>
          <option value="Asia/Kolkata">India Standard Time</option>
        </select>
      </div>
    </div>
  </GlassCard>
);

export default AccountSettings;
