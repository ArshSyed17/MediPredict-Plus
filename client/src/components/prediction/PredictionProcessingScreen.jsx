import React from "react";
import { motion } from "framer-motion";
import { Brain, LoaderCircle } from "lucide-react";
import GlassCard from "./ui/GlassCard";

const PredictionProcessingScreen = () => (
  <GlassCard className="py-12 text-center" title="Prediction Processing">
    <motion.div
      className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500/20"
      animate={{ scale: [1, 1.08, 1] }}
      transition={{ duration: 1.8, repeat: Infinity }}
    >
      <Brain className="h-8 w-8 text-cyan-300" />
    </motion.div>
    <div className="mx-auto flex max-w-md items-center justify-center gap-2 text-slate-200">
      <LoaderCircle className="h-4 w-4 animate-spin" />
      AI model is processing patient vectors, confidence intervals, and explainability attributions...
    </div>
  </GlassCard>
);

export default PredictionProcessingScreen;
