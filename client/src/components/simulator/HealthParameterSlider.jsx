import React from "react";
import { motion } from "framer-motion";

const HealthParameterSlider = ({ label, value, min, max, step, unit, displayValue, onChange }) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between text-sm">
      <span className="font-medium text-slate-200">{label}</span>
      <motion.span
        key={displayValue ?? value}
        initial={{ opacity: 0.6, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        className="font-semibold text-cyan-300"
      >
        {displayValue ?? value}
        {unit ? ` ${unit}` : ""}
      </motion.span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(event) => onChange(Number(event.target.value))}
      className="h-2 w-full cursor-pointer appearance-none rounded-full bg-slate-700 accent-cyan-400"
    />
    <div className="flex justify-between text-[11px] text-slate-500">
      <span>{min}</span>
      <span>{max}</span>
    </div>
  </div>
);

export default HealthParameterSlider;
