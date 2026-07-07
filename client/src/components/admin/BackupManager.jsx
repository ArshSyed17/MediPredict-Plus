import React, { useState } from "react";
import { Database, Download, LoaderCircle, RotateCcw } from "lucide-react";
import GlassCard from "./ui/GlassCard";

const BackupManager = ({ backups, onRunBackup, onExport }) => {
  const [backing, setBacking] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [restoreMsg, setRestoreMsg] = useState("");

  const handleBackup = async () => {
    setBacking(true);
    await onRunBackup();
    setBacking(false);
  };

  const handleExport = async () => {
    setExporting(true);
    await onExport();
    setExporting(false);
  };

  const handleRestore = () => {
    setRestoreMsg("Restore UI: Select a backup and confirm to restore. (Mock — no data modified)");
    setTimeout(() => setRestoreMsg(""), 4000);
  };

  return (
    <div className="space-y-5">
      <GlassCard title="Backup Manager" subtitle="Database backups and data export.">
        <div className="mb-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleBackup}
            disabled={backing}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
          >
            {backing ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Database className="h-4 w-4" />}
            {backing ? "Running Backup..." : "Run Database Backup"}
          </button>
          <button
            type="button"
            onClick={handleExport}
            disabled={exporting}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 disabled:opacity-60"
          >
            {exporting ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
            Export Data
          </button>
          <button
            type="button"
            onClick={handleRestore}
            className="inline-flex items-center gap-2 rounded-xl border border-amber-400/30 bg-amber-500/10 px-4 py-2 text-sm text-amber-200"
          >
            <RotateCcw className="h-4 w-4" />
            Restore UI
          </button>
        </div>
        {restoreMsg && <p className="mb-4 text-sm text-amber-300">{restoreMsg}</p>}
        <div className="space-y-2">
          {backups.map((bk) => (
            <div key={bk.id} className="flex items-center justify-between rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2">
              <div>
                <p className="text-sm font-medium text-white">{bk.id}</p>
                <p className="text-xs text-slate-400">{new Date(bk.date).toLocaleString()} • {bk.size} • {bk.type}</p>
              </div>
              <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs text-emerald-300">{bk.status}</span>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
};

export default BackupManager;
