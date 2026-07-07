import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const SettingsHeader = () => {
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

      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white sm:text-4xl">Settings</h1>
          <p className="mt-2 text-slate-300">Manage account, security, notifications, and privacy preferences.</p>
        </div>
        <Link
          to="/profile"
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10"
        >
          <User className="h-4 w-4" />
          View Profile
        </Link>
      </div>
    </motion.header>
  );
};

export default SettingsHeader;
