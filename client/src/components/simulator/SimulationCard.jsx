import React from "react";
import { motion } from "framer-motion";
import { Clock3 } from "lucide-react";

const SimulationCard = ({ item, onSelect }) => (
  <motion.button
    type="button"
    whileHover={{ y: -2 }}
    onClick={() => onSelect?.(item)}
    className="w-full rounded-xl border border-white/10 bg-slate-950/40 p-3 text-left transition hover:border-cyan-400/40 hover:bg-slate-900/60"
  >
    <div className="flex items-center justify-between gap-2">
      <p className="font-medium text-white">{item.title ?? "Simulation Snapshot"}</p>
      <span className="text-xs text-emerald-300">
        +{item.healthScoreAfter - item.healthScoreBefore} score
      </span>
    </div>
    <p className="mt-1 text-xs text-slate-400">{item.topImprovement}</p>
    <div className="mt-2 flex items-center gap-1 text-[11px] text-slate-500">
      <Clock3 className="h-3 w-3" />
      {new Date(item.createdAt).toLocaleString()}
    </div>
  </motion.button>
);

export default SimulationCard;
