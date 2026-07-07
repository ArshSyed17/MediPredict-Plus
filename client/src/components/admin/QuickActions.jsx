import React from "react";
import { motion } from "framer-motion";
import { Database, Download, FileText, Users } from "lucide-react";
import GlassCard from "./ui/GlassCard";

const actions = [
  { id: "users", label: "Manage Users", icon: Users, color: "from-indigo-500 to-violet-500" },
  { id: "reports", label: "View Reports", icon: FileText, color: "from-cyan-500 to-blue-500" },
  { id: "backup", label: "Run Backup", icon: Database, color: "from-emerald-500 to-teal-500" },
  { id: "export", label: "Export Data", icon: Download, color: "from-amber-500 to-orange-500" },
];

const QuickActions = ({ onAction }) => (
  <GlassCard title="Quick Actions" subtitle="Common administrative workflows.">
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {actions.map((action, index) => {
        const Icon = action.icon;
        return (
          <motion.button
            key={action.id}
            type="button"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -2 }}
            onClick={() => onAction(action.id)}
            className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-slate-950/40 p-4 transition hover:border-white/20"
          >
            <div className={`rounded-xl bg-gradient-to-br ${action.color} p-2.5`}>
              <Icon className="h-5 w-5 text-white" />
            </div>
            <span className="text-xs font-medium text-slate-200">{action.label}</span>
          </motion.button>
        );
      })}
    </div>
  </GlassCard>
);

export default QuickActions;
