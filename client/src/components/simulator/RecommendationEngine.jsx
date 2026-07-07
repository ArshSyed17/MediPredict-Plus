import React from "react";
import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";

const RecommendationEngine = ({ recommendations }) => (
  <section className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
    <header className="mb-4 flex items-center gap-2">
      <Lightbulb className="h-5 w-5 text-amber-300" />
      <div>
        <h3 className="text-lg font-semibold text-white">AI Recommendations</h3>
        <p className="text-sm text-slate-300">Personalized lifestyle suggestions from simulated values.</p>
      </div>
    </header>

    <div className="space-y-2">
      {recommendations.map((item, index) => (
        <motion.div
          key={item}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.05 }}
          className="rounded-xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm text-slate-100"
        >
          {item}
        </motion.div>
      ))}
    </div>
  </section>
);

export default RecommendationEngine;
