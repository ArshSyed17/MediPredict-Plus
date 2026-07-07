import React from "react";
import { useFormContext } from "react-hook-form";
import { genderOptions } from "../../../data/predictionMockData";
import { SelectField, TextField } from "../ui/FormField";
import GlassCard from "../ui/GlassCard";

const StepPersonalInfo = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <GlassCard title="Personal Information" subtitle="Core demographic profile for risk modeling.">
      <div className="grid gap-4 md:grid-cols-2">
        <TextField
          label="Full Name"
          placeholder="John Doe"
          registration={register("fullName", { required: "Name is required" })}
          error={errors.fullName}
        />
        <TextField
          label="Age"
          type="number"
          placeholder="42"
          registration={register("age", { required: "Age is required", valueAsNumber: true, min: 1, max: 120 })}
          error={errors.age}
        />
        <SelectField
          label="Gender"
          registration={register("gender", { required: "Gender is required" })}
          options={genderOptions}
          error={errors.gender}
        />
        <TextField
          label="Height (cm)"
          type="number"
          registration={register("heightCm", { required: "Height is required", valueAsNumber: true })}
          error={errors.heightCm}
        />
        <TextField
          label="Weight (kg)"
          type="number"
          registration={register("weightKg", { required: "Weight is required", valueAsNumber: true })}
          error={errors.weightKg}
        />
      </div>
    </GlassCard>
  );
};

export default StepPersonalInfo;
