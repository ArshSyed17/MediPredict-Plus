import React from "react";
import { useFormContext } from "react-hook-form";
import { activityLevels, alcoholUse, smokingStatus } from "../../../data/predictionMockData";
import { SelectField, TextField } from "../ui/FormField";
import GlassCard from "../ui/GlassCard";

const StepLifestyle = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <GlassCard title="Lifestyle" subtitle="Behavioral factors impacting long-term disease risk.">
      <div className="grid gap-4 md:grid-cols-2">
        <SelectField
          label="Activity Level"
          registration={register("activityLevel", { required: "Activity level is required" })}
          options={activityLevels}
          error={errors.activityLevel}
        />
        <SelectField
          label="Smoking Status"
          registration={register("smoking", { required: "Smoking status is required" })}
          options={smokingStatus}
          error={errors.smoking}
        />
        <SelectField
          label="Alcohol Consumption"
          registration={register("alcohol", { required: "Alcohol usage is required" })}
          options={alcoholUse}
          error={errors.alcohol}
        />
        <TextField
          label="Sleep Hours / Night"
          type="number"
          registration={register("sleepHours", { required: "Sleep data is required", valueAsNumber: true })}
          error={errors.sleepHours}
        />
      </div>
    </GlassCard>
  );
};

export default StepLifestyle;
