import React from "react";
import { useFormContext } from "react-hook-form";
import { TextField } from "../ui/FormField";
import GlassCard from "../ui/GlassCard";

const StepLabResults = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <GlassCard title="Lab Results (Optional)" subtitle="Biochemical markers used by the prediction model. Leave blank if unknown.">
      <div className="mb-4 flex items-start gap-3 rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-3 text-sm text-yellow-200/90">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0 text-yellow-400"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
        <p>If you don't have these lab results, you can skip this step. However, providing them increases the AI prediction accuracy.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <TextField
          label="Fasting Glucose (mg/dL)"
          type="number"
          registration={register("fastingGlucose", { valueAsNumber: true })}
          error={errors.fastingGlucose}
        />
        <TextField
          label="HbA1c (%)"
          type="number"
          registration={register("hba1c", { valueAsNumber: true })}
          error={errors.hba1c}
        />
        <TextField
          label="LDL Cholesterol (mg/dL)"
          type="number"
          registration={register("ldl", { valueAsNumber: true })}
          error={errors.ldl}
        />
        <TextField
          label="Creatinine (mg/dL)"
          type="number"
          registration={register("creatinine", { valueAsNumber: true })}
          error={errors.creatinine}
        />
      </div>
    </GlassCard>
  );
};

export default StepLabResults;
