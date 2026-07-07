import React, { useState } from "react";
import { Download, LoaderCircle } from "lucide-react";
import { downloadReportPdf } from "../../services/reportsService";

const DownloadReportButton = ({ report }) => {
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    await downloadReportPdf(report);
    setLoading(false);
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={loading}
      className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 transition hover:bg-white/10 disabled:opacity-60"
    >
      {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
      {loading ? "Preparing..." : "Download PDF"}
    </button>
  );
};

export default DownloadReportButton;
