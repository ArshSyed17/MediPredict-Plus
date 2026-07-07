import React from "react";
import { motion } from "framer-motion";
import { Award, FileText, Flame, Target, TrendingUp } from "lucide-react";
import GlassCard from "./ui/GlassCard";

const iconMap = {
  target: Target,
  flame: Flame,
  trending: TrendingUp,
  file: FileText,
};

const AchievementsCard = ({ achievements }) => (
  <GlassCard title="Achievements" subtitle="Milestones earned on your health journey.">
    <div className="grid gap-3 sm:grid-cols-2">
      {achievements.map((item, index) => {
        const Icon = iconMap[item.icon] ?? Award;
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-start gap-3 rounded-xl border border-amber-400/20 bg-amber-500/10 p-3"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-500/20">
              <Icon className="h-5 w-5 text-amber-300" />
            </div>
            <div>
              <p className="font-medium text-white">{item.title}</p>
              <p className="text-xs text-slate-300">{item.description}</p>
              <p className="mt-1 text-[10px] text-amber-200">
                Earned {new Date(item.earnedAt).toLocaleDateString()}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  </GlassCard>
);

export default AchievementsCard;
