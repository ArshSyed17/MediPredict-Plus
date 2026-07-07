import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ReportsHeader = ({ totalReports, favoriteCount }) => {
  const navigate = useNavigate();

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <button
        type="button"
        onClick={() => navigate("/dashboard")}
        className="mb-4 flex items-center gap-2 text-slate-400 transition hover:text-white"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Back to Dashboard</span>
      </button>

      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-cyan-300">
            <FileText className="h-5 w-5" />
            <span className="text-sm font-medium uppercase tracking-wide">AI Medical Reports</span>
          </div>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">Clinical Report Center</h1>
          <p className="mt-2 max-w-2xl text-base text-slate-300 sm:text-lg">
            Review AI-generated health reports, track trends, and share insights with your care team.
          </p>
        </div>

        <div className="flex gap-3">
          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-center">
            <p className="text-xs uppercase tracking-wide text-slate-400">Total Reports</p>
            <p className="text-xl font-semibold text-white">{totalReports}</p>
          </div>
          <div className="rounded-xl border border-amber-400/20 bg-amber-500/10 px-4 py-2 text-center">
            <p className="text-xs uppercase tracking-wide text-amber-200">Favorites</p>
            <p className="text-xl font-semibold text-white">{favoriteCount}</p>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default ReportsHeader;
