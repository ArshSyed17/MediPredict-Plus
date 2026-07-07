import React from "react";
import { Phone, Mail, User } from "lucide-react";
import GlassCard from "./ui/GlassCard";

const EmergencyContact = ({ contact }) => (
  <GlassCard title="Emergency Contact" subtitle="Person to reach in case of medical emergency.">
    <div className="space-y-3">
      <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-950/40 p-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-500/20">
          <User className="h-5 w-5 text-rose-300" />
        </div>
        <div>
          <p className="font-medium text-white">{contact.name}</p>
          <p className="text-sm text-slate-400">{contact.relationship}</p>
        </div>
      </div>
      <p className="flex items-center gap-2 text-sm text-slate-300">
        <Phone className="h-4 w-4 text-slate-400" />
        {contact.phone}
      </p>
      <p className="flex items-center gap-2 text-sm text-slate-300">
        <Mail className="h-4 w-4 text-slate-400" />
        {contact.email}
      </p>
    </div>
  </GlassCard>
);

export default EmergencyContact;
