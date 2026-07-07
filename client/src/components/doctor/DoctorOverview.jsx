import React from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Calendar, FileText, Users } from "lucide-react";
import GlassCard from "./ui/GlassCard";
import HealthTrendChart from "./HealthTrendChart";
import DiseaseAnalyticsChart from "./DiseaseAnalyticsChart";
import QuickActions from "./QuickActions";
import DoctorNotifications from "./DoctorNotifications";

const statCards = [
  { key: "totalPatients", label: "Total Patients", icon: Users, color: "from-cyan-500 to-blue-500" },
  { key: "todayConsultations", label: "Today's Consultations", icon: Calendar, color: "from-violet-500 to-purple-500" },
  { key: "pendingReports", label: "Pending Reports", icon: FileText, color: "from-amber-500 to-orange-500" },
  { key: "highRiskPatients", label: "High Risk Patients", icon: AlertTriangle, color: "from-rose-500 to-pink-500" },
];

const DoctorOverview = ({ stats, analytics, notifications, onAction, onMarkRead }) => (
  <div className="space-y-6">
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {statCards.map((card, index) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
          >
            <div className={`mb-3 inline-flex rounded-xl bg-gradient-to-br ${card.color} p-2.5`}>
              <Icon className="h-5 w-5 text-white" />
            </div>
            <p className="text-2xl font-bold text-white">{stats[card.key]}</p>
            <p className="text-sm text-slate-400">{card.label}</p>
          </motion.div>
        );
      })}
    </div>

    <div className="grid gap-6 lg:grid-cols-2">
      <GlassCard title="Patient Growth">
        <HealthTrendChart data={analytics.patientGrowth} dataKey="patients" labelKey="month" />
      </GlassCard>
      <GlassCard title="Disease Distribution">
        <DiseaseAnalyticsChart data={analytics.diseaseDistribution} />
      </GlassCard>
    </div>

    <div className="grid gap-6 lg:grid-cols-2">
      <QuickActions onAction={onAction} />
      <DoctorNotifications notifications={notifications.slice(0, 4)} onMarkRead={onMarkRead} compact />
    </div>
  </div>
);

export default DoctorOverview;
