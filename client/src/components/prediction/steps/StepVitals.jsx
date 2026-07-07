import React from "react";
import { useFormContext } from "react-hook-form";
import { TextField } from "../ui/FormField";
import GlassCard from "../ui/GlassCard";

const StepVitals = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <GlassCard title="Vitals" subtitle="Real-time physiological measurements.">
      <div className="grid gap-4 md:grid-cols-2">
        <TextField
          label="Systolic BP (mmHg)"
          type="number"
          registration={register("systolicBP", { required: "Systolic BP required", valueAsNumber: true })}
          error={errors.systolicBP}
        />
        <TextField
          label="Diastolic BP (mmHg)"
          type="number"
          registration={register("diastolicBP", { required: "Diastolic BP required", valueAsNumber: true })}
          error={errors.diastolicBP}
        />
        <TextField
          label="Heart Rate (bpm)"
          type="number"
          registration={register("heartRate", { required: "Heart rate required", valueAsNumber: true })}
          error={errors.heartRate}
        />
      </div>
    </GlassCard>
  );
};

export default StepVitals;
