import React, { useState } from "react";
import { Download, LoaderCircle } from "lucide-react";
import GlassCard from "../profile/ui/GlassCard";
import { exportUserData } from "../../services/settingsService";

const DataExport = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleExport = async () => {
    setLoading(true);
    await exportUserData();
    setMessage("Your data has been downloaded successfully.");
    setLoading(false);
    setTimeout(() => setMessage(""), 4000);
  };

  return (
    <GlassCard title="Download My Data" subtitle="Export all your MediPredict+ health data.">
      <p className="mb-4 text-sm text-slate-300">
        Receive a JSON file containing your profile, predictions, simulations, reports, and settings.
      </p>
      {message && <p className="mb-3 text-sm text-emerald-300">{message}</p>}
      <button
        type="button"
        onClick={handleExport}
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10 disabled:opacity-60"
      >
        {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
        {loading ? "Preparing Export..." : "Download My Data"}
      </button>
    </GlassCard>
  );
};

export default DataExport;
