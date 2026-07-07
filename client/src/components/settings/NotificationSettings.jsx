import React from "react";
import { Bell, Mail, MessageSquare } from "lucide-react";
import GlassCard from "../profile/ui/GlassCard";

const Toggle = ({ checked, onChange, label }) => (
  <label className="flex cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2">
    <span className="text-sm text-slate-200">{label}</span>
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 rounded-full transition ${checked ? "bg-cyan-500" : "bg-slate-600"}`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${checked ? "left-5" : "left-0.5"}`}
      />
    </button>
  </label>
);

const NotificationGroup = ({ title, icon: Icon, prefs, onChange }) => (
  <div>
    <div className="mb-3 flex items-center gap-2 text-sm font-medium text-white">
      <Icon className="h-4 w-4 text-cyan-300" />
      {title}
    </div>
    <div className="space-y-2">
      {Object.entries(prefs).map(([key, value]) => (
        <Toggle
          key={key}
          label={key.charAt(0).toUpperCase() + key.slice(1)}
          checked={value}
          onChange={(next) => onChange(key, next)}
        />
      ))}
    </div>
  </div>
);

const NotificationSettings = ({ notifications, onChange }) => (
  <GlassCard title="Notification Preferences" subtitle="Choose how you receive health updates.">
    <div className="mb-3 flex items-center gap-2 text-cyan-300">
      <Bell className="h-5 w-5" />
      <span className="text-sm">Delivery Channels</span>
    </div>
    <div className="grid gap-6 lg:grid-cols-2">
      <NotificationGroup
        title="Email Notifications"
        icon={Mail}
        prefs={notifications.email}
        onChange={(key, value) => onChange("email", key, value)}
      />
      <NotificationGroup
        title="SMS Notifications"
        icon={MessageSquare}
        prefs={notifications.sms}
        onChange={(key, value) => onChange("sms", key, value)}
      />
    </div>
  </GlassCard>
);

export default NotificationSettings;
