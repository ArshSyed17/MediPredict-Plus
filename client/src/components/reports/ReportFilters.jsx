import React from "react";
import { diseaseFilterOptions, sortOptions } from "../../data/reportsMockData";

const ReportFilters = ({ filters, onChange }) => (
  <div className="grid gap-3 sm:grid-cols-3">
    <div>
      <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-400">
        Disease
      </label>
      <select
        value={filters.disease}
        onChange={(event) => onChange("disease", event.target.value)}
        className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400/50"
      >
        {diseaseFilterOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>

    <div>
      <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-400">
        Date From
      </label>
      <input
        type="date"
        value={filters.dateFrom}
        onChange={(event) => onChange("dateFrom", event.target.value)}
        className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400/50"
      />
    </div>

    <div>
      <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-slate-400">
        Sort
      </label>
      <select
        value={filters.sort}
        onChange={(event) => onChange("sort", event.target.value)}
        className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2 text-sm text-white outline-none focus:border-cyan-400/50"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  </div>
);

export default ReportFilters;
