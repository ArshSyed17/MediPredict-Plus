import React from "react";
import { Building2, Mail, Phone, Shield } from "lucide-react";
import GlassCard from "./ui/GlassCard";

const DoctorProfile = ({ doctor }) => (
  <div className="space-y-5">
    <GlassCard title="Doctor Profile">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-500 text-2xl font-bold text-white">
          {doctor.avatarInitials}
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">{doctor.name}</h2>
          <p className="text-sm text-cyan-300">{doctor.specialty}</p>
          <p className="mt-2 text-sm text-slate-300">{doctor.hospital}</p>
        </div>
      </div>
    </GlassCard>

    <GlassCard title="Contact & Credentials">
      <div className="space-y-3">
        {[
          [Mail, doctor.email],
          [Phone, doctor.phone],
          [Shield, `License: ${doctor.license}`],
          [Building2, doctor.hospital],
        ].map(([Icon, value]) => (
          <p key={value} className="flex items-center gap-2 text-sm text-slate-300">
            <Icon className="h-4 w-4 text-slate-400" />
            {value}
          </p>
        ))}
      </div>
    </GlassCard>
  </div>
);

export default DoctorProfile;
