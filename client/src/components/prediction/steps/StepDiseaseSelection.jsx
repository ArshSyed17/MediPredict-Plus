import React from "react";
import { useFormContext } from "react-hook-form";
import { diseaseCatalog } from "../../../data/predictionMockData";
import GlassCard from "../ui/GlassCard";

const symptoms = ["Fatigue", "Frequent urination", "Blurred vision", "Chest discomfort", "Headache", "Dizziness"];

const StepDiseaseSelection = () => {
  const { register, watch } = useFormContext();
  const selected = watch("diseaseId");

  return (
    <GlassCard title="Disease Selection" subtitle="Choose a focus disease and relevant symptoms.">
      <div className="space-y-4">
        <div className="grid gap-3 md:grid-cols-2">
          {diseaseCatalog.map((disease) => (
            <label
              key={disease.id}
              className={`cursor-pointer rounded-xl border p-3 transition ${
                selected === disease.id ? "border-cyan-400 bg-cyan-500/10" : "border-white/10 bg-slate-950/40"
              }`}
            >
              <input
                type="radio"
                value={disease.id}
                className="sr-only"
                {...register("diseaseId", { required: true })}
              />
              <p className="font-medium text-white">{disease.label}</p>
              <p className="text-xs text-slate-300">Baseline cohort risk: {disease.baseRisk}%</p>
            </label>
          ))}
        </div>

        <div>
          <p className="mb-2 text-sm text-slate-200">Associated Symptoms</p>
          <div className="grid gap-2 sm:grid-cols-2">
            {symptoms.map((symptom) => (
              <label key={symptom} className="flex items-center gap-2 rounded-lg border border-white/10 bg-slate-950/40 p-2 text-sm">
                <input type="checkbox" value={symptom} {...register("selectedSymptoms")} />
                <span>{symptom}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </GlassCard>
  );
};

export default StepDiseaseSelection;
