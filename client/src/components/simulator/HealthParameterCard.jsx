import React from "react";
import { motion } from "framer-motion";

const HealthParameterCard = ({ label, value, unit, trend, icon: Icon }) => (
  <motion.div
    whileHover={{ y: -2 }}
    className="rounded-xl border border-white/10 bg-slate-950/40 p-3"
  >
    <div className="mb-2 flex items-center justify-between">
      <span className="text-xs text-slate-400">{label}</span>
      {Icon && <Icon className="h-4 w-4 text-cyan-300" />}
    </div>
    <p className="text-xl font-semibold text-white">
      {value}
      {unit && <span className="ml-1 text-sm font-normal text-slate-400">{unit}</span>}
    </p>
    {trend && (
      <p className={`mt-1 text-xs ${trend > 0 ? "text-emerald-300" : trend < 0 ? "text-rose-300" : "text-slate-400"}`}>
        {trend > 0 ? "+" : ""}
        {trend}
        {unit ? ` ${unit}` : ""}
      </p>
    )}
  </motion.div>
);

export default HealthParameterCard;
