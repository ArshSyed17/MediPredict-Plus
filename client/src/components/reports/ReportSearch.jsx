import React from "react";
import { Search } from "lucide-react";

const ReportSearch = ({ value, onChange }) => (
  <div className="relative">
    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
    <input
      type="search"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Search by Report ID, disease, or patient..."
      className="w-full rounded-xl border border-white/10 bg-slate-950/60 py-2.5 pl-10 pr-3 text-sm text-white outline-none transition focus:border-cyan-400/50"
    />
  </div>
);

export default ReportSearch;
