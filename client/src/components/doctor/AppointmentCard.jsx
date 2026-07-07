import React from "react";
import { Clock, User } from "lucide-react";

const statusTone = {
  upcoming: "border-cyan-400/30 bg-cyan-500/10 text-cyan-200",
  completed: "border-emerald-400/30 bg-emerald-500/10 text-emerald-200",
  cancelled: "border-slate-500/30 bg-slate-700/30 text-slate-400",
};

const AppointmentCard = ({ appointment, onPatientSelect }) => (
  <button
    type="button"
    onClick={() => onPatientSelect?.(appointment.patientId)}
    className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-slate-950/40 p-3 text-left transition hover:border-white/20"
  >
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/20">
        <User className="h-5 w-5 text-violet-300" />
      </div>
      <div>
        <p className="font-medium text-white">{appointment.patient}</p>
        <p className="text-xs text-slate-400">{appointment.type}</p>
      </div>
    </div>
    <div className="text-right">
      <p className="flex items-center gap-1 text-xs text-slate-300">
        <Clock className="h-3 w-3" />
        {new Date(appointment.date).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </p>
      <span className={`mt-1 inline-block rounded-full border px-2 py-0.5 text-[10px] capitalize ${statusTone[appointment.status]}`}>
        {appointment.status}
      </span>
    </div>
  </button>
);

export default AppointmentCard;
