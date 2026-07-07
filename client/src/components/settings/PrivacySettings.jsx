import React from "react";
import GlassCard from "../profile/ui/GlassCard";

const fieldClass =
  "w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-400/50";

const PrivacySettings = ({ privacy, onChange }) => (
  <GlassCard title="Privacy Settings" subtitle="Control how your health data is used and stored.">
    <div className="space-y-4">
      <label className="flex cursor-pointer items-center justify-between rounded-xl border border-white/10 bg-slate-950/40 px-3 py-3">
        <div>
          <p className="text-sm font-medium text-white">Share Anonymous Analytics</p>
          <p className="text-xs text-slate-400">Help improve AI models with anonymized usage data</p>
        </div>
        <input
          type="checkbox"
          checked={privacy.shareAnalytics}
          onChange={(event) => onChange("shareAnalytics", event.target.checked)}
          className="h-4 w-4 rounded accent-cyan-500"
        />
      </label>

      <div>
        <label className="mb-1 block text-xs text-slate-400">Profile Visibility</label>
        <select
          className={fieldClass}
          value={privacy.profileVisibility}
          onChange={(event) => onChange("profileVisibility", event.target.value)}
        >
          <option value="private">Private</option>
          <option value="care-team">Care Team Only</option>
          <option value="public">Public</option>
        </select>
      </div>

      <div>
        <label className="mb-1 block text-xs text-slate-400">Data Retention</label>
        <select
          className={fieldClass}
          value={privacy.dataRetention}
          onChange={(event) => onChange("dataRetention", event.target.value)}
        >
          <option value="6months">6 Months</option>
          <option value="12months">12 Months</option>
          <option value="24months">24 Months</option>
          <option value="indefinite">Indefinite</option>
        </select>
      </div>
    </div>
  </GlassCard>
);

export default PrivacySettings;
