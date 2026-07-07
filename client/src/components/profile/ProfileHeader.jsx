import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Pencil, Settings } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const ProfileHeader = ({ onEdit }) => {
  const navigate = useNavigate();

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
    >
      <div>
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="mb-4 flex items-center gap-2 text-slate-400 transition hover:text-white"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Dashboard</span>
        </button>
        <h1 className="text-3xl font-bold text-white sm:text-4xl">My Profile</h1>
        <p className="mt-2 text-slate-300">Manage your personal, medical, and emergency information.</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 px-4 py-2 text-sm font-medium text-white"
        >
          <Pencil className="h-4 w-4" />
          Edit Profile
        </button>
        <Link
          to="/settings"
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10"
        >
          <Settings className="h-4 w-4" />
          Settings
        </Link>
      </div>
    </motion.header>
  );
};

export default ProfileHeader;
