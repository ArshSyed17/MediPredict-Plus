import React from "react";
import { motion } from "framer-motion";
import { Activity, FileText, Server, Stethoscope, User, Users } from "lucide-react";

const cards = [
  { key: "totalUsers", label: "Total Users", icon: Users, color: "from-indigo-500 to-violet-500" },
  { key: "totalDoctors", label: "Total Doctors", icon: Stethoscope, color: "from-cyan-500 to-blue-500" },
  { key: "totalPatients", label: "Total Patients", icon: User, color: "from-emerald-500 to-teal-500" },
  { key: "predictionsToday", label: "Predictions Today", icon: Activity, color: "from-amber-500 to-orange-500" },
  { key: "reportsGenerated", label: "Reports Generated", icon: FileText, color: "from-rose-500 to-pink-500" },
  { key: "systemUptime", label: "System Uptime", icon: Server, color: "from-violet-500 to-purple-500", suffix: "%" },
];

const OverviewCards = ({ stats }) => (
  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
    {cards.map((card, index) => {
      const Icon = card.icon;
      return (
        <motion.div
          key={card.key}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.04 }}
          className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl"
        >
          <div className={`mb-2 inline-flex rounded-xl bg-gradient-to-br ${card.color} p-2`}>
            <Icon className="h-4 w-4 text-white" />
          </div>
          <p className="text-xl font-bold text-white">
            {stats[card.key]}
            {card.suffix ?? ""}
          </p>
          <p className="text-xs text-slate-400">{card.label}</p>
        </motion.div>
      );
    })}
  </div>
);

export default OverviewCards;
