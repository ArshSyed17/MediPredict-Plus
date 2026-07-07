import React from "react";
import { Printer } from "lucide-react";
import { printReport } from "../../services/reportsService";

const PrintReportButton = ({ report }) => (
  <button
    type="button"
    onClick={() => printReport(report.id)}
    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 transition hover:bg-white/10 print:hidden"
  >
    <Printer className="h-4 w-4" />
    Print
  </button>
);

export default PrintReportButton;
