import React from "react";
import { motion } from "framer-motion";
import { ChevronRight, Heart } from "lucide-react";

const riskTone = {
  High: "text-rose-300 bg-rose-500/15 border-rose-400/30",
  Moderate: "text-amber-300 bg-amber-500/15 border-amber-400/30",
  Low: "text-emerald-300 bg-emerald-500/15 border-emerald-400/30",
};

const PatientCard = ({ patient, selected, onSelect }) => (
  <motion.button
    type="button"
    whileHover={{ x: 4 }}
    onClick={() => onSelect(patient)}
    className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition ${
      selected
        ? "border-cyan-400/50 bg-cyan-500/10"
        : "border-white/10 bg-slate-950/40 hover:border-white/20"
    }`}
  >
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/30 to-indigo-500/30 text-sm font-semibold text-white">
        {patient.name.split(" ").map((n) => n[0]).join("")}
      </div>
      <div>
        <p className="font-medium text-white">{patient.name}</p>
        <p className="text-xs text-slate-400">
          {patient.id} • {patient.age} yrs • {patient.gender}
        </p>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <div className="hidden text-right sm:block">
        <p className="flex items-center gap-1 text-xs text-slate-400">
          <Heart className="h-3 w-3" /> Score {patient.healthScore}
        </p>
        <span className={`mt-1 inline-block rounded-full border px-2 py-0.5 text-[10px] ${riskTone[patient.riskLevel]}`}>
          {patient.riskLevel}
        </span>
      </div>
      <ChevronRight className="h-4 w-4 text-slate-500" />
    </div>
  </motion.button>
);

export default PatientCard;
