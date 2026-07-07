import React from "react";
import { useFormContext } from "react-hook-form";
import GlassCard from "../ui/GlassCard";

const checkboxClass =
  "h-4 w-4 rounded border-white/20 bg-slate-950/70 text-cyan-400 focus:ring-cyan-500/30";

const StepMedicalHistory = () => {
  const { register } = useFormContext();

  return (
    <GlassCard title="Medical History" subtitle="Pre-existing conditions and family medical context.">
      <div className="grid gap-3 md:grid-cols-2">
        {[
          ["familyHistory", "Family history of target disease"],
          ["hasHypertension", "Diagnosed hypertension"],
          ["hasCardiacHistory", "Previous cardiac history"],
          ["hasKidneyIssues", "Known kidney condition"],
        ].map(([key, label]) => (
          <label
            key={key}
            className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm text-slate-200"
          >
            <input type="checkbox" className={checkboxClass} {...register(key)} />
            {label}
          </label>
        ))}
      </div>
    </GlassCard>
  );
};

export default StepMedicalHistory;
