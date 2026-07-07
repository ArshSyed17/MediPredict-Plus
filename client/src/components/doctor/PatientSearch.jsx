import React from "react";
import { Search } from "lucide-react";

const PatientSearch = ({ value, onChange, risk, onRiskChange, sort, onSortChange }) => (
  <div className="space-y-3">
    <div className="relative">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search patients by name, ID, or condition..."
        className="w-full rounded-xl border border-white/10 bg-slate-950/60 py-2.5 pl-10 pr-3 text-sm text-white outline-none focus:border-cyan-400/50"
      />
    </div>
    <div className="grid gap-3 sm:grid-cols-2">
      <select
        value={risk}
        onChange={(e) => onRiskChange(e.target.value)}
        className="rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-white outline-none"
      >
        <option value="all">All Risk Levels</option>
        <option value="High">High Risk</option>
        <option value="Moderate">Moderate Risk</option>
        <option value="Low">Low Risk</option>
      </select>
      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
        className="rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-white outline-none"
      >
        <option value="name">Name (A-Z)</option>
        <option value="risk">Risk (High First)</option>
        <option value="recent">Recent Visit</option>
      </select>
    </div>
  </div>
);

export default PatientSearch;
