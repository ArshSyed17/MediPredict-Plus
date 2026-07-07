import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import SettingsHeader from "../../components/settings/SettingsHeader";
import AccountSettings from "../../components/settings/AccountSettings";
import SecuritySettings from "../../components/settings/SecuritySettings";
import NotificationSettings from "../../components/settings/NotificationSettings";
import ThemeSettings from "../../components/settings/ThemeSettings";
import PrivacySettings from "../../components/settings/PrivacySettings";
import ConnectedDevices from "../../components/settings/ConnectedDevices";
import DataExport from "../../components/settings/DataExport";
import DeleteAccountModal from "../../components/settings/DeleteAccountModal";
import {
  deleteAccount,
  fetchSettings,
  toggleDeviceConnection,
  updateSettings,
} from "../../services/settingsService";

const SettingsPage = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchSettings();
        setSettings(data || {});
      } catch {
        setSettings({});
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const patchSection = async (section, data) => {
    const updated = await updateSettings(section, data);
    setSettings(updated);
  };

  const handleNotificationChange = async (channel, key, value) => {
    const updated = await updateSettings("notifications", {
      [channel]: { ...settings.notifications[channel], [key]: value },
    });
    setSettings(updated);
  };

  const handleDeviceToggle = async (deviceId) => {
    const updated = await toggleDeviceConnection(deviceId);
    setSettings(updated);
  };

  const handleDeleteAccount = async () => {
    setDeleting(true);
    await deleteAccount();
    setDeleting(false);
    navigate("/");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-teal-950/80 to-slate-950 text-slate-400">
        Loading settings...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-teal-950/80 to-slate-950">
      <div className="pointer-events-none fixed inset-0 opacity-5">
        <div className="absolute inset-0 bg-grid-pattern" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <SettingsHeader />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-5"
        >
          <AccountSettings
            account={settings.account}
            onChange={(key, value) => patchSection("account", { [key]: value })}
          />
          <SecuritySettings
            security={settings.security}
            onToggle2FA={() =>
              patchSection("security", { twoFactorEnabled: !settings.security.twoFactorEnabled })
            }
          />
          <NotificationSettings
            notifications={settings.notifications}
            onChange={handleNotificationChange}
          />
          <ThemeSettings />
          <PrivacySettings
            privacy={settings.privacy}
            onChange={(key, value) => patchSection("privacy", { [key]: value })}
          />
          <ConnectedDevices devices={settings.connectedDevices} onToggle={handleDeviceToggle} />
          <DataExport />

          <section className="rounded-2xl border border-rose-400/20 bg-rose-500/5 p-5 backdrop-blur-xl">
            <h3 className="text-lg font-semibold text-rose-200">Danger Zone</h3>
            <p className="mt-1 text-sm text-slate-300">Permanently delete your account and all associated data.</p>
            <button
              type="button"
              onClick={() => setDeleteOpen(true)}
              className="mt-4 rounded-xl bg-rose-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-500"
            >
              Delete Account
            </button>
          </section>
        </motion.div>
      </div>

      <DeleteAccountModal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDeleteAccount}
        loading={deleting}
      />
    </div>
  );
};

export default SettingsPage;
