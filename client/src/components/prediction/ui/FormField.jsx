import React from "react";

export const TextField = ({ label, error, registration, type = "text", placeholder }) => (
  <div className="space-y-1.5">
    <label className="text-sm text-slate-200">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2.5 text-sm text-white outline-none transition focus:border-cyan-400/60"
      {...registration}
    />
    {error && <p className="text-xs text-rose-300">{error.message}</p>}
  </div>
);

export const SelectField = ({ label, error, registration, options }) => (
  <div className="space-y-1.5">
    <label className="text-sm text-slate-200">{label}</label>
    <select
      className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-3 py-2.5 text-sm text-white outline-none transition focus:border-cyan-400/60"
      {...registration}
    >
      <option value="">Select an option</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {error && <p className="text-xs text-rose-300">{error.message}</p>}
  </div>
);
