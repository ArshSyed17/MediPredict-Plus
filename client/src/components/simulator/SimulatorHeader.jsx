import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, FlaskConical } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SimulatorHeader = ({ onReset, onSave, isSaving }) => {
  const navigate = useNavigate();

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="mb-8"
    >
      <button
        type="button"
        onClick={() => navigate("/dashboard")}
        className="mb-4 flex items-center gap-2 text-slate-400 transition-colors hover:text-white"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Back to Dashboard</span>
      </button>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-cyan-300">
            <FlaskConical className="h-5 w-5" />
            <span className="text-sm font-medium uppercase tracking-wide">Health Risk Simulator</span>
          </div>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">Simulate Lifestyle Impact</h1>
          <p className="mt-2 max-w-2xl text-base text-slate-300 sm:text-lg">
            Adjust lifestyle and vitals in real time to see how disease risk and your health score respond.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onReset}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-white/10"
          >
            Reset Simulation
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={isSaving}
            className="rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 px-4 py-2 text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-60"
          >
            {isSaving ? "Saving..." : "Save Snapshot"}
          </button>
        </div>
      </div>
    </motion.header>
  );
};

export default SimulatorHeader;
