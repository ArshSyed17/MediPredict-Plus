import React from "react";
import { motion } from "framer-motion";
import { LoaderCircle, Sparkles } from "lucide-react";

const SimulatorLoader = ({ message = "Running health risk simulation..." }) => (
  <div className="flex min-h-[220px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
      className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500/20"
    >
      <LoaderCircle className="h-7 w-7 text-cyan-300" />
    </motion.div>
    <div className="flex items-center gap-2 text-slate-200">
      <Sparkles className="h-4 w-4 text-cyan-300" />
      <p>{message}</p>
    </div>
  </div>
);

export default SimulatorLoader;
