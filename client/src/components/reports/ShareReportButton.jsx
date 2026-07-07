import React, { useState } from "react";
import { LoaderCircle, Share2 } from "lucide-react";
import { shareReport } from "../../services/reportsService";

const ShareReportButton = ({ report, onShared }) => {
  const [loading, setLoading] = useState(false);

  const handleShare = async () => {
    setLoading(true);
    const result = await shareReport(report);
    onShared?.(result);
    setLoading(false);
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      disabled={loading}
      className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 transition hover:bg-white/10 disabled:opacity-60"
    >
      {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Share2 className="h-4 w-4" />}
      Share
    </button>
  );
};

export default ShareReportButton;
