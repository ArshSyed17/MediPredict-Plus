import React from "react";
import GlassCard from "./ui/GlassCard";

const LifestyleInformation = ({ lifestyle }) => (
  <GlassCard title="Lifestyle Information" subtitle="Daily habits and wellness patterns.">
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
      {[
        ["Activity Level", lifestyle.activityLevel],
        ["Diet", lifestyle.diet],
        ["Smoking", lifestyle.smoking],
        ["Alcohol", lifestyle.alcohol],
        ["Sleep", `${lifestyle.sleepHours} hrs/night`],
        ["Daily Steps", lifestyle.dailySteps.toLocaleString()],
      ].map(([label, value]) => (
        <div key={label} className="rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2">
          <p className="text-xs text-slate-400">{label}</p>
          <p className="text-sm font-medium text-white">{value}</p>
        </div>
      ))}
    </div>
  </GlassCard>
);

export default LifestyleInformation;
