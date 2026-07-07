import React from "react";
import { Activity, Droplets, Footprints, Moon, Cigarette, Wine, Brain } from "lucide-react";
import GlassCard from "./ui/GlassCard";

const VitalsSection = ({ vitals, lifestyle }) => (
  <div className="grid gap-5 lg:grid-cols-2">
    <GlassCard title="Vitals" subtitle="Latest physiological measurements.">
      <div className="grid grid-cols-2 gap-3">
        {[
          ["Blood Pressure", `${vitals.systolicBP}/${vitals.diastolicBP} mmHg`],
          ["Heart Rate", `${vitals.heartRate} bpm`],
          ["Blood Sugar", `${vitals.bloodSugar} mg/dL`],
          ["BMI", vitals.bmi],
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl border border-white/10 bg-slate-950/40 p-3">
            <p className="text-xs text-slate-400">{label}</p>
            <p className="mt-1 font-semibold text-white">{value}</p>
          </div>
        ))}
      </div>
    </GlassCard>

    <GlassCard title="Lifestyle Summary" subtitle="Behavioral factors influencing risk profile.">
      <div className="grid grid-cols-2 gap-3 text-sm">
        {[
          [Activity, "Exercise", `${lifestyle.exercise} min/wk`],
          [Footprints, "Daily Steps", lifestyle.dailySteps.toLocaleString()],
          [Moon, "Sleep", `${lifestyle.sleep} hrs`],
          [Droplets, "Water", `${lifestyle.water} L/day`],
          [Cigarette, "Smoking", lifestyle.smoking],
          [Wine, "Alcohol", lifestyle.alcohol],
          [Brain, "Stress", `${lifestyle.stress}/10`],
        ].map(([Icon, label, value]) => (
          <div key={label} className="flex items-center gap-2 rounded-xl border border-white/10 bg-slate-950/40 p-3">
            <Icon className="h-4 w-4 shrink-0 text-cyan-300" />
            <div>
              <p className="text-xs text-slate-400">{label}</p>
              <p className="font-medium text-white">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  </div>
);

export default VitalsSection;
