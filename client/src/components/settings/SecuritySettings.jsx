import React, { useState } from "react";
import { Key, ShieldCheck, LoaderCircle } from "lucide-react";
import GlassCard from "../profile/ui/GlassCard";
import { changePassword } from "../../services/settingsService";

const fieldClass =
  "w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2.5 text-sm text-white outline-none focus:border-cyan-400/50";

const SecuritySettings = ({ security, onToggle2FA }) => {
  const [passwordForm, setPasswordForm] = useState({ current: "", next: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handlePasswordChange = async (event) => {
    event.preventDefault();
    if (passwordForm.next !== passwordForm.confirm) {
      setMessage("Passwords do not match.");
      return;
    }
    setLoading(true);
    await changePassword();
    setMessage("Password updated successfully.");
    setPasswordForm({ current: "", next: "", confirm: "" });
    setLoading(false);
  };

  return (
    <GlassCard title="Security Settings" subtitle="Protect your account with strong credentials.">
      <div className="mb-5 flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/40 p-4">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-5 w-5 text-emerald-300" />
          <div>
            <p className="text-sm font-medium text-white">Two-Factor Authentication</p>
            <p className="text-xs text-slate-400">Add an extra layer of security to your account</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onToggle2FA}
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            security.twoFactorEnabled
              ? "bg-emerald-500/20 text-emerald-300"
              : "bg-slate-700 text-slate-300"
          }`}
        >
          {security.twoFactorEnabled ? "Enabled" : "Disabled"}
        </button>
      </div>

      <p className="mb-3 text-xs text-slate-400">
        Last password change: {new Date(security.lastPasswordChange).toLocaleDateString()}
      </p>

      <form onSubmit={handlePasswordChange} className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <Key className="h-4 w-4 text-cyan-300" />
          Change Password
        </div>
        {["current", "next", "confirm"].map((field) => (
          <input
            key={field}
            type="password"
            placeholder={field === "current" ? "Current password" : field === "next" ? "New password" : "Confirm password"}
            className={fieldClass}
            value={passwordForm[field]}
            onChange={(event) => setPasswordForm((prev) => ({ ...prev, [field]: event.target.value }))}
          />
        ))}
        {message && <p className="text-sm text-cyan-300">{message}</p>}
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
        >
          {loading && <LoaderCircle className="h-4 w-4 animate-spin" />}
          Update Password
        </button>
      </form>
    </GlassCard>
  );
};

export default SecuritySettings;
