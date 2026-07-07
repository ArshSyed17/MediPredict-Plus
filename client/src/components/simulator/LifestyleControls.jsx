import React from "react";
import {
  Activity,
  Droplets,
  HeartPulse,
  Moon,
  Scale,
  Cigarette,
  Wine,
  Brain,
  Footprints,
} from "lucide-react";
import { parameterConfig } from "../../data/simulatorMockData";
import { computeBmi } from "../../services/simulatorService";
import HealthParameterSlider from "./HealthParameterSlider";

const iconMap = {
  weight: Scale,
  exercise: Activity,
  dailySteps: Footprints,
  sleep: Moon,
  water: Droplets,
  smoking: Cigarette,
  alcohol: Wine,
  stress: Brain,
  bloodSugar: Activity,
  systolicBP: HeartPulse,
  diastolicBP: HeartPulse,
  heartRate: HeartPulse,
};

const groupLabels = {
  body: "Body Metrics",
  lifestyle: "Lifestyle",
  habits: "Habits & Stress",
  vitals: "Vitals",
};

const LifestyleControls = ({ params, onChange }) => {
  const bmi = computeBmi(params.weight, params.height);
  const grouped = parameterConfig.reduce((acc, item) => {
    if (!acc[item.group]) acc[item.group] = [];
    acc[item.group].push(item);
    return acc;
  }, {});

  const formatDisplay = (config, value) => {
    if (config.key === "smoking" && config.labels) return config.labels[value] ?? value;
    return value;
  };

  return (
    <section className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
      <header className="mb-5">
        <h3 className="text-lg font-semibold text-white">Lifestyle Controls</h3>
        <p className="text-sm text-slate-300">Drag sliders to simulate healthier routines instantly.</p>
      </header>

      <div className="mb-5 rounded-xl border border-cyan-400/20 bg-cyan-500/10 p-3">
        <p className="text-xs uppercase tracking-wide text-cyan-200">Computed BMI</p>
        <p className="text-2xl font-semibold text-white">{bmi}</p>
      </div>

      <div className="space-y-6">
        {Object.entries(grouped).map(([group, items]) => (
          <div key={group}>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-400">
              {groupLabels[group]}
            </h4>
            <div className="space-y-4">
              {items.map((config) => {
                const Icon = iconMap[config.key];
                return (
                  <div key={config.key} className="rounded-xl border border-white/10 bg-slate-950/30 p-3">
                    <div className="mb-2 flex items-center gap-2 text-slate-300">
                      {Icon && <Icon className="h-4 w-4 text-cyan-300" />}
                      <span className="text-xs font-medium">{config.label}</span>
                    </div>
                    <HealthParameterSlider
                      label={config.label}
                      value={params[config.key]}
                      min={config.min}
                      max={config.max}
                      step={config.step}
                      unit={config.unit}
                      displayValue={formatDisplay(config, params[config.key])}
                      onChange={(value) => onChange(config.key, value)}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LifestyleControls;
