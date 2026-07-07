import React, { useState } from "react";
import { Calendar } from "lucide-react";
import AppointmentCard from "./AppointmentCard";
import GlassCard from "./ui/GlassCard";

const tabs = [
  { id: "upcoming", label: "Upcoming" },
  { id: "completed", label: "Completed" },
  { id: "cancelled", label: "Cancelled" },
  { id: "calendar", label: "Calendar" },
];

const AppointmentList = ({ appointments, onPatientSelect }) => {
  const [activeTab, setActiveTab] = useState("upcoming");

  const filtered =
    activeTab === "calendar"
      ? appointments
      : appointments.filter((a) => a.status === activeTab);

  const groupedByDate = filtered.reduce((acc, apt) => {
    const date = new Date(apt.date).toLocaleDateString();
    if (!acc[date]) acc[date] = [];
    acc[date].push(apt);
    return acc;
  }, {});

  return (
    <GlassCard
      title="Appointments"
      subtitle="Manage upcoming and past consultations"
      action={
        <div className="flex gap-1 rounded-xl border border-white/10 bg-slate-950/40 p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-lg px-2.5 py-1 text-xs font-medium transition ${
                activeTab === tab.id ? "bg-cyan-500/20 text-cyan-300" : "text-slate-400 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      }
    >
      {activeTab === "calendar" ? (
        <div className="space-y-4">
          {Object.entries(groupedByDate).map(([date, items]) => (
            <div key={date}>
              <p className="mb-2 flex items-center gap-2 text-sm font-medium text-cyan-300">
                <Calendar className="h-4 w-4" />
                {date}
              </p>
              <div className="space-y-2">
                {items.map((apt) => (
                  <AppointmentCard key={apt.id} appointment={apt} onPatientSelect={onPatientSelect} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.length === 0 && (
            <p className="py-8 text-center text-sm text-slate-400">No {activeTab} appointments.</p>
          )}
          {filtered.map((apt) => (
            <AppointmentCard key={apt.id} appointment={apt} onPatientSelect={onPatientSelect} />
          ))}
        </div>
      )}
    </GlassCard>
  );
};

export default AppointmentList;
